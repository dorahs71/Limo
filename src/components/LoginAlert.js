import styled from 'styled-components';
import login from '../images/login.png';
import AOS from 'aos';
import { useEffect } from 'react';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(30, 30, 30, 0.2);
  z-index: 400;
`;

const AlertWindow = styled.div`
  top: 20vmin;
  display: flex;
  padding: 3vmin;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px;
  width: 30vmin;
  height: 40vmin;
  margin: 0 auto;
  background: #cad2c6;
`;

const AlertWord = styled.div`
  font-size: 2.5vmin;
  color: #333;
  font-weight: 400;
  text-align: center;
`;

const AlertImg = styled.img`
  width: 15vmin;
  height: 15vmin;
`;

const SendBtn = styled.div`
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #66cdaa;
  }
`;

export default function LoginAlert({ trigger, setTrigger, message }) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);
  return trigger ? (
    <PopupDiv>
      <AlertWindow data-aos="zoom-in">
        <AlertImg src={login} alt="" />
        <AlertWord>{message}</AlertWord>
        <SendBtn onClick={() => setTrigger(false)}>確認</SendBtn>
      </AlertWindow>
    </PopupDiv>
  ) : (
    ''
  );
}
