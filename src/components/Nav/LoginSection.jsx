import googleLogo from '../../images/google.png';
import {
  Content,
  Title,
  InputDiv,
  InputName,
  Input,
  Button,
  ErrorText,
  Seperator,
  GoogleBtn,
  GoogleLogo,
  GoogleText,
  ChangeBtn,
} from './Login.style';
import { handleGoogleLogin, checkLogin } from '../../utils/firebase';

export default function LoginSection({
  setActiveItem,
  email,
  setEmail,
  password,
  setPassword,
  showError,
  setShowError,
  imgUrl,
  history,
  setTrigger,
}) {
  const onSubmit = () => {
    setShowError('');
    checkLogin(email, password, history, setTrigger, setShowError);
  };

  return (
    <Content>
      <Title>歡迎登入</Title>
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
      <Button onClick={onSubmit}>登入LIMO</Button>
      {showError && <ErrorText>{showError}</ErrorText>}
      <Seperator />
      <GoogleBtn onClick={() => handleGoogleLogin(imgUrl, setTrigger, history)}>
        <GoogleLogo src={googleLogo} alt="" />
        <GoogleText>以Google身份註冊和登入</GoogleText>
      </GoogleBtn>

      <ChangeBtn
        onClick={() => {
          setActiveItem('register');
          setEmail('');
          setPassword('');
          setShowError('');
        }}
      >
        想加入LIMO嗎？快來註冊!
      </ChangeBtn>
    </Content>
  );
}
