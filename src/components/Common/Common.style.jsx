import styled from 'styled-components';
import { Cancel } from '@material-ui/icons';

export const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3vmin;
  text-align: center;
  width: 100%;
  align-items: center;
`;

export const Title = styled.div`
  margin-top: 10vmin;
  font-size: 4.5vmin;
  font-weight: 700;
  width: 20vmin;
  border-bottom: 8px solid #61d498;
`;

export const FunctionBtn = styled.div`
  padding: 1.2vmin 1vmin;
  margin-top: -3vmin;
  width: 13vmin;
  height: 1vmin;
  font-weight: 450;
  font-size: 2.2vmin;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  background: #898f86;
  color: #fff;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
`;

export const FunctionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Function = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Space = styled.div`
  width: 100%;
  height: 20vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SpaceImg = styled.img`
  width: 12vmin;
  height: 11vmin;
  object-fit: contain;
  @media (max-width: 1280px) {
    width: 15vmin;
    height: 12vmin;
  }
`;

export const SpaceWord = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
`;

export const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(15, 14, 13, 0.85);
  z-index: 100;
`;

export const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  border-radius: 50%;
`;

export const AlertWindow = styled.div`
  display: flex;
  padding: 3vmin;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  box-shadow: rgb(0, 0, 0) 0px 20px 30px -10px;
  width: 30vmin;
  height: 40vmin;
  margin: 0 auto;
  background: #cad2c6;
`;

export const AlertWord = styled.div`
  font-size: 2.5vmin;
  color: #333;
  font-weight: 400;
  text-align: center;
`;

export const AlertImg = styled.img`
  width: 15vmin;
  height: 15vmin;
`;

export const BtnDiv = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-around;
`;

export const SendBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #75e799;
  }
`;

export const CancelBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #898f86;
  border: 1px solid #898f86;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #b1b8ac;
    color: #fff;
  }
`;
