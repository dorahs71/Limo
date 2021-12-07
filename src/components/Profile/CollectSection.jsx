import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import ProfileCollect from './ProfileCollect';
import nocollect from '../../images/nocollect.png';
import { ListShowcase } from './List.style';

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
        <ListShowcase>
          {showCollect?.map((item) => (
            <ProfileCollect
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
