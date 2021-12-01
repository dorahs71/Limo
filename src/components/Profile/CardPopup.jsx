import styled from 'styled-components';
import { PopupDiv, CancelIcon } from '../Common/Common.style';

const CardImg = styled.img`
  width: 50%;
  height: 70%;
  background: #333;
  top: 30vmin;
  border-radius: 20px;
  box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px;
  @media (max-width: 1024px) {
    width: 90%;
    height: 50%;
  }
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
  @media (max-width: 1024px) {
    right: 6vmin;
    top: 23vmin;
  }
  @media (max-width: 1024px) {
    right: 6vmin;
    top: 28vmin;
  }
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
