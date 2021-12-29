import styled from 'styled-components';
import card from '../../images/card.png';
import movielist from '../../images/movielist.png';
import moviediary from '../../images/moviediary.png';
import { addDiary, getOrderedData } from '../../utils/firebase';

export default function MovieFunction({
  diaryList,
  movieId,
  currentUser,
  eachMovie,
  setShowCard,
  setListName,
  setLoginAlert,
  setAddDiaryAlert,
  setOwnDiaryAlert,
  setShowAddToList,
  setMobileAlert,
}) {
  const handleAddDiary = () => {
    if (currentUser) {
      const userDiary = [];
      diaryList?.map((item) => {
        userDiary.push(item.movieId);
        return userDiary;
      });
      if (userDiary.includes(movieId)) {
        setOwnDiaryAlert(true);
      } else {
        addDiary(currentUser.uid, movieId, eachMovie.poster, eachMovie.chTitle);
        setAddDiaryAlert(true);
      }
    } else {
      setLoginAlert(true);
    }
  };

  const handleSendCard = () => {
    if (currentUser) {
      if (window.screen.width <= 1024) {
        setMobileAlert(true);
      } else {
        setShowCard(true);
      }
    } else {
      setLoginAlert(true);
    }
  };

  const handleShowAddToList = () => {
    if (currentUser) {
      setShowAddToList((prev) => !prev);
      const unsubscribe = getOrderedData(
        'Lists',
        'authorId',
        currentUser.uid,
        setListName
      );
      return () => {
        unsubscribe();
      };
    } else {
      setLoginAlert(true);
    }
  };

  return (
    <>
      <AddButtonDiv>
        <DiaryInfoDiv>
          <AddDiary onClick={handleAddDiary}>
            <IconImg src={moviediary} alt="" />
          </AddDiary>
          <DiaryInfo>加入日誌</DiaryInfo>
        </DiaryInfoDiv>
        <CardInfoDiv>
          <AddCard onClick={handleSendCard}>
            <IconImg src={card} alt="" />
          </AddCard>
          <CardInfo>寄送小卡</CardInfo>
        </CardInfoDiv>
        <ListInfoDiv>
          <AddList onClick={handleShowAddToList}>
            <IconImg src={movielist} alt="" />
          </AddList>
          <ListInfo>加入片單</ListInfo>
        </ListInfoDiv>
      </AddButtonDiv>
    </>
  );
}

const CardInfo = styled.div`
  font-size: 1.5rem;
  width: 150%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: block;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ListInfo = styled.div`
  font-size: 1.5rem;
  width: 150%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: block;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const DiaryInfo = styled.div`
  font-size: 1.5rem;
  width: 150%;
  font-weight: 500;
  color: #fff;
  padding: 5px;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: block;
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const DiaryInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${DiaryInfo} {
    display: block;
  }
`;

const CardInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${CardInfo} {
    display: block;
  }
`;

const ListInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${ListInfo} {
    display: block;
  }
`;

const AddButtonDiv = styled.div`
  width: 60%;
  display: grid;
  margin-top: 5vw;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 3vw;
  margin-right: 1vw;
  @media (max-width: 768px) {
    margin-bottom: 9vw;
    width: 100%;
  }
`;

const AddDiary = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
  &:hover ${DiaryInfo} {
    display: flex;
  }
`;

const AddCard = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
`;

const AddList = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
`;

const IconImg = styled.img`
  width: 2vw;
  height: 2vw;
  @media (max-width: 1024px) {
    width: 3vw;
    height: 3vw;
  }
  @media (max-width: 600px) {
    width: 4vw;
    height: 4vw;
  }
`;
