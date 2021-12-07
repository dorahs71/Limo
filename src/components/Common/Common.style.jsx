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
  margin-top: 5vw;
  font-size: 2rem;
  font-weight: 700;
  width: 7vw;
  text-align: center;
  border-bottom: 8px solid #61d498;
  @media screen and (max-width: 1560px) {
    width: 9vw;
  }
  @media screen and (max-width: 1280px) {
    width: 11vw;
  }
  @media screen and (max-width: 1024px) {
    width: 13vw;
  }
  @media screen and (max-width: 768px) {
    border-bottom: 4px solid #61d498;
    width: 18vw;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
    width: 22vw;
  }
`;

export const FunctionBtn = styled.div`
  padding: 1vw 1vw;
  margin-top: -3vw;
  width: 8vw;
  height: 1vw;
  line-height: 1vw;
  font-weight: 450;
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
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1280px) {
    width: 9vw;
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    width: 11vw;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    width: 13vw;
    flex-direction: column;
    padding: 1vh 1vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
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
  height: 15vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SpaceImg = styled.img`
  width: 7vw;
  height: 8vw;
  object-fit: contain;
  @media screen and (max-width: 600px) {
    width: 10vw;
    height: 12vw;
  }
`;

export const SpaceWord = styled.div`
  margin-top: 3vmin;
  font-size: 1.5rem;

  @media screen and (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 0.5rem;
  }
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

  @media (max-width: 1024px) {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    transform: scale(1);
  }
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
  width: 15vw;
  height: 22vw;
  margin: 0 auto;
  background: #cad2c6;
  @media (max-width: 1560px) {
    width: 18vw;
    height: 25vw;
  }
  @media (max-width: 1280px) {
    width: 20vw;
    height: 30vw;
  }
  @media (max-width: 1024px) {
    width: 25vw;
    height: 35vw;
  }
  @media (max-width: 768px) {
    width: 30vw;
    height: 40vw;
  }
  @media (max-width: 600px) {
    width: 40vw;
    height: 50vw;
  }
  @media (max-width: 375px) {
    width: 45vw;
    height: 55vw;
  }
`;

export const AlertWord = styled.div`
  font-size: 1.5rem;
  color: #333;
  font-weight: 400;
  text-align: center;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const AlertImg = styled.img`
  width: 15vmin;
  height: 15vmin;
`;

export const BtnDiv = styled.div`
  display: flex;
  width: 80%;
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
