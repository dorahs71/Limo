import styled from 'styled-components';
import { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { NotificationsNone, SearchOutlined } from '@material-ui/icons';
import Login from './Login';
import firebase from '../utils/firebase';

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
  font-size: 1.2rem;
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
    font-size: 1.2rem;
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
  &:focus-within {
    width: 20rem;
  }
  &:focus-within ${SearchBtn} {
    background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
  }
  &:focus-within ${SearchIcon} {
    color: #333;
    transition: color 150ms ease-in-out;
  }
  &:focus-within ${SearchBar} {
    opacity: 1;
  }
`;

const BellIcon = styled(NotificationsNone)`
  transform: scale(1.4);
  margin-right: 25px;
  cursor: pointer;
`;

const InfoDiv = styled.div`
  position: absolute;
  font-weight: bold;
  right: 30px;
  top: 70px;
  width: 12rem;
  height: 10rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
  background: linear-gradient(180deg, #444, #000);
  box-shadow: 2px 2px 10px 2px #00bfa5;
  border-radius: 30px;
`;

const ProfilePic = styled.img`
  width: 45px;
  height: 50px;
  margin-top: 2px;
  cursor: pointer;
`;

const ProfileDiv = styled.div`
  display: block;
  margin-right: 30px;
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
  background: #000;
  bottom: 0;
  left: 0;
  display: block;
  text-align: center;
  font-size: 16px;
  margin: 0;
  height: 40px;
  line-height: 40px;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(
      130deg,
      transparent,
      #75e799 20.07%,
      #f8ff00 50.07%,
      #319197 76.05%,
      transparent
    );
  }
`;

export const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [hasUser, setHasUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setHasUser(user);
    });
  }, []);

  return (
    <>
      <Logo src={logo} alt="logo" />
      <FunctionDiv>
        <SearchDiv>
          <SearchBar type="text" placeholder="今天想看什麼電影？" />
          <SearchBtn>
            <SearchIcon />
          </SearchBtn>
        </SearchDiv>
        {hasUser ? (
          <>
            <BellIcon />
            <ProfileDiv onClick={() => firebase.auth().signOut()}>
              <ProfilePic src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=e38c438f-7632-45e2-aadc-ea2fd82f6956" />
              <InfoDiv>
                <div>暱稱：愛的小貝比</div>
                <div>日誌：30</div>
                <div>片單：30</div>
                <div>收藏：30</div>
              </InfoDiv>
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
