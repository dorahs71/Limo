import styled from 'styled-components';
import { useState } from 'react';
import { Telegram } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { Link } from 'react-router-dom';

import moment from 'moment';
import { useSelector } from 'react-redux';

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  width: -webkit-fill-available;
  background: #333;
  padding: 20px 20px;
  box-shadow: 5px 5px 10px rgba(28, 28, 28, 1);
  align-items: center;
`;

const SendIcon = styled(Telegram)`
  transform: scale(2);
  color: #75e799;
  cursor: pointer;
  margin-left: 2vmin;
  @media (max-width: 1280px) {
    transform: scale(1.5);
  }
`;

const InputDiv = styled.div`
  margin-top: 2vmin;
  min-height: 5vmin;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.textarea`
  font-size: 2.5vmin;
  width: 90%;
  height: 3vmin;
  margin-left: 2vmin;
  background: #444;
  border-radius: 5px;
  overflow: visible;
  border: none;
  border-bottom: 2px solid rgba(127, 255, 212, 0.7);
  color: #fff;
  resize: none;
  padding: 0.8vmin;
  &:empty:before {
    content: attr(data-placeholder);
    color: #777;
  }

  &:focus {
    outline: none;
  }
`;

const ReviewDiv = styled.div`
  background: #444;
  border-radius: 5px;
  width: inherit;
  margin-top: 5vmin;
  min-height: 10vmin;
  display: flex;
  text-align: justify;
  align-items: center;
  padding: 3vmin;
`;

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vmin;
`;

const User = styled.img`
  width: 6vmin;
  height: 6vmin;
`;

const UserName = styled.div`
  font-size: 2.2vmin;
  margin-top: 1vmin;
  font-weight: 500;
  text-align: center;
`;

const ReviewContentDiv = styled.div`
  margin-left: 3vmin;
  padding: 1vmin 1vmin;
  display: flex;
  min-width: 4vmin;
  flex-direction: column;
  width: 100%;
`;

const ReviewDate = styled.div`
  margin-left: auto;
  font-size: 2.2vmin;
  color: #c5cdc0;
`;

const ReviewContent = styled.div`
  margin-top: 5px;
  align-self: flex-start;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  &:hover {
    color: #75e799;
  }
`;

export default function Review({ trigger, commentId, reviews, showCoin }) {
  const [newReview, setNewReview] = useState('');
  const currentUser = useSelector((state) => state.currentUser);

  const onSubmit = () => {
    const authorId = auth.currentUser.uid;

    firestore
      .collection('Comments')
      .doc(commentId)
      .update({
        reviews: firebase.firestore.FieldValue.arrayUnion({
          reviewDate: new Date(),
          reviewerName: currentUser.userName || '',
          reviewerId: currentUser.uid,
          reviewerImg: currentUser.profileImg || '',
          reviewContent: newReview,
        }),
      });

    firestore
      .collection('Users')
      .doc(authorId)
      .update({
        coin: firebase.firestore.FieldValue.increment(30),
      });

    setNewReview('');
    showCoin(true);
  };

  return trigger ? (
    <ReviewSection>
      <InputDiv>
        <Input
          contentEditable
          suppressContentEditableWarning={true}
          label="留言內容"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          // onInput={(e) => setNewReview(e.target.innerHTML)}
          placeholder="我想留言..."
        />
        <SendIcon onClick={onSubmit} />
      </InputDiv>
      {reviews !== '' &&
        reviews.map((item, index) => {
          return (
            <ReviewDiv key={index}>
              <UserDiv>
                <MyLink to={`/profile/${item.reviewerId}`}>
                  <User src={item.reviewerImg} alt="" />
                  <UserName>{item.reviewerName}</UserName>
                </MyLink>
              </UserDiv>
              <ReviewContentDiv>
                <ReviewDate>
                  {moment(item.reviewDate.toDate()).format(
                    'YYYY-MM-DD HH:mm:ss'
                  )}
                </ReviewDate>
                <ReviewContent>{item.reviewContent}</ReviewContent>
              </ReviewContentDiv>
            </ReviewDiv>
          );
        })}
    </ReviewSection>
  ) : (
    ''
  );
}
