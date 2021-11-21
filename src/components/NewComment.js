import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Cancel, StarRounded } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WarningAlert from './WarningAlert';
import AOS from 'aos';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.97);
  z-index: 100;
`;

const Title = styled.div`
  font-size: 4vmin;
  font-weight: 800;
  color: #fff;
  width: 16vmin;
  border-bottom: 4px solid #75e799;
  align-self: center;
  text-align: center;
  margin-top: 8vmin;
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 1vmin 1vmin;
  right: 0vmin;
  top: 7vmin;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.6);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const NewCommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  width: 70vmin;
  height: 55vmin;
  padding: 20px 20px;
  position: relative;
  top: 12vmin;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.textarea`
  font-size: 2.5vmin;
  width: 100%;
  height: 15vmin;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff;
  white-space: pre-wrap;
  resize: none;
  &:focus {
    outline: none;
  }
  /* @media (max-width: 1280px) {
    width: 50vmin;
  } */
`;

const StarSection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 2vmin;
  justify-content: center;
`;

const StarNum = styled.div`
  font-size: 10vmin;
  font-weight: 400;
  align-self: center;
`;

const StarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 3vmin 0 0 0;
  width: 70%;
`;

const Star = styled(StarRounded)`
  margin-left: 4vmin;
  margin-bottom: 3vmin;
  transform: scale(2.5);
  color: ${(props) => props.select};
  margin-right: 1vmin;
  cursor: pointer;
  transition: color 0.5s;
  /* &:hover {
    color: ${(props) => props.isHover};
  } */
  @media (max-width: 1280px) {
    transform: scale(2);
  }
`;

const SendBtn = styled.div`
  text-align: center;
  padding: 1.5vmin;
  background: #c5cdc0;
  color: #333;
  border-radius: 5px;
  font-size: 2.5vmin;
  margin: 5vmin 0px;
  cursor: pointer;
  &:hover {
    background: #75e799;
  }
`;

export default function NewComment({
  trigger,
  setTrigger,
  poster,
  chTitle,
  rate,
  allComment,
  showCoin,
}) {
  const authorId = auth.currentUser?.uid;
  const [comment, setComment] = useState('');
  const [selectedStar, setSelectedStar] = useState(5);
  const [commentAlert, setCommentAlert] = useState(false);
  // const [hoverStar, setHoverStar] = useState('');

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const currentUser = useSelector((state) => state.currentUser);

  const possibleRate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { movieId } = useParams();

  const onSubmit = () => {
    if (comment) {
      const docRef = firestore.collection('Comments').doc();
      docRef.set({
        commentId: docRef.id,
        movieId,
        poster,
        chTitle,
        rate: selectedStar,
        date: new Date(),
        authorId,
        comment,
      });

      if (currentUser.followBy !== undefined) {
        currentUser.followBy.map((item) => {
          const docRef = firestore
            .collection('Users')
            .doc(item)
            .collection('Notifications')
            .doc();

          docRef.set({
            notificationId: docRef.id,
            authorId,
            authorName: currentUser.userName,
            authorImg: currentUser.profileImg,
            read: false,
            date: new Date(),
            link: `/profile/${authorId}/comment`,
            message: `${currentUser.userName}在「${chTitle}」發表了新評論`,
          });
          return item;
        });
      }

      firestore
        .collection('Users')
        .doc(authorId)
        .update({
          coin: firebase.firestore.FieldValue.increment(100),
        });

      let numbers = allComment.map((x) => x.rate);

      let sum = numbers.reduce(function (accumulator, current) {
        return accumulator + current;
      }, 0);

      let newRate = (
        (Number(rate) * 500 + sum + selectedStar) /
        (allComment.length + 501)
      ).toFixed(1);

      firestore.collection('Movies').doc(movieId).update({
        rate: newRate,
      });

      setTrigger(false);
      showCoin(true);
      setComment('');
      setSelectedStar(5);
    } else {
      setCommentAlert(true);
    }
  };

  return trigger ? (
    <PopupDiv data-aos="zoom-in">
      <NewCommentDiv>
        <Close
          onClick={() => {
            setTrigger(false);
            setComment('');
            setSelectedStar(5);
          }}
        >
          <CancelIcon />
        </Close>
        <Title>我要評論</Title>
        <InputDiv>
          <StarSection>
            <StarNum>{selectedStar}</StarNum>
            <StarDiv>
              {possibleRate.map((rate) => (
                <Star
                  key={rate}
                  onClick={() => setSelectedStar(rate)}
                  // onMouseEnter={() => setHoverStar(rate)}
                  // onMouseLeave={() => setHoverStar(null)}
                  select={rate <= selectedStar ? '#FFD700' : '#374048'}
                  // isHover={
                  //   rate <= hoverStar ? 'rgba(255, 215, 0, .6)' : '#374048'
                  // }
                />
              ))}
            </StarDiv>
          </StarSection>

          <Input
            label="評論內容"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=" 關於這部電影..."
          />
        </InputDiv>

        <SendBtn onClick={onSubmit}>送出評論</SendBtn>
      </NewCommentDiv>
      <WarningAlert
        trigger={commentAlert}
        setTrigger={setCommentAlert}
        message={'尚未填寫新的評論呦！'}
      />
    </PopupDiv>
  ) : (
    ''
  );
}
