import styled from 'styled-components';
import { useState, useEffect } from 'react';
import firebase from '../utils/firebase';
import { auth, firestore } from '../utils/firebase';
import googleLogo from '../images/google.png';
// import fbLogo from '../images/fb.png';
import { Cancel } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import WarningAlert from './WarningAlert';
// import AOS from 'aos';

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
  font-size: 2.5vmin;
  width: 55vmin;
  height: 70vmin;
  padding: 2vmin 20px;
  position: relative;
  background: #343939;
  opacity: 0.8;
  top: 10vmin;
  margin: 0 auto;
  align-items: center;
`;

const InputDiv = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1280px) {
    margin-top: 20px;
  }
`;

const InputName = styled.div`
  display: inline-block;
`;

const Input = styled.input`
  font-size: 2.5vmin;
  width: 36vmin;
  height: 5vmin;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  margin-top: 30px;
  height: 3rem;
  padding: 5px 5px;
  border-radius: 5px;
  background: transparent;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;
  font-size: 2.5vmin;
  text-align: center;
  line-height: 3rem;
  font-weight: 400;
  background: #62d498;
  color: #333;
  &:hover {
    background: #8aefba;
    color: #fff;
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
  height: 4vmin;
  padding: 5px 5px;
  font-size: 2.5vmin;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  color: #333;
  line-height: 4vmin;
  display: flex;
  align-items: center;
  cursor: pointer;
  /* @media (max-width: 1280px) {
    height: 2rem;
    font-size: 18px;
    line-height: 2rem;
    margin-top: 40px;
  } */
`;

const GoogleText = styled.div`
  display: block;
  margin-left: 5px;
`;

const GoogleLogo = styled.img`
  display: block;
  margin-top: -0.5vmin;
  width: 4.5vmin;
  height: 4.5vmin;
  margin-left: 4vmin;
  /* @media (max-width: 1280px) {
    width: 36px;
    height: 40px;
    margin-left: 40px;
  } */
`;
// const FbText = styled.div`
//   display: block;
//   margin-left: 5px;
// `;

// const FbLogo = styled.img`
//   display: block;
//   width: 4.5vmin;
//   height: 4vmin;
//   margin-left: 10vmin;
//   @media (max-width: 1280px) {
//     width: 35px;
//     height: 30px;
//     margin-left: 40px;
//   }
// `;

// const FbBtn = styled(GoogleBtn)`
//   background: #4a66ad;
//   color: #fff;
//   @media (max-width: 1280px) {
//     margin-top: 30px;
//   }
// `;

const Title = styled.div`
  font-size: 4vmin;
  font-weight: 800;
  color: #fff;
  width: 16vmin;
  border-bottom: 4px solid #75e799;
  margin: 0 auto;
  text-align: center;
`;

const RegisterTitle = styled(Title)`
  border-bottom: 4px solid #4ac3e0;
`;

const Content = styled.div`
  padding: 20px 20px;
  flex-direction: column;
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
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  border-radius: 50%;
`;

const ChangeBtn = styled.div`
  border: 3px solid #75e799;
  padding: 5px 5px;
  border-radius: 40px;
  text-align: center;
  margin-top: 8vmin;
  font-weight: 500;
  color: #75e799;
  font-size: 2vmin;
  cursor: pointer;
  :hover {
    background: #75e799;
    color: #fff;
  }
  /* @media (max-width: 1280px) {
    margin-top: 40px;
  } */
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
  const [profileArr, setProfileArr] = useState('');
  const [confirmAlert, setConfirmAlert] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //   AOS.init({ duration: 100 });
  // }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('ProfileImages')
      .doc('Change')
      .get()
      .then((doc) => {
        if (isMounted) setProfileArr(doc.data().images);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  function getRandom(x) {
    return Math.floor(Math.random() * x);
  }

  let num = getRandom(9);
  const imgUrl = profileArr[num]?.imgUrl;

  const createUserDoc = async (user, userName) => {
    if (!user) return;

    auth.currentUser.updateProfile({
      displayName: userName,
      photoURL: imgUrl,
    });
    const userRef = firestore.doc(`Users/${user.uid}`);
    const { email, uid } = user;
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      try {
        userRef.set({
          email,
          uid,
          birthday: new Date(),
          profileImg: imgUrl,

          changeImg: [imgUrl],
          userName,
          coin: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const googleCreateUserDoc = async (doc) => {
    if (doc.additionalUserInfo.isNewUser) {
      auth.currentUser.updateProfile({
        photoURL: imgUrl,
      });
      const userRef = firestore.doc(`Users/${doc.user.uid}`);
      const { email, uid, displayName } = doc.user;
      const snapshot = await userRef.get();
      if (!snapshot.exists) {
        try {
          userRef.set({
            email,
            uid,
            birthday: new Date(),
            profileImg: imgUrl,
            changeImg: [imgUrl],
            userName: displayName,
            coin: 0,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const googleLogin = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((doc) => {
        googleCreateUserDoc(doc);
        setTrigger(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    if (activeItem === 'register') {
      if (password === confirm) {
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
      } else {
        setConfirmAlert(true);
      }
    } else if (activeItem === 'login') {
      setShowError('');
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data) => {
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
        <Close
          onClick={() => {
            setTrigger(false);
            setShowError('');
            setEmail('');
            setPassword('');
            setConfirm('');
            setUserName('');
          }}
        >
          <CancelIcon />
        </Close>
        {activeItem === 'login' && (
          <Content>
            <Title>歡迎登入</Title>
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
              <GoogleText>以Google身份註冊和登入</GoogleText>
            </GoogleBtn>
            {/* <FbBtn onClick={fbLogin}>
              <FbLogo src={fbLogo} alt="" />
              <FbText>以Facebook身份登入</FbText>
            </FbBtn> */}
            <ChangeBtn
              onClick={() => {
                setActiveItem('register');
                setEmail('');
                setPassword('');
                setShowError('');
              }}
            >
              想加入LIMO嗎？快來註冊!
            </ChangeBtn>
          </Content>
        )}
        {activeItem === 'register' && (
          <Content>
            <RegisterTitle>新人註冊</RegisterTitle>
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
                setShowError('');
              }}
            >
              已經是LIMO會員了嗎？歡迎登入!
            </ChangeBtn>
          </Content>
        )}
      </LoginDiv>
      <WarningAlert
        trigger={confirmAlert}
        setTrigger={setConfirmAlert}
        message={'您的密碼與確認密碼欄位不一致，請再確認'}
      />
    </PopupDiv>
  ) : (
    ''
  );
}
