import styled from 'styled-components';
import { useState } from 'react';
import { Cancel, StarRounded } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import { useParams } from 'react-router-dom';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const NewCommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  width: 60vmin;
  height: 55vmin;
  background: #333;
  border: 1px solid #75e799;
  padding: 20px 20px;
  position: relative;
  top: 250px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 70vmin;
    height: 55vmin;
    top: 25vmin;
    font-size: 25px;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const InputName = styled.div`
  display: inline-block;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const Input = styled.textarea`
  font-size: 25px;
  width: 40vmin;
  height: 15vmin;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff8dc;
  resize: none;
  &:focus {
    outline: none;
  }
  @media (max-width: 1280px) {
    width: 50vmin;
    font-size: 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  border-radius: 5px;
  text-shadow: 2px 2px #778899;
  background: linear-gradient(to top, #7fffd4, #90ee90, transparent);
  @media (max-width: 1280px) {
    font-size: 28px;
  }
`;

const StarSection = styled.div`
  display: flex;
  align-items: start;
  padding: 2vmin;
  justify-content: center;
`;

const StarNum = styled.div`
  font-size: 15vmin;
`;

const StarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
`;

const Star = styled(StarRounded)`
  margin-left: 4vmin;
  margin-top: 5vmin;
  transform: scale(3);
  color: ${(props) => (props.select ? '#FFD700' : '#374048')};
  margin-right: 1vmin;
  cursor: pointer;
  transition: color 0.5s;
  &:hover {
    color: ${(props) => (props.isHover ? 'rgba(255, 215, 0, .6)' : '#374048')};
  }

  @media (max-width: 1280px) {
    margin-top: 4vmin;
    transform: scale(2);
  }
`;

const SendBtn = styled.div`
  text-align: center;
  width: 100%;
  height: 5vmin;
  border: 4px solid #7fffd4;
  border-radius: 5px;
  font-size: 25px;
  margin: 5vmin 0px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to left, #87cefa, #66cdaa);
    color: #191970;
  }
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

export default function NewComment({ trigger, setTrigger }) {
  const [comment, setComment] = useState('');
  const [selectedStar, setSelectedStar] = useState('5');
  const [hoverStar, setHoverStar] = useState(null);

  const possibleRate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { movieId } = useParams();

  const onSubmit = () => {
    const docRef = firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Comments')
      .doc();
    docRef.set({
      commentId: docRef.id,
      movieId,
      rate: selectedStar,
      date: new Date(),
      authorName: auth.currentUser.displayName || '',
      authorId: auth.currentUser.uid,
      authorImg: auth.currentUser.photoURL || '',
      comment,
    });
    setTrigger(false);
    setComment('');
    setSelectedStar('5');
  };

  return trigger ? (
    <PopupDiv>
      <NewCommentDiv>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        <Header>我要評論</Header>
        <StarSection>
          <StarNum>{selectedStar}</StarNum>
          <StarDiv>
            {possibleRate.map((rate) => (
              <Star
                key={rate}
                onClick={() => setSelectedStar(rate)}
                onMouseEnter={() => setHoverStar(rate)}
                onMouseLeave={() => setHoverStar(null)}
                select={rate <= selectedStar}
                isHover={rate <= hoverStar}
              />
            ))}
          </StarDiv>
        </StarSection>
        <InputDiv>
          <InputName>評論內容</InputName>
          <Input
            label="評論內容"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=" 關於這部電影..."
          />
        </InputDiv>
        <SendBtn onClick={onSubmit}>送出評論</SendBtn>
      </NewCommentDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
