import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { StarRounded } from '@material-ui/icons';
import {
  auth,
  adjustRate,
  addNewComment,
  notifyComment,
  handleCoinNum,
} from '../../utils/firebase';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WarningAlert from '../Common/WarningAlert';
import AOS from 'aos';
import { PopupDiv, CancelIcon, Title } from '../Common/Common.style';

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

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const currentUser = useSelector((state) => state.currentUser);

  const possibleRate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { movieId } = useParams();

  const onSubmit = () => {
    if (comment) {
      addNewComment(movieId, poster, chTitle, selectedStar, authorId, comment);

      if (currentUser.followBy !== undefined) {
        currentUser.followBy.map((item) => {
          notifyComment(item, authorId, currentUser, chTitle);
          return item;
        });
      }

      handleCoinNum(authorId, 100);

      let numbers = allComment.map((x) => x.rate);
      let sum = numbers.reduce(function (accumulator, current) {
        return accumulator + current;
      }, 0);

      let newRate = (
        (Number(rate) * 500 + sum + selectedStar) /
        (allComment.length + 501)
      ).toFixed(1);

      adjustRate(movieId, newRate, allComment);

      setTrigger(false);
      showCoin(true);
      setComment('');
      setSelectedStar(5);
    } else {
      setCommentAlert(true);
    }
  };

  const removeStatus = () => {
    setTrigger(false);
    setComment('');
    setSelectedStar(5);
  };

  return (
    trigger && (
      <PopupDiv data-aos="zoom-in">
        <NewCommentDiv>
          <Close onClick={removeStatus}>
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
                    select={rate <= selectedStar ? '#FFD700' : '#374048'}
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
    )
  );
}

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

const NewCommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  width: 70vmin;
  height: 55vmin;
  padding: 20px 20px;
  position: relative;
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
`;

const StarSection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  padding: 2vmin;
  justify-content: center;
`;

const StarNum = styled.div`
  font-size: 8vw;
  font-weight: 400;
  align-self: center;
`;

const StarDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 3vmin 0 0 0;
  width: 23vw;
  @media (max-width: 1560px) {
    width: 25vw;
  }
  @media (max-width: 1440px) {
    width: 28vw;
  }

  @media (max-width: 1024px) {
    width: 37vw;
  }
  @media (max-width: 768px) {
    width: 45vw;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

const Star = styled(StarRounded)`
  margin-left: 4vmin;
  margin-bottom: 3vmin;
  transform: scale(3);
  color: ${(props) => props.select};
  margin-right: 1vmin;
  cursor: pointer;
  transition: color 0.5s;
  @media (max-width: 1280px) {
    transform: scale(2.5);
  }
  @media (max-width: 768px) {
    transform: scale(2);
  }
  @media (max-width: 600px) {
    transform: scale(1.5);
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
