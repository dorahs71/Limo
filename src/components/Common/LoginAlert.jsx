import login from '../../images/login.png';
import AOS from 'aos';
import { useEffect } from 'react';
import {
  PopupDiv,
  AlertWindow,
  AlertWord,
  AlertImg,
  SendBtn,
} from './Common.style';

export default function LoginAlert({ trigger, setTrigger, message }) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);
  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={login} alt="" />
          <AlertWord>{message}</AlertWord>
          <SendBtn onClick={() => setTrigger(false)}>確認</SendBtn>
        </AlertWindow>
      </PopupDiv>
    )
  );
}
