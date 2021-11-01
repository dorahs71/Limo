import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import { CalendarToday, Save, Delete } from '@material-ui/icons';
import moment from 'moment';

const DiaryDateDiv = styled.div`
  position: relative;
  width: 10vmin;
  height: 10vmin;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CalendarIcon = styled(CalendarToday)`
  transform: scale(8);
  color: rgb(25, 118, 210);
  position: absolute;
  top: 25px;
  @media (max-width: 1280px) {
    transform: scale(5);
    top: 10px;
  }
`;

const DiaryDate = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: rgb(25, 118, 210);
  @media (max-width: 1280px) {
    font-size: 25px;
  }
`;

const DiaryYear = styled.div`
  margin-top: 2px;
  font-size: 30px;
  font-weight: 700;
  color: rgb(25, 118, 210);
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const FunctionDiv = styled.div`
  display: flex;
  margin-left: auto;
`;
const SaveIcon = styled(Save)`
  transform: scale(1.7);
  color: #555;
  cursor: pointer;
  &:hover {
    color: #00cca3;
  }
`;

const DeleteIcon = styled(Delete)`
  transform: scale(1.7);
  color: #555;
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #f08080;
  }
`;

const DiaryDiv = styled.div`
  display: flex;
  border-radius: 5px;
  align-items: center;
  background: linear-gradient(#fffaf0, #ffe6b3);
  color: #333;
  margin-bottom: 3vmin;
  width: 85%;
  height: 8vmin;
  margin-top: 6vmin;
  padding: 7vmin 3vmin 5vmin 0vmin;
  @media (max-width: 1280px) {
    height: 10vmin;
  }
`;

const EditDiary = styled.div`
  flex-grow: 10;
  display: flex;
  flex-direction: column;
`;

const DiaryContent = styled.textarea`
  color: #333;
  font-weight: 450;
  font-size: 28px;
  height: auto;
  background: transparent;
  resize: none;
  width: 100%;
  border: 0;
  &:focus {
    outline: 0;
  }
  @media (max-width: 1280px) {
    font-size: 22px;
  }
`;

export default function DiaryBlock({ diaryDataId, diaryNote, date }) {
  const { diaryId } = useParams();
  const uid = auth.currentUser.uid;
  const [updateNote, setUpdateNote] = useState('');

  const updateDiaryNote = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryData')
      .doc(diaryDataId)
      .update({
        diaryNote: updateNote,
      });
  };

  const deleteDiary = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryData')
      .doc(diaryDataId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <DiaryDiv>
      <DiaryDateDiv>
        <CalendarIcon />
        <DiaryDate>
          {moment(date.toDate()).format('YYYY/MM/DD HH:mm:ss').substr(5, 6)}
        </DiaryDate>
        <DiaryYear>
          {moment(date.toDate()).format('YYYY/MM/DD HH:mm:ss').substr(0, 4)}
        </DiaryYear>
      </DiaryDateDiv>
      <EditDiary>
        <DiaryContent
          placeholder="我想談談這部電影..."
          defaultValue={diaryNote || ''}
          onChange={(e) => {
            setUpdateNote(e.target.value);
          }}
        />
        <FunctionDiv>
          <SaveIcon onClick={updateDiaryNote} />
          <DeleteIcon onClick={deleteDiary} />
        </FunctionDiv>
      </EditDiary>
    </DiaryDiv>
  );
}
