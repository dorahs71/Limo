import styled from 'styled-components';
import { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { NotificationsNone, SearchOutlined } from '@material-ui/icons';
import Login from './Login';
import { useHistory, Link } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import algolia from '../utils/algolia';
import moment from 'moment';
import 'moment/locale/zh-tw';

const MyLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.img`
  margin-left: 30px;
  width: 60px;
  height: 48px;
`;

const FunctionDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  border: 0;
  width: 28px;
  height: 28px;
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  margin-right: 3px;
  margin-left: auto;
`;

const SearchIcon = styled(SearchOutlined)`
  transform: scale(1.2);
  color: #fff;
  margin-top: 2px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 30px;
  width: 100%;
  font-size: 2.5vmin;
  padding: 0 0.5em;
  border: 0;
  color: #fff;
  position: absolute;
  top: 3px;
  bottom: 0;
  left: 0;
  opacity: 0;
  line-height: calc(40px - 3px);
  background: transparent;
  &:focus {
    outline: 0;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 2.5vmin;
    color: #a9a9a9;
  }
`;

const SearchDiv = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  color: #fff;
  background: transparent;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 2px solid #75e799;
  z-index: 0;
  border-radius: 50px;
  margin-right: 35px;
  padding: 3px;
  transition: width 500ms ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    width: 20rem;
  }
  &:hover ${SearchBtn} {
    background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
  }
  &:hover ${SearchIcon} {
    color: #333;
    transition: color 150ms ease-in-out;
  }
  &:hover ${SearchBar} {
    opacity: 1;
  }
`;

const NotificationDiv = styled.div`
  width: 35vmin;
  height: auto;
  background: #333;
  padding: 0 2vmin 0 2vmin;
  position: absolute;
  font-weight: bold;
  justify-content: center;
  overflow: scroll;
  right: 30px;
  top: 64px;
  display: none;
  &:hover {
    display: block;
  }
`;

const RemindDot = styled.div`
  position: absolute;
  text-align: center;
  background: red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  bottom: 3vmin;
  right: 11vmin;
`;

const BellIcon = styled(NotificationsNone)`
  transform: scale(1.3);
  margin-right: 25px;
  cursor: pointer;
`;

const BellDiv = styled.div`
  display: block;
  padding: 3vmin 0 3vmin 0;
  &:hover ${NotificationDiv} {
    display: block;
  }
`;

const AlertListBlock = styled.div`
  width: 100%;
  height: 15vmin;
  border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  display: flex;
  align-items: center;
`;

const AlertCommentBlock = styled.div`
  width: 100%;
  height: 15vmin;
  border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  display: flex;
  align-items: center;
`;

// const AlertReviewBlock = styled.div`
//   width: 100%;
//   height: 15vmin;
//   border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
//   display: flex;
//   align-items: center;
// `;

const AlertCardBlock = styled.div`
  width: 100%;
  height: 15vmin;
  border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  display: flex;
  align-items: center;
`;

const AlertProfile = styled.img`
  width: 5vmin;
  height: 5vmin;
`;

const AlertMessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1vmin;
`;

const AlertMessage = styled.div`
  font-size: 2vmin;
  color: rgba(255, 255, 255, 0.7);
`;

const AlertTime = styled.div`
  margin-top: 3vmin;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
`;

const InfoDiv = styled.div`
  position: absolute;
  font-weight: bold;
  right: 30px;
  top: 70px;
  width: 12rem;
  height: auto;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
  padding: 1vmin 0;
  background: linear-gradient(180deg, #444, #000);
  box-shadow: 2px 2px 10px 2px #00bfa5;
  border-radius: 30px;
  &:hover {
    display: block;
  }
`;

const ProfilePic = styled.img`
  width: 3vmin;
  height: 3.2vmin;
  margin-top: 2px;
  cursor: pointer;
  @media (max-width: 1280px) {
    width: 4vmin;
    height: 4.5vmin;
  }
`;

const ProfileDiv = styled.div`
  display: block;
  margin-right: 30px;
  padding: 3vmin 0 3vmin 0;
  &:hover ${InfoDiv} {
    display: flex;
  }
`;

const LoginDiv = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  margin-right: 30px;
`;

const FooterDiv = styled.div`
  background: #1b1919;
  bottom: 0;
  left: 0;
  display: block;
  text-align: center;
  font-size: 16px;
  margin: 0;
  height: 40px;
  line-height: 40px;
  box-shadow: 1px -8px 13px -6px rgba(27, 25, 25, 0.66);
`;

export const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [hasUser, setHasUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [keyword, setKeyword] = useState('');
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);
  // const keyword = useSelector((state) => state.keyword);

  const dispatch = useDispatch();

  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    auth.onAuthStateChanged((user) => {
      if (isMounted) setHasUser(user);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(currentUserId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (isMounted) dispatch({ type: 'getCurrentUser', todo: data || '' });
      });
    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(currentUserId)
      .collection('Notifications')
      .orderBy('date', 'desc')
      .onSnapshot((collection) => {
        const data = collection.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setNotification(data);
      });
    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  const getSearchData = () => {
    algolia.search(keyword).then((result) => {
      const searchResult = result.hits.map((hit) => {
        return hit;
      });
      dispatch({ type: 'getSearch', todo: searchResult });
      // history.push('/search');
      history.push(`/search/${keyword || undefined}`);
    });
  };

  const keypressSearchData = (e) => {
    if (e.key === 'Enter') {
      algolia.search(keyword).then((result) => {
        const searchResult = result.hits.map((hit) => {
          return hit;
        });
        dispatch({ type: 'getSearch', todo: searchResult });
        history.push('/search');
      });
    }
  };

  let listData = [];
  let cardData = [];
  let commentData = [];

  if (notification !== '') {
    listData = notification.filter((x) => x.type === 'list');
    cardData = notification.filter((x) => x.type === 'card');
    commentData = notification.filter((x) => x.type === 'comment');
  }

  return (
    <>
      <MyLink to="/">
        <Logo src={logo} alt="logo" />
      </MyLink>
      <FunctionDiv>
        <SearchDiv>
          <SearchBar
            type="text"
            placeholder="請輸入電影名、演員、標籤"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchBtn onClick={getSearchData} onKeyPress={keypressSearchData}>
            <SearchIcon />
          </SearchBtn>
        </SearchDiv>
        {hasUser ? (
          <>
            <BellDiv>
              <BellIcon />
              <RemindDot />
              <NotificationDiv>
                {listData?.map((item) => (
                  <AlertListBlock>
                    <AlertProfile src={item.authorImg} alt="" />
                    <AlertMessageDiv>
                      <AlertMessage>
                        {item.authorName}發表新片單「{item.listTitle}」
                      </AlertMessage>
                      <AlertTime>
                        {moment(item.date.toDate()).fromNow()}
                      </AlertTime>
                    </AlertMessageDiv>
                  </AlertListBlock>
                ))}
                {commentData?.map((item) => (
                  <AlertCommentBlock>
                    <AlertProfile src={item.authorImg} alt="" />
                    <AlertMessageDiv>
                      <AlertMessage>
                        {item.authorName}在電影「{item.chTitle}」中發表新評論
                      </AlertMessage>
                      <AlertTime>
                        {moment(item.date.toDate()).fromNow()}
                      </AlertTime>
                    </AlertMessageDiv>
                  </AlertCommentBlock>
                ))}
                {/* <AlertReviewBlock>
                  <AlertProfile src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=e38c438f-7632-45e2-aadc-ea2fd82f6956" />
                  <AlertMessage>
                    甜茶茶在電影「蠟筆小新」中您的評論裡發表新留言
                  </AlertMessage>
                </AlertReviewBlock> */}
                {cardData?.map((item) => (
                  <AlertCardBlock>
                    <AlertProfile src={item.authorImg} alt="" />
                    <AlertMessageDiv>
                      <AlertMessage>
                        {item.authorName}送給你一張新卡片
                      </AlertMessage>
                      <AlertTime>
                        {moment(item.date.toDate()).fromNow()}
                      </AlertTime>
                    </AlertMessageDiv>
                  </AlertCardBlock>
                ))}
              </NotificationDiv>
            </BellDiv>
            <ProfileDiv>
              <MyLink to={`/profile/${currentUserId}`}>
                <ProfilePic src={currentUser?.profileImg} />
              </MyLink>
              {/* <InfoDiv>
                <div>暱稱：{currentUser?.userName}</div>
                <div>日誌：30</div>
                <div>片單：30</div>
                <div>評論：30</div>
              </InfoDiv> */}
            </ProfileDiv>
          </>
        ) : (
          <LoginDiv onClick={() => setShowLogin(true)}>註冊/登入</LoginDiv>
        )}
      </FunctionDiv>
      <Login trigger={showLogin} setTrigger={setShowLogin} />
    </>
  );
};

export const Footer = () => {
  return <FooterDiv>Copyright © 2021 LIMO</FooterDiv>;
};
