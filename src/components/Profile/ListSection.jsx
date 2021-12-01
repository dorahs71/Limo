import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import ProfileList from './ProfileList';
import nolist from '../../images/nolist.png';

export default function ListSection({
  isUser,
  activeItem,
  showList,
  showShareList,
}) {
  return (
    <>
      {isUser && activeItem === 'list' && showList.length === 0 && (
        <Space>
          <SpaceImg src={nolist} alt="" />
          <SpaceWord>快將喜歡的電影加入片單吧！</SpaceWord>
        </Space>
      )}
      {isUser && activeItem === 'list' && showList.length > 0 && (
        <ListShowcase>
          {showList?.map((item) => (
            <ProfileList
              key={item.listId}
              title={item.listTitle}
              posters={item.listPosters}
              listId={item.listId}
              isUser={isUser}
            />
          ))}
        </ListShowcase>
      )}

      {!isUser && activeItem === 'list' && showShareList.length === 0 && (
        <Space>
          <SpaceImg src={nolist} alt="" />
          <SpaceWord>快將喜歡的電影加入片單吧！</SpaceWord>
        </Space>
      )}
      {!isUser && activeItem === 'list' && showShareList.length > 0 && (
        <ListShowcase>
          {showShareList?.map((item) => (
            <ProfileList
              key={item.listId}
              title={item.listTitle}
              posters={item.listPosters}
              listId={item.listId}
              isUser={isUser}
            />
          ))}
        </ListShowcase>
      )}
    </>
  );
}

const ListShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5vmin 0vmin;
  padding: 5vmin 0;
  width: 100%;
  justify-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
