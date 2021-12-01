import styled from 'styled-components';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import Login from './Login';
import { Link } from 'react-router-dom';
import { auth, getCurrentUserData } from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import Notification from './Notification';
import SearchSection from './SearchSection';

export const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [hasUser, setHasUser] = useState(null);
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
    const unsubscribe = getCurrentUserData(currentUserId, dispatch);
    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  return (
    <>
      <MyLink to="/">
        <Logo src={logo} alt="logo" />
      </MyLink>
      <FunctionDiv>
        <SearchSection dispatch={dispatch} />
        {currentUser ? (
          <>
            <Notification currentUserId={currentUserId} />
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

const MyLink = styled(Link)`
  text-decoration: none;
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
  &:hover {
    color: #75e799;
  }
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
