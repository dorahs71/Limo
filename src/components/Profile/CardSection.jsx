import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import nocard from '../../images/nocard.png';
import { useSelector } from 'react-redux';

export default function CardSection({
  isUser,
  activeItem,
  showCard,
  setSelectCard,
  setShowCardPopup,
}) {
  const allUser = useSelector((state) => state.allUser);

  let friendData = [];

  if (allUser !== undefined && showCard !== '') {
    showCard.map((item) => {
      const data = allUser.find(({ uid }) => uid === item.senderId);
      if (data !== undefined) {
        friendData.push({
          friendImg: data.profileImg,
          friendName: data.userName,
          cardUrl: item.cardUrl,
        });
      }
      return data;
    });
  }

  return (
    <>
      {isUser && activeItem === 'card' && friendData.length === 0 && (
        <Space>
          <SpaceImg src={nocard} alt="" />
          <SpaceWord>還沒收到朋友寄來的小卡呦～</SpaceWord>
        </Space>
      )}
      {isUser && activeItem === 'card' && friendData.length > 0 && (
        <CardShowcase>
          {friendData.map((friend) => (
            <ProfileCard
              key={friend.cardUrl}
              onClick={() => {
                setSelectCard(friend.cardUrl);
                setShowCardPopup(true);
              }}
            >
              <CardSenderDiv>
                <SenderImgDiv src={friend.friendImg} alt="" />
                <SenderNameDiv>{friend.friendName}</SenderNameDiv>
              </CardSenderDiv>
              <CardDiv src={friend.cardUrl} alt="" />
            </ProfileCard>
          ))}
        </CardShowcase>
      )}
    </>
  );
}

const CardShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px 3px;
  padding: 5vmin 0;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5vmin 0vmin;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardSenderDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SenderImgDiv = styled.img`
  width: 5vmin;
  height: 5vmin;
`;
const SenderNameDiv = styled.div`
  font-size: 2.5vmin;
`;
const CardDiv = styled.img`
  margin-top: 1vmin;
  width: 20vmin;
  height: 15vmin;
  border-radius: 10px;
`;
