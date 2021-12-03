import logout from '../../images/logout.png';
import AOS from 'aos';
import { useEffect } from 'react';
import {
  PopupDiv,
  AlertWindow,
  AlertWord,
  AlertImg,
  BtnDiv,
  SendBtn,
  CancelBtn,
} from '../Common/Common.style';

export default function LogoutAlert({ trigger, setTrigger, message, remove }) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);
  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={logout} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                remove();
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}
