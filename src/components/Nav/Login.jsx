import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PopupDiv, CancelIcon } from '../Common/Common.style';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';
import { getProfileImg } from '../../utils/firebase';
import AOS from 'aos';

export default function Login({ trigger, setTrigger }) {
  const [activeItem, setActiveItem] = useState('login');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showError, setShowError] = useState('');
  const [profileArr, setProfileArr] = useState('');
  const history = useHistory();

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  useEffect(() => {
    getProfileImg(setProfileArr);
  }, []);

  function getRandom(x) {
    return Math.floor(Math.random() * x);
  }
  let num = getRandom(9);
  const imgUrl = profileArr[num]?.imgUrl;

  return (
    trigger && (
      <PopupDiv data-aos="zoom-in">
        <LoginDiv>
          <Close
            onClick={() => {
              setTrigger(false);
              setUserName('');
              setEmail('');
              setPassword('');
              setConfirm('');
              setShowError('');
            }}
          >
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
  width: 55vmin;
  height: 75vh;
  padding: 2vmin 20px;
  position: relative;
  background: #343939;
  opacity: 0.8;
  align-items: center;
  @media (max-width: 768px) {
    height: 55vh;
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
