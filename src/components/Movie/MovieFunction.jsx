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
  listName,
  setShowCard,
  setListName,
  setLoginAlert,
  setAddDiaryAlert,
  setOwnDiaryAlert,
  setShowAddToList,
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

  const handleShowAddToList = () => {
    if (currentUser) {
      setShowAddToList(true);
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
          <AddCard
            onClick={() => {
              if (currentUser) {
                setShowCard(true);
              } else {
                setLoginAlert(true);
              }
            }}
          >
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
  width: 130%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
`;

const ListInfo = styled.div`
  width: 130%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
`;

const DiaryInfo = styled.div`
  width: 130%;
  font-weight: 500;
  color: #fff;
  padding: 5px;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
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
  margin-top: 6.5vmin;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 50px;
  @media (max-width: 768px) {
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
  width: 3vmin;
  height: 3vmin;
`;
