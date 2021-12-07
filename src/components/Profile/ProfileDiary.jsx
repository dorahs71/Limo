import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { removeDiary } from '../../utils/firebase';
import { useState } from 'react';
import { RemoveDocAlert } from '../Common/DeleteAlert';

export default function ProfileDiary({ diaryId, poster, chTitle }) {
  const [removeDiaryAlert, setRemoveDiaryAlert] = useState(false);

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
      <RemoveDocAlert
        trigger={removeDiaryAlert}
        setTrigger={setRemoveDiaryAlert}
        message={'確認要刪除此日誌嗎？'}
        docId={diaryId}
        remove={removeDiary}
      />
    </>
  );
}

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: 2vw;
  top: -1vw;

  @media (max-width: 1024px) {
    right: 5vw;
    top: -2vw;
    display: block;
  }
  @media (max-width: 768px) {
    right: 3vw;
  }
  @media (max-width: 600px) {
    right: -2vw;
    top: -4vw;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.3);
  background: #333;
  border-radius: 50%;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    transform: scale(0.8);
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
  width: 10vw;
  height: 15vw;
  @media (max-width: 1024px) {
    width: 13vw;
    height: 18vw;
  }
  @media (max-width: 768px) {
    width: 16vw;
    height: 25vw;
  }
  @media (max-width: 600px) {
    width: 25vw;
    height: 35vw;
  }
`;

const DiaryTitle = styled.div`
  margin-top: 2vmin;
  color: #fff;
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
