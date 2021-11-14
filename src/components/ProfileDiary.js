import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import { useState } from 'react';
import DeleteAlert from '../components/DeleteAlert';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: 0vmin;
  top: -2vmin;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.1);
  background: #333;
  border-radius: 50%;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const DiaryDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  text-align: center;
  &:hover ${Close} {
    display: block;
  }
`;

const DiaryPoster = styled.img`
  width: 23vmin;
  height: 28vmin;
`;

const DiaryTitle = styled.div`
  margin-top: 2vmin;
  font-size: 2.5vmin;
  color: #fff;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export default function ProfileDiary({ diaryId, poster, chTitle }) {
  const [removeDiaryAlert, setRemoveDiaryAlert] = useState(false);
  const handleDeleteDiary = () => {
    const uid = auth.currentUser.uid;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <>
      <DiaryDiv>
        <MyLink to={`/diary/${diaryId}`}>
          <DiaryPoster src={poster} alt="" />
          <DiaryTitle>{chTitle}</DiaryTitle>
        </MyLink>
        <Close onClick={() => setRemoveDiaryAlert(true)}>
          <CancelIcon />
        </Close>
      </DiaryDiv>
      <DeleteAlert
        trigger={removeDiaryAlert}
        setTrigger={setRemoveDiaryAlert}
        message={'確認要刪除此日誌嗎？'}
        remove={handleDeleteDiary}
      />
    </>
  );
}
