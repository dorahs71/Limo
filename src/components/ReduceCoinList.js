import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';
import coin from '../images/limocoin.png';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const AddCoinDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  width: 60vmin;
  height: 55vmin;
  background: #333;
  border: 1px solid #75e799;
  padding: 20px 20px;
  position: relative;
  border-radius: 20px;
  top: 250px;
  margin: 0 0 0 30vmin;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 70vmin;
    height: 50vmin;
    top: 12vmin;
    font-size: 25px;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -1vmin;
  top: -1vmin;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const Title = styled.div`
  font-size: 25px;
`;

const CoinPart = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5vmin;
`;
const CoinNum = styled.div`
  font-size: 50px;
  margin-left: 2vmin;
  font-weight: 700;
  color: #b01030;
`;

const Coin = styled.img`
  width: 15vmin;
  height: 15vmin;
`;

export default function CoinComment({ trigger, setTrigger }) {
  return trigger ? (
    <PopupDiv>
      <AddCoinDiv>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        <Title>您將片單改設為私人，故收回原獎勵</Title>
        <CoinPart>
          <Coin src={coin} alt="" />
          <CoinNum>- 300</CoinNum>
        </CoinPart>
      </AddCoinDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
