import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import nofollow from '../../images/nofollow.png';
import ProfileFollow from './ProfileFollow';

export default function FollowSection({ activeItem, userIntro }) {
  return (
    <>
      {activeItem === 'follow' && userIntro.follow === undefined && (
        <Space>
          <SpaceImg src={nofollow} alt="" />
          <SpaceWord>你還沒有關注的對象呦！</SpaceWord>
        </Space>
      )}
      {activeItem === 'follow' && userIntro.follow?.length === 0 && (
        <Space>
          <SpaceImg src={nofollow} alt="" />
          <SpaceWord>你還沒有關注的對象呦！</SpaceWord>
        </Space>
      )}
      {activeItem === 'follow' &&
        userIntro.follow !== '' &&
        userIntro.follow?.length > 0 && (
          <FollowShowcase>
            {userIntro.follow?.map((item) => (
              <ProfileFollow key={item} followId={item} />
            ))}
          </FollowShowcase>
        )}
    </>
  );
}

const FollowShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px 3px;
  padding: 5vmin 0;
  width: 100%;
`;
