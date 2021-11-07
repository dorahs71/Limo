import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const CardImg = styled.img`
  width: 60vmin;
  height: 55vmin;
  background: #333;
  top: 250px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    width: 100vmin;
    height: 80vmin;
    top: 10vmin;
    margin: 10vmin 40vmin;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: 5vmin;
  top: 5vmin;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

export default function CardPopup({ trigger, setTrigger, cardImg }) {
  return trigger ? (
    <PopupDiv>
      {console.log(cardImg)}
      <Close
        onClick={() => {
          setTrigger(false);
        }}
      >
        <CancelIcon />
      </Close>
      <CardImg src={cardImg} alt="" />
    </PopupDiv>
  ) : (
    ''
  );
}
