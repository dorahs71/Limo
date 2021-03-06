import styled from 'styled-components';
import { checkRegister } from '../../utils/firebase';
import {
  Content,
  InputDiv,
  InputName,
  Input,
  Button,
  ErrorText,
  ChangeBtn,
} from './Login.style';

export default function RegisterSection({
  setActiveItem,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  confirm,
  setConfirm,
  showError,
  setShowError,
  imgUrl,
  history,
  setTrigger,
}) {
  const onSubmit = () => {
    checkRegister(
      email,
      password,
      userName,
      confirm,
      imgUrl,
      setShowError,
      history,
      setTrigger
    );
  };

  const removeStatus = () => {
    setActiveItem('login');
    setEmail('test@limo.com');
    setPassword('test123');
    setConfirm('');
    setUserName('');
    setShowError('');
  };

  return (
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
      <ChangeBtn onClick={removeStatus}>
        已經是LIMO會員了嗎？歡迎登入!
      </ChangeBtn>
    </Content>
  );
}

const RegisterTitle = styled.div`
  border-bottom: 8px solid #4ac3e0;
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  width: 10vw;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    border-bottom: 4px solid #4ac3e0;
  }
  @media (max-width: 600px) {
    width: 17vw;
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    width: 18vw;
  }
`;
