import styled from 'styled-components';
import notfound from '../images/404.gif';
import { useHistory } from 'react-router-dom';

const Word = styled.div`
  font-size: 5vmin;
  margin-bottom: 3vmin;
`;

const Img = styled.img`
  width: 30%;
  height: 30%;
`;

const FoundDiv = styled.div`
  display: flex;
  width: 80%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GoBack = styled.div`
  font-size: 2vmin;
  margin-top: 3vmin;
  text-align: center;
  width: 10vmin;
  height: 5vmin;
  line-height: 5vmin;
  cursor: pointer;
  border-radius: 10px;
  background: #62d498;
  &:hover {
    background: #8aefba;
  }
`;

export default function NotFound() {
  const history = useHistory();
  return (
    <FoundDiv>
      <Word>很抱歉，找不到這個網頁呦</Word>
      <Img src={notfound} alt="" />
      <GoBack
        onClick={() => {
          history.push('/');
        }}
      >
        回首頁
      </GoBack>
    </FoundDiv>
  );
}
