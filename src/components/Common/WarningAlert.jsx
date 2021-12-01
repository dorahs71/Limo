import warning from '../../images/warning.png';
import AOS from 'aos';
import { useEffect } from 'react';
import {
  PopupDiv,
  AlertWindow,
  AlertWord,
  AlertImg,
  SendBtn,
} from './Common.style';

export default function WarningAlert({ trigger, setTrigger, message }) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);
  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={warning} alt="" />
          <AlertWord>{message}</AlertWord>
          <SendBtn onClick={() => setTrigger(false)}>確認</SendBtn>
        </AlertWindow>
      </PopupDiv>
    )
  );
}
