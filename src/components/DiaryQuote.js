import styled from 'styled-components';
import { Save, Delete } from '@material-ui/icons';
import { firestore, auth } from '../utils/firebase';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const EditQuote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const Quote = styled.div`
  margin-top: 6vmin;
  width: auto;
  padding: 0 0 0px 2px;
  font-size: 30px;
  color: #ffaf1a;
  background: transparent;
  resize: none;
  border: 0;
  text-align: center;
  font-weight: 700;
  &:focus {
    outline: 0;
    border-bottom: 3px solid #00e6ac;
  }
  &:empty:before {
    content: attr(placeholder);
    color: #888;
    font-size: 25px;
  }
  @media (max-width: 1280px) {
    font-size: 30px;
  }
`;

const SaveQuoteDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  margin-left: 3vmin;
`;

const SaveIcon = styled(Save)`
  transform: scale(1.7);
  color: #555;
  cursor: pointer;
  &:hover {
    color: #00cca3;
  }
`;

const DeleteQuoteDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
`;

const DeleteIcon = styled(Delete)`
  transform: scale(1.7);
  color: #555;
  cursor: pointer;
  &:hover {
    color: #f08080;
  }
`;

const FunctionDiv = styled.div`
  display: flex;
  margin-top: 8vmin;
  @media (max-width: 1280px) {
    margin-top: 7vmin;
  }
`;

export default function DiaryQuote({ diaryQuoteId, diaryQuote }) {
  const [editQuote, setEditQuote] = useState('');
  const { diaryId } = useParams();
  const uid = auth.currentUser.uid;

  const updateDiaryQuote = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryQuotes')
      .doc(diaryQuoteId)
      .update({
        diaryQuote: editQuote,
      });
  };

  const deleteQuote = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryQuotes')
      .doc(diaryQuoteId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <EditQuote>
      <Quote
        placeholder="我覺得的經典對白是..."
        contentEditable
        dangerouslySetInnerHTML={{
          __html: diaryQuote || '',
        }}
        onInput={(e) => {
          setEditQuote(e.target.textContent);
        }}
      />
      <FunctionDiv>
        <SaveQuoteDiv>
          <SaveIcon onClick={updateDiaryQuote} />
        </SaveQuoteDiv>
        <DeleteQuoteDiv onClick={deleteQuote}>
          <DeleteIcon />
        </DeleteQuoteDiv>
      </FunctionDiv>
    </EditQuote>
  );
}
