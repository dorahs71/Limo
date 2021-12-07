import styled from 'styled-components';
import { Save, Delete } from '@material-ui/icons';
import { useState } from 'react';
import { RemoveDiaryDataAlert } from '../Common/DeleteAlert';
import { removeDiaryData, updateDiaryQuote } from '../../utils/firebase';

export default function DiaryQuote({ uid, diaryId, diaryQuoteId, diaryQuote }) {
  const [editQuote, setEditQuote] = useState('');
  const [removeQuoteAlert, setRemoveQuoteAlert] = useState(false);

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
            <SaveIcon
              onClick={() =>
                updateDiaryQuote(uid, diaryId, diaryQuoteId, editQuote)
              }
            />
          </SaveQuoteDiv>
          <DeleteQuoteDiv onClick={() => setRemoveQuoteAlert(true)}>
            <DeleteIcon />
          </DeleteQuoteDiv>
        </FunctionDiv>
      </EditQuote>
      <RemoveDiaryDataAlert
        trigger={removeQuoteAlert}
        setTrigger={setRemoveQuoteAlert}
        message={'確認刪除此對白嗎？'}
        remove={removeDiaryData}
        docId={diaryId}
        collection={'DiaryQuotes'}
        removeId={diaryQuoteId}
      />
    </>
  );
}

const FunctionDiv = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3vw;
`;

const EditQuote = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  &:hover ${FunctionDiv} {
    visibility: visible;
  }
`;

const Quote = styled.div`
  margin-top: 3vw;
  width: auto;
  padding: 0 0 0px 2px;
  background: transparent;
  resize: none;
  border: 0;
  text-align: center;
  font-weight: 600;
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
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const SaveQuoteDiv = styled.div`
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
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
  width: 3vw;
  height: 3vw;
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
