import styled from 'styled-components';
import ListStatus from '../components/ListStatus';
import { Save, Favorite, DeleteOutline } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams, Link } from 'react-router-dom';
import ReduceCoinAlert from '../components/ReduceCoinAlert';
import CoinAlert from '../components/CoinAlert';
import ListDeleteAlert from '../components/ListDeleteAlert';

const ListSection = styled.div`
  display: flex;
  width: 100%;
  padding: 15vmin 0 5vmin 0;
  justify-content: center;
`;

const ListHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ListContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
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
`;

const ProfileName = styled.div`
  margin-top: 1vmin;
  font-size: 3vmin;
  font-weight: 500;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListIntroDiv = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin-left: 8vmin;
  @media (max-width: 1280px) {
  }
`;

const SaveIcon = styled(Save)`
  transform: scale(1.5);
  color: #898f86;
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const TitleSaveDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  align-self: flex-end;
  margin-top: -5%;
  color: #898f86;
  cursor: pointer;
  display: none;
`;

const EditTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover ${TitleSaveDiv} {
    display: block;
  }
`;

const ListTitle = styled.input`
  background: transparent;
  color: #fff;
  max-width: 100%;
  border: 0;
  cursor: ${(props) => (props.isAuthor ? 'text' : 'default')};
  border-bottom: 8px solid #61d498;
  text-align: center;
  font-size: 5vmin;
  font-weight: 700;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
  }
`;

const IntroSaveDiv = styled.div`
  width: 4vmin;
  height: 4vmin;
  align-self: flex-end;
  margin-top: -5%;
  color: #898f86;
  cursor: pointer;
  display: none;
`;

const ListIntro = styled.textarea`
  margin-top: 4vmin;
  padding-top: 2vmin;
  background: transparent;
  width: 100%;
  font-family: 'Segoe UI';
  color: #fff;
  height: 16vmin;
  cursor: ${(props) => (props.isAuthor ? 'text' : 'default')};
  overflow: scroll;
  text-align: center;
  border-radius: 5px;
  font-size: 2.8vmin;
  border: 2px #222 solid;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
    border: 1px solid
      ${(props) => (props.isAuthor ? 'rgba(127, 255, 212, 0.7)' : '0')};
  }
`;

const EditIntro = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  &:hover ${IntroSaveDiv} {
    display: block;
  }
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

const CollectNum = styled.div`
  font-size: 2.3vmin;
  margin-top: 1vmin;
  color: #898f86;
`;

const CollectWord = styled.div`
  display: block;
`;

const Status = styled.div`
  font-size: 20px;
`;

const DeleteDiv = styled.div`
  height: 2vmin;
  position: absolute;
  display: none;
  width: 2vmin;
  z-index: 12;
  cursor: pointer;
  bottom: 5vmin;
`;

const DeleteIcon = styled(DeleteOutline)`
  transform: scale(1.5);
  color: #777;
  z-index: 20;
  &:hover {
    color: #edabab;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 25vmin;
  height: 35vmin;
  position: relative;
  cursor: pointer;
  &:hover ${DeleteDiv} {
    display: flex;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  > * {
    transform: translateY(2vmin);
    transition: transform 0.4s;
  }
  &:hover > * {
    transform: translateY(0);
  }
`;

const ArrangeListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  margin: 8vmin;
`;

const MovieTitle = styled.div`
  width: 70%;
  text-align: center;
  font-size: 2.8vmin;
  font-weight: 500;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function List() {
  const [updateList, setUpdateList] = useState('');
  const [getAuthor, setGetAuthor] = useState('');
  const { listId } = useParams();
  const [listData, setListData] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateIntro, setUpdateIntro] = useState('');
  const [showCoinList, setShowCoinList] = useState(false);
  const [showReduceCoin, setShowReduceCoin] = useState(false);
  const [removeMovieAlert, setRemoveMovieAlert] = useState(false);

  const currentUserId = auth.currentUser?.uid;
  const authorId = updateList?.authorId;
  const isAuthor = authorId === currentUserId;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .doc(listId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (isMounted) {
          setUpdateList(data);
          setUpdateTitle(data.listTitle);
          setUpdateIntro(data.listIntro);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [listId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .doc(listId)
      .collection('ListData')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setListData(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(authorId)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (isMounted) setGetAuthor(data);
      });
    return () => {
      isMounted = false;
    };
  }, [authorId]);

  const handleUpdateListTitle = () => {
    firestore.collection('Lists').doc(listId).update({
      listTitle: updateTitle,
    });
  };

  const handleUpdateListIntro = () => {
    firestore.collection('Lists').doc(listId).update({
      listIntro: updateIntro,
    });
  };

  const isCollected = updateList?.collect?.includes(currentUserId);

  const toggleCollect = () => {
    if (isCollected) {
      firestore
        .collection('Lists')
        .doc(listId)
        .update({
          collect: firebase.firestore.FieldValue.arrayRemove(currentUserId),
        });
    } else {
      firestore
        .collection('Lists')
        .doc(listId)
        .update({
          collect: firebase.firestore.FieldValue.arrayUnion(currentUserId),
        });
    }
  };

  const handleDeleteMovie = (id, poster) => {
    firestore
      .collection('Lists')
      .doc(listId)
      .collection('ListData')
      .doc(id)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });

    firestore
      .collection('Lists')
      .doc(listId)
      .update({
        listPosters: firebase.firestore.FieldValue.arrayRemove(poster),
      });
  };

  return (
    <ListSection>
      <ListContainer>
        <ListHead>
          <ProfileContainer>
            <ProfileImgDiv>
              <ProfileImg src={getAuthor.profileImg} alt="" />
            </ProfileImgDiv>
            <ProfileName>{getAuthor.userName}</ProfileName>
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
          <ListIntroDiv>
            <EditTitle>
              <ListTitle
                isAuthor={isAuthor}
                placeholder="請寫下片單名稱..."
                defaultValue={updateTitle}
                readOnly={isAuthor ? false : true}
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />

              {isAuthor ? (
                <TitleSaveDiv onClick={handleUpdateListTitle}>
                  <SaveIcon />
                </TitleSaveDiv>
              ) : (
                ''
              )}
              <CollectNum>
                共 {updateList?.collect?.length || 0} 人收藏
              </CollectNum>
            </EditTitle>
            <EditIntro>
              <ListIntro
                isAuthor={isAuthor}
                readOnly={isAuthor ? false : true}
                placeholder="這個片單是關於..."
                defaultValue={updateList.listIntro}
                onChange={(e) => {
                  setUpdateIntro(e.target.value);
                }}
              />
              {isAuthor ? (
                <IntroSaveDiv onClick={handleUpdateListIntro}>
                  <SaveIcon />
                </IntroSaveDiv>
              ) : (
                ''
              )}
            </EditIntro>
          </ListIntroDiv>
        </ListHead>

        <ArrangeListDiv>
          {listData !== '' &&
            listData.map((item) => (
              <>
                <Box key={item.movieId}>
                  {isAuthor ? (
                    <DeleteDiv onClick={() => setRemoveMovieAlert(true)}>
                      <DeleteIcon />
                    </DeleteDiv>
                  ) : (
                    ''
                  )}
                  <MyLink to={`/movie/${item.movieId}`}>
                    <Poster src={item.poster} alt="" />
                    <Overlay>
                      <MovieTitle>{item.chTitle}</MovieTitle>
                    </Overlay>
                  </MyLink>
                </Box>
                <ListDeleteAlert
                  id={item.movieId}
                  poster={item.poster}
                  trigger={removeMovieAlert}
                  setTrigger={setRemoveMovieAlert}
                  message={'確認要移除此電影嗎？'}
                  remove={handleDeleteMovie}
                />
              </>
            ))}
        </ArrangeListDiv>
      </ListContainer>
      <CoinAlert
        trigger={showCoinList}
        setTrigger={setShowCoinList}
        type={'片單'}
        coin={300}
      />
      <ReduceCoinAlert
        trigger={showReduceCoin}
        setTrigger={setShowReduceCoin}
        type={'片單'}
        coin={300}
      />
    </ListSection>
  );
}
