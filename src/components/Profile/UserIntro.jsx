import styled from 'styled-components';
import coin from '../../images/limocoin.png';
import change from '../../images/change.png';
import fans from '../../images/fans.png';
import { Storefront, Stars } from '@material-ui/icons';
import { removeFollow, addFollow } from '../../utils/firebase';

export default function UserIntro({
  userId,
  currentUser,
  setShowChangeProfile,
  setShowBuy,
  setLogoutAlert,
  setLoginAlert,
  history,
  userIntro,
}) {
  const currentUserId = currentUser.uid;
  const isUser = currentUserId === userId;

  const isFollow = currentUser?.follow?.includes(userId);
  const toggleFollow = () => {
    if (currentUserId) {
      if (isFollow) {
        removeFollow(currentUserId, userId);
      } else {
        addFollow(currentUserId, userId);
      }
    } else {
      setLoginAlert(true);
    }
  };

  return (
    <ProfileSection>
      <ProfileContainer>
        <ProfileWrapper isUser={isUser ? 0.25 : 1}>
          <ProfileImgDiv>
            <ProfileImg src={userIntro?.profileImg} alt="" />
          </ProfileImgDiv>
          {isUser && (
            <ChangeProfileBtn onClick={() => setShowChangeProfile(true)}>
              <ChangeImg src={change} alt="" />
              <ChangeWord>更換頭像</ChangeWord>
            </ChangeProfileBtn>
          )}
        </ProfileWrapper>
        {isUser && (
          <>
            <StoreBtn onClick={() => setShowBuy(true)}>
              <StoreIcon /> 頭像商城
            </StoreBtn>
            <LogoutBtn onClick={() => setLogoutAlert(true)}>登出</LogoutBtn>
          </>
        )}
        {!isUser && (
          <FollowBtn onClick={toggleFollow}>
            <FollowIcon follow={isFollow ? '#FFD700' : '#B2B2B2'} />
            {isFollow ? '追蹤中' : '我要追蹤'}
          </FollowBtn>
        )}
      </ProfileContainer>
      <ProfileIntroDiv>
        <NameValue>{userIntro?.userName}</NameValue>
        <IntroInfo>
          <IntroLine>
            <FansImg src={fans} alt="" />
            <IntroValue>
              <CoinNum>
                {userIntro?.followBy?.length || 0}&nbsp;&nbsp;粉絲
              </CoinNum>
            </IntroValue>
          </IntroLine>
          {isUser && (
            <>
              <IntroLine>
                <CoinImg src={coin} alt="" />
                <IntroValue>
                  <CoinNum>{userIntro?.coin?.toLocaleString()}</CoinNum>
                </IntroValue>
              </IntroLine>
            </>
          )}
        </IntroInfo>
      </ProfileIntroDiv>
    </ProfileSection>
  );
}

const ProfileSection = styled.div`
  display: flex;
  padding: 50px;
  margin-top: 10vmin;
  justify-content: center;
`;

const ChangeImg = styled.img`
  width: 5vmin;
  height: 5vmin;
`;

const ChangeWord = styled.div`
  font-size: 2vmin;
`;

const ProfileImg = styled.img`
  width: 15vmin;
  height: 15vmin;
  object-fit: contain;
`;

const ProfileImgDiv = styled.div`
  width: 20vmin;
  height: 20vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c5cdc0;
  border-radius: 50%;
  position: relative;
`;

const ChangeProfileBtn = styled.div`
  width: 10vmin;
  height: 10vmin;
  display: flex;
  margin-top: -50%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  display: none;
  z-index: 1;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover ${ChangeProfileBtn} {
    display: flex;
  }

  &:hover ${ProfileImgDiv} {
    opacity: ${(props) => props.isUser};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const FollowIcon = styled(Stars)`
  transform: scale(1.5);
  color: ${(props) => props.follow};
  margin-right: 2vmin;
`;

const FollowBtn = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
  text-align: center;
  width: 18vmin;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #767b73;
    color: #fff;
  }
`;

const LogoutBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #cad2c6;
  }
`;

const ProfileIntroDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-left: 8vmin;
`;

const IntroInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const IntroLine = styled.div`
  display: flex;
  font-size: 3vmin;
  margin-top: 3vmin;
  align-items: center;
`;

const NameValue = styled.div`
  font-size: 5vmin;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 4vmin;
  }
`;

const IntroValue = styled.div`
  margin-left: 3vmin;
  display: block;
`;

const StoreIcon = styled(Storefront)`
  transform: scale(1.2);
  margin-right: 1vmin;
`;

const StoreBtn = styled.div`
  margin-top: 3vmin;
  padding: 1.5vmin 1vmin;
  width: 14vmin;
  height: 1vmin;
  font-weight: 450;
  font-size: 2.2vmin;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  color: #898f86;
  cursor: pointer;
  &:hover {
    background: #898f86;
    color: #fff;
  }
`;

const CoinNum = styled.div`
  display: block;
`;

const CoinImg = styled.img`
  width: 4vmin;
  height: 4vmin;
`;

const FansImg = styled.img`
  width: 4vmin;
  height: 4vmin;
`;
