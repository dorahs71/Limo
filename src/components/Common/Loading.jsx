import styled from 'styled-components';
import loading from '../../images/loading.gif';

export default function Loading() {
  return (
    <LoadingDiv>
      <LoadingImg src={loading} alt="" />
    </LoadingDiv>
  );
}

const LoadingImg = styled.img`
  width: 10vmin;
  height: 10vmin;
`;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
