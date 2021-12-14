import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';

export const ListShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3vw 0;
  padding: 5vmin 0;
  width: 100%;
  justify-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -0.5vw;
  top: -1.5vw;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    right: -1vw;
    top: -1vw;
  }
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 600px) {
    right: -3vw;
    top: -3vw;
  }
`;

export const CancelIcon = styled(Cancel)`
  transform: scale(1.3);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    transform: scale(0.8);
  }
`;

export const ListDiv = styled.div`
  position: relative;
  cursor: pointer;
  width: 15vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &:hover {
    color: #75e799;
  }

  &:hover ${Close} {
    display: block;
  }
  @media (max-width: 1560px) {
    width: 18vw;
  }
  @media (max-width: 1440px) {
    width: 20vw;
    font-size: 1.2rem;
  }

  @media (max-width: 1024px) {
    width: 28vw;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    width: 32vw;
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    width: 42vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

export const ListTitle = styled.div`
  margin-top: 13vw;
  font-size: 1.5rem;
  @media (max-width: 1560px) {
    margin-top: 16vw;
  }
  @media (max-width: 1440px) {
    margin-top: 18vw;
    font-size: 1.2rem;
  }
  @media (max-width: 1280px) {
    margin-top: 14vw;
  }

  @media (max-width: 1024px) {
    margin-top: 24vw;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

export const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
