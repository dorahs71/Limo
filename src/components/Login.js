import styled from 'styled-components';
import { useState } from 'react';
import firebase from '../utils/firebase';
import { auth, createUserDoc } from '../utils/firebase';
import googleLogo from '../images/google.png';
import fbLogo from '../images/fb.png';
import { Cancel } from '@material-ui/icons';
import poster from '../images/loginPoster.jpeg';
import { useHistory } from 'react-router-dom';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  width: 50vmin;
  height: 80vmin;
  background: #333;
  border: 1px solid #75e799;
  padding: 20px 20px;
  position: relative;
  top: 70px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 25rem;
    height: 580px;
  }
`;

const Poster = styled.img`
  width: 100%;
  opacity: 0.09;
  z-index: 1;
  position: absolute;
  height: 100%;
`;

const InputDiv = styled.div`
  margin-top: 3vmin;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1280px) {
    margin-top: 20px;
    font-size: 18px;
  }
`;

const InputName = styled.div`
  display: inline-block;
`;

const Input = styled.input`
  font-size: 20px;
  width: 36vmin;
  height: 5vmin;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff8dc;
  &:focus {
    outline: none;
  }
  @media (max-width: 1280px) {
    width: 15rem;
    font-size: 18px;
  }
`;

const Button = styled.div`
  margin-top: 30px;
  height: 3rem;
  padding: 5px 5px;
  border-radius: 5px;
  border: 5px double #7fffd4;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  line-height: 3rem;
  &:hover {
    background: #7fffd4;
    color: #191970;
    border: 5px double #20b2aa;
  }
  @media (max-width: 1280px) {
    height: 2rem;
    font-size: 18px;
    line-height: 2rem;
  }
`;

const GoogleBtn = styled.div`
  margin-top: 60px;
  background: #fff;
  width: 95%;
  height: 3rem;
  padding: 5px 5px;
  font-size: 23px;
  box-shadow: 2px 2px 5px #7fffd4;
  color: #333;
  line-height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1280px) {
    height: 2rem;
    font-size: 18px;
    line-height: 2rem;
    margin-top: 40px;
  }
`;

const GoogleText = styled.div`
  display: block;
  margin-left: 5px;
`;

const GoogleLogo = styled.img`
  display: block;
  width: 5vmin;
  height: 5vmin;
  margin-left: 9.5vmin;
  @media (max-width: 1280px) {
    width: 36px;
    height: 40px;
    margin-left: 40px;
  }
`;
const FbText = styled.div`
  display: block;
  margin-left: 5px;
`;

const FbLogo = styled.img`
  display: block;
  width: 4.5vmin;
  height: 4vmin;
  margin-left: 10vmin;
  @media (max-width: 1280px) {
    width: 35px;
    height: 30px;
    margin-left: 40px;
  }
`;

const FbBtn = styled(GoogleBtn)`
  background: #4a66ad;
  color: #fff;
  @media (max-width: 1280px) {
    margin-top: 30px;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  border-radius: 5px;
  text-shadow: 2px 2px #778899;
  background: linear-gradient(to top, #7fffd4, #90ee90, transparent);
  @media (max-width: 1280px) {
    font-size: 32px;
  }
`;

const RegisterHeader = styled(Header)`
  background: linear-gradient(to top, #7fffd4, #b0e0e6, transparent);
`;

const Content = styled.div`
  padding: 20px 20px;
  z-index: 3;
`;

const Seperator = styled.hr`
  margin-top: 80px;
  border: 0;
  height: 2px;
  overflow: visible;
  padding: 0;
  text-align: center;
  background-image: linear-gradient(
    to right,
    transparent,
    #fffacd,
    #75e799,
    transparent
  );
  &:after {
    content: 'OR';
    display: inline-block;
    position: relative;
    top: -0.85em;
    font-size: 18px;
    padding: 0 0.3em;
    background: transparent;
    text-shadow: 2px 2px #778899;
  }
  @media (max-width: 1280px) {
    margin-top: 40px;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const ChangeBtn = styled.div`
  border: 3px solid #75e799;
  padding: 5px 5px;
  border-radius: 40px;
  text-align: center;
  margin-top: 80px;
  color: #75e799;
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: #fff;
  }
  @media (max-width: 1280px) {
    font-size: 16px;
    margin-top: 40px;
  }
`;

const ErrorText = styled.p`
  font-size: 16px;
  color: #dc143c;
  margin: 8px 95px;
`;

export default function Login({ trigger, setTrigger }) {
  const [activeItem, setActiveItem] = useState('login');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showError, setShowError] = useState('');
  const history = useHistory();

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleLogin = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user);
        setTrigger(false);
        // createUserDoc(user, userName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const fbLogin = () => {
    auth
      .signInWithPopup(fbProvider)
      .then((user) => {
        console.log(user);
        setTrigger(false);
        // createUserDoc(user, userName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    if (activeItem === 'register') {
      setShowError('');
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          createUserDoc(user, userName);
          history.push('/');
          setTrigger(false);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setShowError('這個信箱已經註冊囉');
              break;
            case 'auth/invalid-email':
              setShowError('請輸入有效的email');
              break;
            case 'auth/weak-password':
              setShowError('密碼要輸入至少六位喔');
              break;
            default:
          }
        });
    } else if (activeItem === 'login') {
      setShowError('');
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
          console.log(data);
          history.push('/');
          setTrigger(false);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              setShowError('請輸入有效的email');
              break;
            case 'auth/user-not-found':
              setShowError('這個信箱還沒註冊過呦');
              break;
            case 'auth/wrong-password':
              setShowError('密碼錯誤，請再確認呦');
              break;
            default:
          }
        });
    }
  };

  return trigger ? (
    <PopupDiv>
      <LoginDiv>
        <Poster src={poster} alt="" />
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        {activeItem === 'login' && (
          <Content>
            <Header>歡迎登入</Header>
            <InputDiv>
              <InputName>信箱</InputName>
              <Input
                label="信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" 請輸入信箱"
              />
            </InputDiv>
            <InputDiv>
              <InputName>密碼</InputName>
              <Input
                label="密碼"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" 請輸入 6 位數密碼"
              />
            </InputDiv>
            <Button onClick={onSubmit}>登入LIMO</Button>
            {showError && <ErrorText>{showError}</ErrorText>}
            <Seperator />
            <GoogleBtn onClick={googleLogin}>
              <GoogleLogo src={googleLogo} alt="" />
              <GoogleText>以Google身份登入</GoogleText>
            </GoogleBtn>
            <FbBtn onClick={fbLogin}>
              <FbLogo src={fbLogo} alt="" />
              <FbText>以Facebook身份登入</FbText>
            </FbBtn>
            <ChangeBtn
              onClick={() => {
                setActiveItem('register');
                setEmail('');
                setPassword('');
              }}
            >
              想加入LIMO嗎？快來註冊!
            </ChangeBtn>
          </Content>
        )}
        {activeItem === 'register' && (
          <Content>
            <RegisterHeader>新人註冊</RegisterHeader>
            <InputDiv>
              <InputName>暱稱</InputName>
              <Input
                label="暱稱"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="請輸入暱稱"
              />
            </InputDiv>
            <InputDiv>
              <InputName>信箱</InputName>
              <Input
                label="信箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" 請輸入信箱"
              />
            </InputDiv>
            <InputDiv>
              <InputName>密碼</InputName>
              <Input
                label="密碼"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" 請輸入 6 位數密碼"
              />
            </InputDiv>
            <InputDiv>
              <InputName>確認密碼</InputName>
              <Input
                label="密碼"
                value={confirm}
                type="password"
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="請再輸入一次密碼"
              />
            </InputDiv>
            <Button onClick={onSubmit}>註冊LIMO</Button>
            {showError && <ErrorText>{showError}</ErrorText>}
            <ChangeBtn
              onClick={() => {
                setActiveItem('login');
                setEmail('');
                setPassword('');
                setConfirm('');
                setUserName('');
              }}
            >
              已經是LIMO會員了嗎？歡迎登入!
            </ChangeBtn>
          </Content>
        )}
      </LoginDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
