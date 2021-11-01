import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: 2vmin;
  top: -1vmin;
  z-index: 300;
  @media (max-width: 1280px) {
    right: 25px;
    top: -10px;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
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
  width: 25vmin;
  height: 35vmin;
`;

const DiaryTitle = styled.div`
  margin-top: 2vmin;
  font-size: 25px;
  color: #fff;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export default function ProfileDiary({ diaryId, poster, chTitle }) {
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
    <DiaryDiv>
      <MyLink to={`/diary/${diaryId}`}>
        <DiaryPoster src={poster} alt="" />
        <DiaryTitle>{chTitle}</DiaryTitle>
      </MyLink>
      <Close onClick={handleDeleteDiary}>
        <CancelIcon />
      </Close>
    </DiaryDiv>
  );
}
