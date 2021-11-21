import styled from 'styled-components';
import ListStatus from '../components/ListStatus';
import { Save, Favorite, DeleteOutline, Edit } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useHistory, useParams, Link } from 'react-router-dom';
import ReduceCoinAlert from '../components/ReduceCoinAlert';
import CoinAlert from '../components/CoinAlert';
import loading from '../images/loading.gif';
import LoginAlert from '../components/LoginAlert';
import ListBox from '../components/ListBox';

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
  @media (max-width: 600px) {
    min-height: 90vh;
  }
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
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const EditIcon = styled(Edit)`
  transform: scale(1.5);
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
  margin-left: 2vmin;
  cursor: pointer;
  color: #2b2929;
`;

const ListIntro = styled.textarea`
  margin-top: 4vmin;
  padding-top: 2vmin;
  background: transparent;
  width: 100%;
  color: #fff;
  min-height: 16vmin;
  /* cursor: ${(props) => (props.isAuthor ? 'text' : 'default')}; */
  /* overflow: visible; */
  white-space: pre-wrap;
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
    border: 1px solid rgba(127, 255, 212, 0.7);
  }
`;

const ReadIntro = styled.div`
  font-size: 2.5vmin;
  margin-top: 4vmin;
  padding-top: 2vmin;
  background: transparent;
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  color: #fff;
  min-height: 16vmin;
`;

const EditIntro = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-end;
  justify-content: center;
  &:hover ${IntroSaveDiv} {
    color: #898f86;
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
  font-size: 2.5vmin;
  @media (max-width: 600px) {
  }
`;

const DeleteDiv = styled.div`
  height: 3vmin;
  position: absolute;
  display: none;
  width: 3vmin;
  z-index: 12;
  cursor: pointer;
  bottom: 5vmin;
`;

const DeleteIcon = styled(DeleteOutline)`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: scale(1.5);
  color: #333;
  z-index: 20;
  &:hover {
    background: #edabab;
    color: #fff;
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

const Loading = styled.img`
  width: 10vmin;
  height: 10vmin;
`;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  const [loginAlert, setLoginAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  const history = useHistory();
  const currentUserId = auth.currentUser?.uid;
  const authorId = updateList?.authorId;
  const isAuthor = authorId === currentUserId;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .doc(listId)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          if (isMounted) {
            setUpdateList(data);
            setUpdateTitle(data.listTitle);
            setUpdateIntro(data.listIntro);
          }
        } else {
          history.push('/404');
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
    setEdit(false);
    firestore.collection('Lists').doc(listId).update({
      listIntro: updateIntro,
    });
  };

  const isCollected = updateList?.collect?.includes(currentUserId);

  const toggleCollect = () => {
    if (currentUserId) {
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
    } else {
      setLoginAlert(true);
    }
  };

  const handleKeyDown = (e) => {
    e.target.style.height = '16vmin';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return listData ? (
    <ListSection>
      <ListContainer>
        <ListHead>
          <ProfileContainer>
            <MyLink to={`/profile/${getAuthor.uid}/list`}>
              <ProfileImgDiv>
                <ProfileImg src={getAuthor.profileImg} alt="" />
              </ProfileImgDiv>
            </MyLink>
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
              {isAuthor && edit ? (
                <ListIntro
                  isAuthor={isAuthor}
                  placeholder="這個片單是關於..."
                  defaultValue={updateList.listIntro}
                  onKeyDown={(e) => handleKeyDown(e)}
                  onChange={(e) => {
                    setUpdateIntro(e.target.value);
                  }}
                />
              ) : (
                <ReadIntro>{updateList.listIntro}</ReadIntro>
              )}
              {isAuthor && edit && (
                <IntroSaveDiv onClick={handleUpdateListIntro}>
                  <SaveIcon />
                </IntroSaveDiv>
              )}
              {isAuthor && !edit && (
                <IntroSaveDiv onClick={() => setEdit(true)}>
                  <EditIcon />
                </IntroSaveDiv>
              )}
            </EditIntro>
          </ListIntroDiv>
        </ListHead>

        <ArrangeListDiv>
          {listData !== '' &&
            listData?.map((item) => (
              <ListBox
                key={item.movieId}
                isAuthor={isAuthor}
                movieId={item.movieId}
                poster={item.poster}
                listId={listId}
                title={item.chTitle}
              />
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
      <LoginAlert
        trigger={loginAlert}
        setTrigger={setLoginAlert}
        message={'記得先登入會員才可以收藏片單喔！'}
      />
    </ListSection>
  ) : (
    <LoadingDiv>
      <Loading src={loading} alt="" />
    </LoadingDiv>
  );
}
