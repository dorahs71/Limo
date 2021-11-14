import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  background-color: rgba(22, 22, 22, 0.6);
  z-index: 100;
`;

const CardImg = styled.img`
  width: 50%;
  height: 70%;
  background: #333;
  top: 30vmin;
  border-radius: 20px;
  box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px;
  /* margin: 10vmin 25vmin;
  @media (max-width: 1280px) {
    width: 100vmin;
    height: 80vmin;
    top: 10vmin;
    margin: 10vmin 40vmin;
  } */
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: 25vmin;
  top: 10vmin;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  border-radius: 50%;
`;

export default function CardPopup({ trigger, setTrigger, cardImg }) {
  return trigger ? (
    <PopupDiv>
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
