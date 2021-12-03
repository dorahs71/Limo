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
  right: 2vmin;
  top: -1vmin;
  @media (max-width: 1280px) {
    right: 2vmin;
    top: -2vmin;
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
  width: 18vmin;
  height: 26vmin;
  /* object-fit: contain; */
  @media (max-width: 1280px) {
    width: 20vmin;
    height: 28vmin;
  }
`;

const DiaryTitle = styled.div`
  margin-top: 2vmin;
  font-size: 2vmin;
  color: #fff;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
