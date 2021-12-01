import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import nodiary from '../../images/nodiary.png';
import ProfileDiary from './ProfileDiary';

export default function DiarySection({ isUser, activeItem, showDiary }) {
  return (
    <>
      {isUser && activeItem === 'diary' && showDiary.length === 0 && (
        <Space>
          <SpaceImg src={nodiary} alt="" />
          <SpaceWord>快將喜歡的電影加入日誌吧！</SpaceWord>
        </Space>
      )}
      {isUser && activeItem === 'diary' && showDiary.length > 0 && (
        <DiaryShowcase>
          {showDiary !== '' &&
            showDiary.map((item) => (
              <ProfileDiary
                key={item.diaryId}
                diaryId={item.diaryId}
                poster={item.poster}
                chTitle={item.chTitle}
              />
            ))}
        </DiaryShowcase>
      )}
    </>
  );
}

const DiaryShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5vmin 0.8vmin;
  padding: 5vmin 0;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
