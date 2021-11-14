import styled from 'styled-components';
import ask from '../images/ask.png';
import AOS from 'aos';
import { useEffect } from 'react';

const PopupDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
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
  justify-self: center;
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

const BtnDiv = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-around;
`;

const SendBtn = styled.div`
  margin-top: 3vmin;
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

const CancleBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #898f86;
  border: 1px solid #898f86;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #b1b8ac;
    color: #fff;
  }
`;

export default function TagDeleteAlert({
  trigger,
  setTrigger,
  message,
  remove,
  tag,
}) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);
  return trigger ? (
    <PopupDiv>
      <AlertWindow data-aos="zoom-in">
        <AlertImg src={ask} alt="" />
        <AlertWord>{message}</AlertWord>
        <BtnDiv>
          <CancleBtn onClick={() => setTrigger(false)}>取消</CancleBtn>
          <SendBtn
            onClick={() => {
              remove(tag);
              setTrigger(false);
            }}
          >
            確認
          </SendBtn>
        </BtnDiv>
      </AlertWindow>
    </PopupDiv>
  ) : (
    ''
  );
}
