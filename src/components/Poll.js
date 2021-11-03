import Polls from 'react-polls';
// import '../stylesheets/reactPollCSS.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import styled from 'styled-components';
import { firestore } from '../utils/firebase';
import firebase from '../utils/firebase';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const PollDiv = styled.div`
  width: 100vmin;
  height: 55vmin;
  position: relative;
  display: flex;
  font-size: 25px;
  flex-direction: column;
  border-radius: 5vmin;
  top: 250px;
  margin: 0 auto;
  background: #fff;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: #4f70d6;
  text-align: center;
  margin-top: 10vmin;
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -2px;
  top: -2px;
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
  margin-top: 5vmin;
  align-items: center;
  justify-content: center;
`;

const AddQuoteBtn = styled.div`
  width: 10vmin;
  height: 3vmin;
  font-size: 20px;
  background: #4f70d6;
  color: #fff;
  text-align: center;
  border-radius: 10vmin;
  cursor: pointer;
  margin-left: 2vmin;
  &:hover {
    background: gold;
  }
`;

const Input = styled.input`
  font-size: 23px;
  width: 80%;
  border: #4f70d6 2px solid;
  border-radius: 5px;
`;

const pollStyle = {
  questionSeparator: true,
  questionSeparatorWidth: 'question',
  questionBold: false,
  questionColor: '#4F70D6',
  align: 'center',
  theme: 'blue',
};

export default function Poll({ trigger, setTrigger }) {
  const [input, setInput] = useState('');
  const [getQuote, setGetQuote] = useState('');
  const { movieId } = useParams();

  const addQuote = () => {
    const docRef = firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Quotes')
      .doc();
    docRef.set({
      movieQuoteId: docRef.id,
      option: input,
      votes: 0,
    });
    setInput('');
  };

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Quotes')
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
    console.log(movieQuoteId);
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
    <PopupDiv>
      <PollDiv>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>

        <Title>投下你的經典對白吧！</Title>
        <Polls
          question={''}
          answers={getQuote}
          onVote={(voteAnswer) => handleVote(voteAnswer, getQuote)}
          customStyles={pollStyle}
          noStorage
        />
        <InputDiv>
          <Input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <AddQuoteBtn onClick={addQuote}>加新對白</AddQuoteBtn>
        </InputDiv>
      </PollDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
