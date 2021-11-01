import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import { useParams } from 'react-router-dom';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const TrailerContainer = styled.div`
  width: 100vmin;
  height: 65vmin;
  position: relative;
  top: 20vmin;
  margin: 0 auto;
  /* @media (max-width: 1280px) {
    width: 70vmin;
    height: 55vmin;
    top: 25vmin;
  } */
`;

const TrailerDiv = styled.iframe`
  width: 100%;
  height: 100%;
  @media (max-width: 1280px) {
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

export default function TrailerPopup({ trigger, setTrigger, trailerKey }) {
  const { movieId } = useParams();

  return trigger ? (
    <PopupDiv>
      <TrailerContainer>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        <TrailerDiv
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="YouTube video player"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
        ></TrailerDiv>
      </TrailerContainer>
    </PopupDiv>
  ) : (
    ''
  );
}
