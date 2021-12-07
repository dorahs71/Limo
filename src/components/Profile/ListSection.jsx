import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import ProfileList from './ProfileList';
import { ListShowcase } from './List.style';
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
