import Polls from 'react-polls';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import styled from 'styled-components';
import { firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import WarningAlert from './WarningAlert';
import AOS from 'aos';

const PopupDiv = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.95);
  z-index: 100;
`;

const Title = styled.div`
  font-size: 4vmin;
  font-weight: 800;
  color: #fff;
  width: 35vmin;
  border-bottom: 4px solid #75e799;
  align-self: center;
  text-align: center;
  margin-top: 8vmin;
  @media (max-width: 1024px) {
    font-size: 3vmin;
    width: 30vmin;
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

const CancelIcon = styled(Cancel)`
  transform: scale(1.6);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const PollDiv = styled.div`
  width: 120vmin;
  height: 75vmin;
  position: relative;
  display: flex;
  font-size: 2.5vmin;
  flex-direction: column;
  border-radius: 5vmin;
  top: 12vmin;
  margin: 0 auto;
  @media (max-width: 1280px) {
    top: 80px;
  }
  @media (max-width: 1024px) {
    width: 80vmin;
    height: 60vmin;
  }
`;

const InputDiv = styled.div`
  display: flex;
  margin-top: 5vmin;
  align-items: center;
  justify-content: center;
  padding: 4vmin;
  background: #c5cdc0;
  @media (max-width: 1280px) {
    margin-top: 2vmin;
  }
  @media (max-width: 1024px) {
    font-size: 3vmin;
    width: 90%;
  }
`;

const PollContainer = styled.div`
  overflow: scroll;
  font-size: 2.5vmin;
  margin-top: 3vmin;
`;

const AddQuoteBtn = styled.div`
  width: 10vmin;
  height: 5vmin;
  line-height: 5vmin;
  font-size: 2vmin;
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
  @media (max-width: 1280px) {
    width: 12vmin;
  }
  @media (max-width: 1280px) {
    width: 12vmin;
    font-size: 2vmin;
  }
`;

const Input = styled.input`
  font-size: 23px;
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

export default function Poll({ trigger, setTrigger }) {
  const [input, setInput] = useState('');
  const [getQuote, setGetQuote] = useState('');
  const { movieId } = useParams();
  const [quoteAlert, setQuoteAlert] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const addQuote = () => {
    if (input) {
      const docRef = firestore
        .collection('Movies')
        .doc(movieId)
        .collection('Quotes')
        .doc();
      docRef.set({
        movieQuoteId: docRef.id,
        option: input,
        date: new Date(),
        votes: 0,
      });
      setInput('');
    } else {
      setQuoteAlert(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Quotes')
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setGetQuote(data);
      });
    return () => {
      isMounted = false;
    };
  }, [movieId]);

  const handleVote = (voteAnswer, quoteAnswers) => {
    quoteAnswers.map((answer) => {
      if (answer.option === voteAnswer) answer.votes++;
      return answer;
    });

    const index = quoteAnswers.findIndex((x) => x.option === voteAnswer);
    const movieQuoteId = quoteAnswers[index].movieQuoteId;

    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Quotes')
      .doc(movieQuoteId)
      .update({
        votes: firebase.firestore.FieldValue.increment(1),
      });
  };

  return trigger ? (
    <PopupDiv data-aos="zoom-in">
      <PollDiv>
        <Close
          onClick={() => {
            setTrigger(false);
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
  ) : (
    ''
  );
}
