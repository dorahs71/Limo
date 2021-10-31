import styled from 'styled-components';
import { useState } from 'react';
import { Telegram } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  width: 80%;
  background: #333;
  padding: 20px 20px;
  align-items: center;
`;

const SendIcon = styled(Telegram)`
  transform: scale(2);
  color: #75e799;
  cursor: pointer;
  margin-left: 2vmin;
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const Input = styled.textarea`
  font-size: 25px;
  width: 90%;
  height: 3vmin;
  margin-left: 2vmin;
  background: #444;
  border-radius: 5px;
  overflow: hidden;
  border: none;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  color: #fff8dc;
  resize: none;
  padding: 5px;
  &:empty:before {
    content: attr(data-placeholder);
    color: #777;
  }

  &:focus {
    outline: none;
  }
  @media (max-width: 1280px) {
    font-size: 20px;
    height: 5vmin;
  }
`;

const ReviewDiv = styled.div`
  background: #444;
  border-radius: 5px;
  margin-top: 5vmin;
  width: 80%;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const ReviewerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewerImg = styled.img`
  width: 10vmin;
  height: 8vmin;
  @media (max-width: 1280px) {
    width: 12vmin;
    height: 8vmin;
  }
`;

const ReviewerName = styled.div`
  font-size: 2vmin;
  color: #75e799;
  font-weight: 500;
  text-decoration: underline;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const ReviewContentDiv = styled.div`
  margin-left: 3vmin;
  padding: 1vmin 1vmin;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewDate = styled.div`
  font-size: 18px;
  margin-left: auto;
  order: -1;
`;

const ReviewContent = styled.div`
  font-size: 25px;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

export default function Review({ trigger, commentId, reviews }) {
  const [newReview, setNewReview] = useState('');

  const { movieId } = useParams();
  const onSubmit = () => {
    setNewReview('');
    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Comments')
      .doc(commentId)
      .update({
        reviews: firebase.firestore.FieldValue.arrayUnion({
          reviewDate: new Date(),
          reviewerName: auth.currentUser.displayName || '',
          reviewerId: auth.currentUser.uid,
          reviewerImg: auth.currentUser.photoURL || '',
          reviewContent: newReview,
        }),
      });
  };

  return trigger ? (
    <ReviewSection>
      <InputDiv>
        <Input
          contentEditable
          label="留言內容"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          // onInput={(e) => setNewReview(e.target.innerHTML)}
          placeholder="我想留言..."
        />
        <SendIcon onClick={onSubmit} />
      </InputDiv>
      {reviews !== '' &&
        reviews.map((item) => {
          return (
            <ReviewDiv>
              <ReviewerDiv>
                <ReviewerImg src={item.reviewerImg} alt="" />
                <ReviewerName>{item.reviewerName}</ReviewerName>
              </ReviewerDiv>
              <ReviewContentDiv>
                <ReviewDate>
                  {item.reviewDate.toDate().toLocaleString()}
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
