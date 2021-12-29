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

  if (trigger) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  const remove = () => {
    setTrigger(false);
    document.body.style.overflow = 'unset';
  };

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={login} alt="" />
          <AlertWord>{message}</AlertWord>
          <SendBtn onClick={remove}>確認</SendBtn>
        </AlertWindow>
      </PopupDiv>
    )
  );
}
