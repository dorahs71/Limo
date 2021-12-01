import styled from 'styled-components';
import { useState, useEffect } from 'react';
import {
  auth,
  getListData,
  removeCollectList,
  addCollectList,
  getAuthorData,
  getListIntro,
} from '../utils/firebase';
import { useHistory, useParams } from 'react-router-dom';
import ReduceCoinAlert from '../components/Common/ReduceCoinAlert';
import CoinAlert from '../components/Common/CoinAlert';
import LoginAlert from '../components/Common/LoginAlert';
import ListBox from '../components/List/ListBox';
import ListProfile from '../components/List/ListProfile';
import ListIntro from '../components/List/ListIntro';
import Loading from '../components/Common/Loading';

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
  const history = useHistory();
  const currentUserId = auth.currentUser?.uid;
  const authorId = updateList?.authorId;
  const isAuthor = authorId === currentUserId;
  const isCollected = updateList?.collect?.includes(currentUserId);

  useEffect(() => {
    let isMounted = true;
    getListIntro(
      listId,
      isMounted,
      setUpdateList,
      setUpdateTitle,
      setUpdateIntro,
      history
    );
    return () => {
      isMounted = false;
    };
  }, [listId]);

  useEffect(() => {
    const unsubscribe = getListData(listId, setListData);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getAuthorData(authorId, setGetAuthor);
    return () => {
      unsubscribe();
    };
  }, [authorId]);

  const toggleCollect = () => {
    if (currentUserId) {
      if (isCollected) {
        removeCollectList(listId, currentUserId);
      } else {
        addCollectList(listId, currentUserId);
      }
    } else {
      setLoginAlert(true);
    }
  };

  return listData ? (
    <ListSection>
      <ListContainer>
        <ListHead>
          <ListProfile
            getAuthor={getAuthor}
            isAuthor={isAuthor}
            authorId={authorId}
            updateList={updateList}
            listId={listId}
            updateTitle={updateTitle}
            setShowCoinList={setShowCoinList}
            setShowReduceCoin={setShowReduceCoin}
            isCollected={isCollected}
            toggleCollect={toggleCollect}
          />
          <ListIntro
            isAuthor={isAuthor}
            updateList={updateList}
            updateTitle={updateTitle}
            setUpdateTitle={setUpdateTitle}
            listId={listId}
          />
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
    <Loading />
  );
}

const ListSection = styled.div`
  display: flex;
  width: 100%;
  padding: 15vmin 0 5vmin 0;
  justify-content: center;
`;

const ListContainer = styled.div`
  display: flex;
  width: 80%;
  min-height: 75vh;
  flex-direction: column;
  @media (max-width: 600px) {
    min-height: 90vh;
  }
`;

const ListHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ArrangeListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  margin-top: 8vh;
`;
