import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import { CalendarToday, Edit, Save, Delete } from '@material-ui/icons';
import moment from 'moment';
import DeleteAlert from '../components/DeleteAlert';

const DiaryDiv = styled.div`
  display: flex;
  border-radius: 10px;
  align-items: center;
  background: #efeeee;
  opacity: 0.8;
  color: #333;
  margin-bottom: 5vmin;
  width: 100%;
  min-height: 6vmin;
  margin-top: 6vmin;
  padding: 7vmin 3vmin 5vmin 0vmin;
  @media (max-width: 1280px) {
    min-height: 10vmin;
  }
`;

const DiaryDateDiv = styled.div`
  position: relative;
  width: 10vmin;
  height: 10vmin;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    margin-left: 2vmin;
  }
`;

const CalendarIcon = styled(CalendarToday)`
  transform: scale(8);
  color: #6d726b;
  position: absolute;
  top: 2vmin;
  @media (max-width: 1280px) {
    transform: scale(5);
  }
  @media (max-width: 1024px) {
    top: 3vmin;
  }
  @media (max-width: 768px) {
    transform: scale(4);
    top: 2vmin;
  }
  @media (max-width: 600px) {
    transform: scale(2.5);
    top: 1vmin;
  }
  @media (max-width: 375px) {
    transform: scale(2.5);
    top: 0vmin;
  }
`;

const DiaryDate = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #6d726b;
  @media (max-width: 1280px) {
    font-size: 25px;
  }
  @media (max-width: 768px) {
    font-size: 3vmin;
  }
  @media (max-width: 600px) {
    font-size: 2vmin;
  }
`;

const DiaryYear = styled.div`
  margin-top: 2px;
  font-size: 30px;
  font-weight: 700;
  color: #6d726b;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    font-size: 2vmin;
  }
`;

const FunctionDiv = styled.div`
  display: flex;
  margin-left: auto;
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

const EditIcon = styled(Edit)`
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

const DeleteIcon = styled(Delete)`
  transform: scale(1.7);
  margin-left: 2vmin;
  color: #898f86;
  cursor: pointer;
  &:hover {
    color: #edabab;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    margin-left: 0vmin;
    transform: scale(0.8);
  }
`;

const EditDiary = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const DiaryContent = styled.textarea`
  color: #333;
  font-weight: 400;
  font-size: 2.8vmin;
  height: 10vmin;
  background: transparent;
  white-space: pre-wrap;
  resize: none;
  width: 100%;
  border: 0;
  &:focus {
    outline: 0;
  }
  @media (max-width: 768px) {
    margin-left: 2vmin;
  }
`;

const ReadDiary = styled.div`
  text-align: start;
  align-self: flex-end;
  color: #333;
  font-weight: 400;
  font-size: 2.8vmin;
  min-height: 3vmin;
  white-space: pre-wrap;
  width: 90%;
  margin: 0;
`;

export default function DiaryBlock({ diaryDataId, diaryNote, date }) {
  const { diaryId } = useParams();
  const uid = auth.currentUser.uid;
  const [updateNote, setUpdateNote] = useState('');
  const [removeNoteAlert, setRemoveNoteAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const updateDiaryNote = () => {
    setEdit(false);
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

  const handleKeyDown = (e) => {
    e.target.style.height = '10vmin';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <>
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
        {edit ? (
          <EditDiary>
            <DiaryContent
              placeholder="我想談談這部電影..."
              defaultValue={diaryNote || ''}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => {
                setUpdateNote(e.target.value);
              }}
            />
            <FunctionDiv>
              <SaveIcon onClick={updateDiaryNote} />
              <DeleteIcon onClick={() => setRemoveNoteAlert(true)} />
            </FunctionDiv>
          </EditDiary>
        ) : (
          <EditDiary>
            <ReadDiary>{diaryNote}</ReadDiary>
            <FunctionDiv>
              <EditIcon onClick={() => setEdit(true)} />
              <DeleteIcon onClick={() => setRemoveNoteAlert(true)} />
            </FunctionDiv>
          </EditDiary>
        )}
      </DiaryDiv>
      <DeleteAlert
        trigger={removeNoteAlert}
        setTrigger={setRemoveNoteAlert}
        message={'確認刪除此日記嗎？'}
        remove={deleteDiary}
      />
    </>
  );
}
