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
  width: 20vmin;
  height: 20vmin;
  background: #c5cdc0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 15vmin;
  height: 15vmin;
  object-fit: contain;
`;

const ProfileName = styled.div`
  margin-top: 1vmin;
  font-size: 3vmin;
  font-weight: 500;
`;

const ToggleStatusDiv = styled.div`
  margin-top: 3vmin;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #555;
  border-radius: 20px;
`;

const CollectIcon = styled(Favorite)`
  transform: scale(1.5);
  color: ${(props) => (props.collect ? '#f08080' : '#B2B2B2')};
  margin-right: 2vmin;
`;

const CollectBtn = styled.div`
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

const CollectWord = styled.div`
  display: block;
`;

const Status = styled.div`
  font-size: 2.5vmin;
  @media (max-width: 600px) {
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
