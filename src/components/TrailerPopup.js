import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import { useEffect } from 'react';
import AOS from 'aos';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;
const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const TrailerContainer = styled.div`
  width: 100vmin;
  height: 65vmin;
  position: relative;
  top: 15vmin;
  margin: 0 auto;
  &:hover ${Close} {
    display: block;
  }
`;

const TrailerDiv = styled.iframe`
  width: 100%;
  height: 100%;
  @media (max-width: 1280px) {
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  border-radius: 50%;
`;

export default function TrailerPopup({ trigger, setTrigger, trailerKey }) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return trigger ? (
    <PopupDiv data-aos="zoom-in">
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
