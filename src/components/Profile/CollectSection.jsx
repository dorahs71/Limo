import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import ProfileCollect from './ProfileCollect';
import nocollect from '../../images/nocollect.png';

export default function CollectSection({ activeItem, showCollect, isUser }) {
  return (
    <>
      {activeItem === 'collect' && showCollect.length === 0 && (
        <Space>
          <SpaceImg src={nocollect} alt="" />
          <SpaceWord>開始收藏喜歡的片單吧！</SpaceWord>
        </Space>
      )}
      {activeItem === 'collect' && showCollect.length > 0 && (
        <CollectShowcase>
          {showCollect?.map((item) => (
            <ProfileCollect
              key={item.listId}
              title={item.listTitle}
              posters={item.listPosters}
              listId={item.listId}
              isUser={isUser}
            />
          ))}
        </CollectShowcase>
      )}
    </>
  );
}

const CollectShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vmin 0vmin;
  padding: 5vmin 0;
  width: 100%;
  justify-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
    grid-gap: 5vmin 0vmin;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
