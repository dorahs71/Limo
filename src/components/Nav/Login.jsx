import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PopupDiv, CancelIcon } from '../Common/Common.style';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';
import { getProfileImg } from '../../utils/firebase';

export default function Login({ trigger, setTrigger }) {
  const [activeItem, setActiveItem] = useState('login');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('test@limo.com');
  const [password, setPassword] = useState('test123');
  const [confirm, setConfirm] = useState('');
  const [showError, setShowError] = useState('');
  const [profileArr, setProfileArr] = useState('');
  const history = useHistory();

  useEffect(() => {
    getProfileImg(setProfileArr);
    setActiveItem('login');
    setEmail('test@limo.com');
    setPassword('test123');
  }, [trigger]);

  const getRandom = (x) => {
    return Math.floor(Math.random() * x);
  };
  let num = getRandom(9);
  const imgUrl = profileArr[num]?.imgUrl;

  const removeStatus = () => {
    setTrigger(false);
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setShowError('');
  };

  return (
    trigger && (
      <PopupDiv>
        <LoginDiv>
          <Close onClick={removeStatus}>
            <CancelIcon />
          </Close>
          {activeItem === 'login' && (
            <LoginSection
              setActiveItem={setActiveItem}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showError={showError}
              setShowError={setShowError}
              imgUrl={imgUrl}
              history={history}
              setTrigger={setTrigger}
            />
          )}
          {activeItem === 'register' && (
            <RegisterSection
              setActiveItem={setActiveItem}
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirm={confirm}
              setConfirm={setConfirm}
              showError={showError}
              setShowError={setShowError}
              imgUrl={imgUrl}
              history={history}
              setTrigger={setTrigger}
            />
          )}
        </LoginDiv>
      </PopupDiv>
    )
  );
}

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  width: 40vw;
  height: 40vw;
  padding: 2vmin 20px;
  position: relative;
  background: #343939;
  opacity: 0.8;
  align-items: center;
  @media (max-width: 1560px) {
    height: 45vw;
  }
  @media (max-width: 1280px) {
    height: 50vw;
  }

  @media (max-width: 768px) {
    height: 55vw;
  }
  @media (max-width: 600px) {
    width: 60vw;
    height: 75vw;
  }
  @media (max-width: 375px) {
    width: 65vw;
    height: 85vw;
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
