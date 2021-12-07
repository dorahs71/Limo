import Polls from 'react-polls';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addMovieQuote, getMovieQuotes, addVote } from '../../utils/firebase';
import WarningAlert from '../Common/WarningAlert';
import AOS from 'aos';
import { PopupDiv, CancelIcon } from '../Common/Common.style';

export default function Poll({ trigger, setTrigger, movieId }) {
  const [input, setInput] = useState('');
  const [getQuote, setGetQuote] = useState('');
  const [quoteAlert, setQuoteAlert] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const addQuote = () => {
    if (input) {
      addMovieQuote(movieId, input);
      setInput('');
    } else {
      setQuoteAlert(true);
    }
  };

  useEffect(() => {
    const unsubscribe = getMovieQuotes(movieId, setGetQuote);
    return () => {
      unsubscribe();
    };
  }, [movieId]);

  const handleVote = (voteAnswer, quoteAnswers) => {
    quoteAnswers.map((answer) => {
      if (answer.option === voteAnswer) answer.votes++;
      return answer;
    });

    const index = quoteAnswers.findIndex((x) => x.option === voteAnswer);
    const movieQuoteId = quoteAnswers[index].movieQuoteId;
    addVote(movieId, movieQuoteId);
  };

  return (
    trigger && (
      <PopupDiv data-aos="zoom-in">
        <PollDiv>
          <Close
            onClick={() => {
              setTrigger(false);
              setInput('');
            }}
          >
            <CancelIcon />
          </Close>

          <Title>投下你的經典對白</Title>
          <PollContainer>
            <Polls
              question={''}
              answers={getQuote}
              onVote={(voteAnswer) => handleVote(voteAnswer, getQuote)}
              customStyles={pollStyle}
              noStorage
            />
          </PollContainer>
          <InputDiv>
            <Input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <AddQuoteBtn onClick={addQuote}>新增對白</AddQuoteBtn>
          </InputDiv>
        </PollDiv>
        <WarningAlert
          trigger={quoteAlert}
          setTrigger={setQuoteAlert}
          message={'尚未填寫新增的對白呦！'}
        />
      </PopupDiv>
    )
  );
}

const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  width: 20vw;
  border-bottom: 4px solid #75e799;
  align-self: center;
  text-align: center;
  margin-top: 8vmin;
  @media (max-width: 1440px) {
    width: 18vw;
    font-size: 1.5rem;
  }
  @media (max-width: 1024px) {
    width: 23vw;
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    width: 30vw;
  }
  @media (max-width: 600px) {
    width: 40vw;
    font-size: 1rem;
  }
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

const PollDiv = styled.div`
  width: 60vw;
  height: 75vh;
  position: relative;
  display: flex;
  font-size: 2.3vmin;
  flex-direction: column;
  border-radius: 5vmin;
`;

const InputDiv = styled.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  padding: 2vmin;
  background: #c5cdc0;
  border-radius: 10px;

  @media (max-width: 600px) {
    margin-top: 3vh;
  }
`;

const PollContainer = styled.div`
  overflow: scroll;
  font-size: 2.5vmin;
  margin-top: 3vmin;
  color: #fff;
`;

const AddQuoteBtn = styled.div`
  width: 10vmin;
  height: 5vmin;
  line-height: 5vmin;
  font-size: 1.2rem;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  border-radius: 10vmin;
  cursor: pointer;
  margin-left: 2vmin;
  &:hover {
    background: #75e799;
  }
  @media (max-width: 768px) {
    width: 10vw;
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    width: 15vw;
    font-size: 0.5rem;
  }
`;

const Input = styled.input`
  font-size: 1.5vw;
  width: 80%;
  border: #c5cdc0 2px solid;
  border-radius: 5px;
  &:focus {
    outline: 0;
    border: 1px solid #75e799;
  }
`;

const pollStyle = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: false,
  questionColor: '#c5cdc0',
  align: 'center',
  theme: 'white',
};
