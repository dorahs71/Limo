import styled from 'styled-components';
import { Save, Delete } from '@material-ui/icons';
import { firestore, auth } from '../utils/firebase';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DeleteAlert from '../components/DeleteAlert';

const FunctionDiv = styled.div`
  display: none;
  margin-top: 8vmin;
`;

const EditQuote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  &:hover ${FunctionDiv} {
    display: flex;
  }
`;

const Quote = styled.div`
  margin-top: 6vmin;
  width: auto;
  padding: 0 0 0px 2px;
  font-size: 2.5vmin;
  background: transparent;
  resize: none;
  border: 0;
  text-align: center;
  font-weight: 700;
  &:focus {
    outline: 0;
    border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  }
  &:empty:before {
    content: attr(placeholder);
    color: #888;
    font-size: 2.8vmin;
    font-weight: 400;
  }
  @media (max-width: 1280px) {
    font-size: 3vmin;
  }
`;

const SaveQuoteDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  margin-left: 3vmin;
`;

const SaveIcon = styled(Save)`
  transform: scale(1.7);
  color: #898f86;
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    transform: scale(0.8);
  }
`;

const DeleteQuoteDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
`;

const DeleteIcon = styled(Delete)`
  transform: scale(1.7);
  color: #898f86;
  cursor: pointer;
  &:hover {
    color: #edabab;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    transform: scale(0.8);
  }
`;

export default function DiaryQuote({ diaryQuoteId, diaryQuote }) {
  const [editQuote, setEditQuote] = useState('');
  const [removeQuoteAlert, setRemoveQuoteAlert] = useState(false);
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
    <>
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
          <DeleteQuoteDiv onClick={() => setRemoveQuoteAlert(true)}>
            <DeleteIcon />
          </DeleteQuoteDiv>
        </FunctionDiv>
      </EditQuote>
      <DeleteAlert
        trigger={removeQuoteAlert}
        setTrigger={setRemoveQuoteAlert}
        message={'確認刪除此對白嗎？'}
        remove={deleteQuote}
      />
    </>
  );
}
