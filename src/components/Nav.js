import styled from 'styled-components';
import { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { SearchOutlined } from '@material-ui/icons';
import Login from './Login';
import { useHistory, Link } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import algolia from '../utils/algolia';
import moment from 'moment';
import 'moment/locale/zh-tw';
import bell from '../images/bell.png';

const MyLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.img`
  margin-left: 30px;
  width: 5vmin;
  height: 4vmin;
  @media (max-width: 1280px) {
    width: 6vmin;
    height: 5vmin;
  }
  @media (max-width: 600px) {
    width: 8vmin;
    height: 7vmin;
  }
`;

const FunctionDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SearchBtn = styled.button`
  border: 0;
  width: 2.5vmin;
  height: 2.5vmin;
  font-size: 2vmin;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  /* margin-right: 1vmin; */
  margin-left: auto;
  @media (max-width: 1280px) {
    width: 3vmin;
    height: 3vmin;
  }
  @media (max-width: 992px) {
    width: 3.5vmin;
    height: 3.5vmin;
  }

  @media (max-width: 500px) {
    width: 2vmin;
    height: 2vmin;
  }
  /* @media (max-width: 600px) {
    width: 5vmin;
    height: 5vmin;
  } */
`;

const SearchIcon = styled(SearchOutlined)`
  margin-left: -3px;
  transform: scale(1.1);
  color: #fff;
  margin-top: 2px;
  cursor: pointer;
  @media (max-width: 1280px) {
    margin-top: -1px;
    transform: scale(1);
  }
  @media (max-width: 1024px) {
    margin-top: 1px;
    transform: scale(1);
    margin-left: 3px;
  }
  @media (max-width: 992px) {
    margin-top: 0px;
    transform: scale(1);
    margin-left: -6px;
  }
  @media (max-width: 768px) {
    margin-left: 1px;
  }
  @media (max-width: 750px) {
    margin-left: -2px;
  }
  @media (max-width: 600px) {
    margin-top: -1px;
    margin-left: -4px;
  }
  @media (max-width: 500px) {
    transform: scale(0.8);
    margin-top: -15px;
    margin-left: -4px;
  }
  @media (max-width: 400px) {
    transform: scale(0.6);
    margin-top: -100px;
    margin-left: -8px;
  }
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 30px;
  width: 100%;
  font-size: 2vmin;
  padding: 0 0.5em;
  border: 0;
  color: #fff;
  position: absolute;
  top: 2px;
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
    font-size: 1.7vmin;
    color: #a9a9a9;
  }
  @media (max-width: 1280px) {
    font-size: 2.5vmin;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 2.5vmin;
    }
  }
`;

const SearchDiv = styled.div`
  width: 4vmin;
  height: 4vmin;
  display: flex;
  color: #fff;
  background: transparent;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 2px solid #75e799;
  z-index: 0;
  border-radius: 50px;
  margin-right: 2vmin;
  padding: 3px 6px 0 0;
  transition: width 500ms ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    width: 35vmin;
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
  @media (max-width: 1280px) {
    width: 4.5vmin;
    height: 4.5vmin;
    &:hover {
      width: 40vmin;
    }
  }
  @media (max-width: 1024px) {
    width: 4.2vmin;
    height: 4.2vmin;
  }
  @media (max-width: 992px) {
    width: 4.8vmin;
    height: 4.8vmin;
  }
  @media (max-width: 750px) {
    width: 5.2vmin;
    height: 5.2vmin;
    &:hover {
      width: 40vmin;
    }
  }

  @media (max-width: 600px) {
    width: 5.8vmin;
    height: 5.8vmin;
  }
`;

const NotificationDiv = styled.div`
  width: 35vmin;
  max-height: 60vmin;
  background: #333;
  position: absolute;
  /* font-weight: bold; */
  justify-content: center;
  overflow: scroll;
  right: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 64px;
`;

const RemindDot = styled.div`
  background: red;
  border-radius: 50%;
  width: 1vmin;
  height: 1vmin;
  align-self: center;
  margin-right: 1vmin;
  margin-top: -1vmin;
  z-index: 5;
  @media (max-width: 1280px) {
    width: 1.5vmin;
    height: 1.5vmin;
  }
`;

const BellImg = styled.img`
  width: 2.8vmin;
  height: 2.8vmin;
  margin-right: 2.5vmin;
  @media (max-width: 1280px) {
    margin-right: 2.7vmin;
    width: 3.5vmin;
    height: 3.5vmin;
  }
  @media (max-width: 600px) {
    width: 5vmin;
    height: 5vmin;
  }
`;

const BellDiv = styled.div`
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const AlertListBlock = styled.div`
  width: 80%;
  height: 8vmin;
  padding: 2vmin;
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  }
  &:hover {
    background: #777;
  }
`;

const NoAlert = styled.div`
  width: 80%;
  height: 2vmin;
  padding: 2vmin;
  display: flex;
  text-align: center;
`;

const AlertDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlertProfile = styled.img`
  width: 5vmin;
  height: 5vmin;
`;

const AlertMessage = styled.div`
  width: 80%;
  text-align: justify;
  font-weight: 400;
  margin-left: 1vmin;
  font-size: 2vmin;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 1280px) {
    font-size: 2.2vmin;
    font-weight: 500;
  }
`;

const AlertTime = styled.div`
  margin-top: 0.5vmin;
  font-size: 1.8vmin;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 1280px) {
    font-size: 2.2vmin;
    font-weight: 500;
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
  @media (max-width: 600px) {
    width: 5.5vmin;
    height: 6vmin;
  }
`;

const ProfileDiv = styled.div`
  display: block;
  margin-right: 30px;
  padding: 3vmin 0 3vmin 0;
`;

const LoginDiv = styled.div`
  cursor: pointer;
  font-size: 2vmin;
  font-weight: bold;
  margin-right: 30px;
`;

const FooterDiv = styled.div`
  width: 100%;
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
  const [showNotification, setShowNotification] = useState(false);
  const history = useHistory();
  const currentUser = useSelector((state) => state.currentUser);

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
      .limit(10)
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
      history.push(`/search/${keyword || undefined}`);
    });
  };

  const keypressSearchData = (e) => {
    if (e.keyCode === 13) {
      algolia.search(keyword).then((result) => {
        const searchResult = result.hits.map((hit) => {
          return hit;
        });
        dispatch({ type: 'getSearch', todo: searchResult });
        history.push(`/search/${keyword || undefined}`);
      });
    }
  };

  let notifyList = '';
  let newNotify = [];
  if (notification !== '') {
    notifyList = notification.filter((x) => x.read === false);
    notifyList.map((item) => {
      const data = item.notificationId;
      newNotify.push(data);
      return data;
    });
  }

  const toggleShowNotification = () => {
    if (showNotification) {
      setShowNotification(false);
    } else {
      setShowNotification(true);
      if (newNotify) {
        newNotify.map((item) => {
          firestore
            .collection('Users')
            .doc(currentUserId)
            .collection('Notifications')
            .doc(item)
            .update({
              read: true,
            });
          return item;
        });
      }
    }
  };

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
            onKeyDown={(e) => keypressSearchData(e)}
          />
          <SearchBtn onClick={getSearchData}>
            <SearchIcon />
          </SearchBtn>
        </SearchDiv>
        {currentUserId ? (
          <>
            <BellDiv onClick={toggleShowNotification}>
              <BellImg src={bell} alt="" />
              {notifyList?.length > 0 && <RemindDot />}
            </BellDiv>
            {showNotification ? (
              <NotificationDiv>
                {notification !== '' &&
                  notification?.map((item) => (
                    <AlertListBlock>
                      <MyLink to={item.link}>
                        <AlertDiv>
                          <AlertProfile src={item.authorImg} alt="" />
                          <AlertMessage>{item.message}</AlertMessage>
                        </AlertDiv>
                        <AlertTime>
                          {moment(item.date.toDate()).fromNow()}
                        </AlertTime>
                      </MyLink>
                    </AlertListBlock>
                  ))}
                {notification.length === 0 && (
                  <NoAlert>您尚未有新的通知呦！</NoAlert>
                )}
              </NotificationDiv>
            ) : (
              ''
            )}
            <ProfileDiv>
              <MyLink to={`/profile/${currentUserId}/list`}>
                <ProfilePic src={currentUser?.profileImg} />
              </MyLink>
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
