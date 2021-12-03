import styled from 'styled-components';
import { useSelector } from 'react-redux';

export default function CardFriendDiv({
  trigger,
  selectFriend,
  setSelectFriend,
  currentUser,
}) {
  const allUser = useSelector((state) => state.allUser);

  let friendData = [];
  if (trigger && currentUser !== undefined) {
    const friendList = currentUser.follow.filter((element) =>
      currentUser.followBy?.includes(element)
    );
    friendList.map((item) => {
      const data = allUser?.find(({ uid }) => uid === item);
      friendData.push(data);
      return data;
    });
  }

  return (
    <FriendDiv>
      {friendData?.map((item) => (
        <FollowDiv
          key={item.uid}
          onClick={() => {
            setSelectFriend(item.uid);
          }}
        >
          <ImgWrapper select={selectFriend === item.uid}>
            <FollowImg src={item.profileImg} alt="" />
          </ImgWrapper>
          <FollowName>{item.userName}</FollowName>
        </FollowDiv>
      ))}
    </FriendDiv>
  );
}

const FriendDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  overflow: scroll;
  width: 80%;
  padding: 2px 2px 0 2px;
`;

const ImgWrapper = styled.div`
  width: 10vmin;
  height: 10.5vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => (props.select ? '#75e799' : '')};
`;

const FollowDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover ${ImgWrapper} {
    background: #75e799;
    border-radius: 50%;
  }
`;

const FollowImg = styled.img`
  width: 8vmin;
  height: 8vmin;
  object-fit: contain;
`;

const FollowName = styled.div`
  font-size: 2vmin;
  text-align: center;
`;
