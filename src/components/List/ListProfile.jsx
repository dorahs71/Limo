import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Favorite } from '@material-ui/icons';
import ListStatus from './ListStatus';

export default function ListProfile({
  getAuthor,
  isAuthor,
  authorId,
  updateList,
  listId,
  updateTitle,
  setShowCoinList,
  setShowReduceCoin,
  isCollected,
  toggleCollect,
}) {
  return (
    <ProfileContainer>
      <>
        <MyLink to={`/profile/${authorId}/list`}>
          <ProfileImgDiv>
            <ProfileImg src={getAuthor.profileImg} alt="" />
          </ProfileImgDiv>
        </MyLink>
        <ProfileName>{getAuthor.userName}</ProfileName>
      </>

      {isAuthor ? (
        <ToggleStatusDiv>
          <Status>私人</Status>
          <ListStatus
            authorId={authorId}
            status={updateList?.listShare}
            listId={listId}
            listTitle={updateTitle}
            showCoin={setShowCoinList}
            reduceCoin={setShowReduceCoin}
          />
          <Status>分享</Status>
        </ToggleStatusDiv>
      ) : (
        <CollectBtn collect={isCollected} onClick={toggleCollect}>
          <CollectIcon collect={isCollected} />
          <CollectWord>{isCollected ? '已收藏' : '收藏片單'}</CollectWord>
        </CollectBtn>
      )}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImgDiv = styled.div`
  background: #c5cdc0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 9vw;
  height: 9vw;
  @media (max-width: 1024px) {
    width: 12vw;
    height: 12vw;
  }
  @media (max-width: 600px) {
    width: 20vw;
    height: 20vw;
  }
`;

const ProfileImg = styled.img`
  width: 6vw;
  height: 6vw;
  object-fit: contain;
  @media (max-width: 1024px) {
    width: 8vw;
    height: 8vw;
  }
  @media (max-width: 600px) {
    width: 15vw;
    height: 15vw;
  }
`;

const ProfileName = styled.div`
  margin-top: 1vw;
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

const ToggleStatusDiv = styled.div`
  margin-top: 2vw;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #555;
  border-radius: 20px;
`;

const CollectIcon = styled(Favorite)`
  color: ${(props) => (props.collect ? '#f08080' : '#B2B2B2')};
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

const CollectBtn = styled.div`
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

const CollectWord = styled.div`
  display: block;
`;

const Status = styled.div`
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
  color: #fff;
`;
