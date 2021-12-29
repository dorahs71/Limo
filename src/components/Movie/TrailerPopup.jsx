import styled from 'styled-components';
import { useEffect } from 'react';
import AOS from 'aos';
import { PopupDiv, CancelIcon } from '../Common/Common.style';

export default function TrailerPopup({ trigger, setTrigger, trailerKey }) {
  useEffect(() => {
    AOS.init({ duration: 400 });
    if (trigger) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [trigger]);

  return (
    trigger && (
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
    )
  );
}

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  padding: 5px 5px;
  right: -3vw;
  top: -2vw;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  @media screen and (max-width: 600px) {
    right: -5vw;
    top: -5vw;
  }
`;

const TrailerContainer = styled.div`
  width: 70vw;
  height: 40vw;
  position: relative;
  &:hover ${Close} {
    display: block;
  }
`;

const TrailerDiv = styled.iframe`
  width: 100%;
  height: 100%;
`;
