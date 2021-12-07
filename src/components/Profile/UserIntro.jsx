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
  padding: 3vw;
  margin-top: 5vw;
  justify-content: center;
  @media (max-width: 768px) {
    padding: 3vw;
    margin-top: 8vw;
  }
  @media (max-width: 600px) {
    padding: 5vw;
    margin-top: 10vw;
  }
`;

const ChangeImg = styled.img`
  width: 3vw;
  height: 3vw;
  @media (max-width: 768px) {
    width: 4vw;
    height: 4vw;
  }
  @media (max-width: 600px) {
    width: 5vw;
    height: 5vw;
  }
`;

const ChangeWord = styled.div`
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }
  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

const ProfileImg = styled.img`
  width: 6vw;
  height: 6vw;
  object-fit: contain;
  @media (max-width: 768px) {
    width: 8vw;
    height: 8vw;
  }
  @media (max-width: 600px) {
    width: 15vw;
    height: 15vw;
  }
`;

const ProfileImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c5cdc0;
  border-radius: 50%;
  position: relative;
  width: 9vw;
  height: 9vw;
  @media (max-width: 768px) {
    width: 12vw;
    height: 12vw;
  }
  @media (max-width: 600px) {
    width: 20vw;
    height: 20vw;
  }
`;

const ChangeProfileBtn = styled.div`
  width: 5vw;
  height: 3vw;
  display: flex;
  margin-top: -70%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  visibility: hidden;
  z-index: 1;
  @media (max-width: 768px) {
    width: 8vw;
  }
  @media (max-width: 600px) {
    width: 12vw;
  }
  @media (max-width: 375px) {
    width: 15vw;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover ${ChangeProfileBtn} {
    visibility: visible;
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
  color: ${(props) => props.follow};
  margin-right: 1vw;
  transform: scale(2);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.5);
  }
  @media (max-width: 1024px) {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    transform: scale(1);
  }
`;

const FollowBtn = styled.div`
  margin-top: 2vw;
  text-align: center;
  width: 10vw;
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
    width: 20vw;
    margin-top: 3vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    width: 22vw;
    font-size: 0.5rem;
  }
`;

const LogoutBtn = styled.div`
  margin-top: 2vw;
  padding: 0.5vw 1vw;
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
    margin-top: 4vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const ProfileIntroDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-left: 4vw;
`;

const IntroInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const IntroLine = styled.div`
  display: flex;
  margin-top: 2vw;
  font-weight: 600;
  align-items: center;
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

const NameValue = styled.div`
  font-weight: 600;
  font-size: 2rem;
  @media (max-width: 1440px) {
    font-size: 1.8rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const IntroValue = styled.div`
  margin-left: 2vw;
  display: block;
`;

const StoreIcon = styled(Storefront)`
  margin-right: 0.5vw;
  transform: scale(1.5);
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const StoreBtn = styled.div`
  margin-top: 5vw;
  padding: 1.5vmin 1vmin;
  width: 10vw;
  height: 1vw;
  font-weight: 450;
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
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    margin-top: 7vw;
    width: 13vw;
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    margin-top: 15vw;
    width: 20vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const CoinNum = styled.div`
  display: block;
`;

const CoinImg = styled.img`
  width: 2vw;
  height: 2vw;
  @media (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
  @media (max-width: 375px) {
    width: 4vw;
    height: 4vw;
  }
`;

const FansImg = styled.img`
  width: 2vw;
  height: 2vw;
  @media (max-width: 600px) {
    width: 3vw;
    height: 3vw;
  }
  @media (max-width: 375px) {
    width: 4vw;
    height: 4vw;
  }
`;
