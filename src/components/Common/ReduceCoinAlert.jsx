import styled from 'styled-components';
import coinImg from '../../images/limocoin.png';
import AOS from 'aos';
import { useEffect } from 'react';
import Sparkles from 'react-sparkle';
import {
  PopupDiv,
  AlertWindow,
  AlertWord,
  AlertImg,
  SendBtn,
} from './Common.style';

export default function ReduceCoinAlert({ trigger, setTrigger, type, coin }) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertWord>
            你已成功取消發表{type} <br />
            收回原獎賞LIMO幣
          </AlertWord>
          <CoinDiv>
            <Sparkles
              color={'#FFEB7F'}
              count={8}
              minSize={15}
              maxSize={20}
              overflowPx={40}
              fadeOutSpeed={10}
              newSparkleOnFadeOut={true}
              flicker={false}
              flickerSpeed={'normal'}
            />
            <AlertImg src={coinImg} alt="" />
            <CoinNum>- {coin}</CoinNum>
          </CoinDiv>
          <SendBtn onClick={() => setTrigger(false)}>確認</SendBtn>
        </AlertWindow>
      </PopupDiv>
    )
  );
}

const CoinDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30vmin;
  height: 20vmin;
`;

const CoinNum = styled.div`
  font-size: 5vmin;
  font-weight: 700;
  color: #e34363;
`;
