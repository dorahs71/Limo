import styled from 'styled-components';

export const InputDiv = styled.div`
  margin-top: 1.5vw;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1560px) {
    margin-top: 2vw;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    margin-top: 2.5vw;
    font-size: 0.8rem;
  }
`;

export const InputName = styled.div`
  display: inline-block;
`;

export const Input = styled.input`
  font-size: 1.5rem;
  width: 23vw;
  height: 3vw;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff;
  &:focus {
    outline: none;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    width: 28vw;
    height: 4vw;
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    width: 30vw;
    height: 6vw;
  }
`;

export const Button = styled.div`
  margin-top: 3vw;
  height: 3vw;
  line-height: 3vw;
  padding: 5px 5px;
  border-radius: 5px;
  background: transparent;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
  background: #62d498;
  color: #333;
  &:hover {
    background: #8aefba;
    color: #fff;
  }

  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    margin-top: 3.5vw;
    font-size: 0.8rem;
  }
`;

export const GoogleBtn = styled.div`
  margin-top: 3vw;
  background: #fff;
  width: 95%;
  height: 4vw;
  padding: 5px 5px;
  font-size: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  color: #333;
  line-height: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    margin-top: 4vw;
    font-size: 0.8rem;
  }
  @media (max-width: 375px) {
    width: 100%;
  }
`;

export const GoogleText = styled.div`
  display: block;
`;

export const GoogleLogo = styled.img`
  display: block;
  margin-top: -0.5vw;
  width: 2.5vw;
  height: 2.5vw;
  @media (max-width: 768px) {
    width: 3vw;
    height: 3vw;
  }
  @media (max-width: 600px) {
    width: 3.5vw;
    height: 3.5vw;
  }
  @media (max-width: 375px) {
    width: 4.5vw;
    height: 4.5vw;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  width: 10vw;
  border-bottom: 8px solid #75e799;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
    border-bottom: 4px solid #75e799;
  }
  @media (max-width: 600px) {
    width: 17vw;
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    width: 18vw;
  }
`;

export const Content = styled.div`
  padding: 20px 20px;
  z-index: 3;
`;

export const Seperator = styled.hr`
  margin-top: 2vw;
  border: 0;
  height: 2px;
  overflow: visible;
  padding: 0;
  text-align: center;
  background-image: linear-gradient(
    to right,
    transparent,
    #75e799,
    transparent
  );
  &:after {
    content: 'OR';
    display: inline-block;
    position: relative;
    top: -1vw;
    font-size: 1.5rem;
    padding: 0 0.3em;
    background: transparent;
    text-shadow: 2px 2px #778899;
  }

  @media (max-width: 1024px) {
    margin-top: 4vw;
    &:after {
      font-size: 1.2rem;
    }
  }
  @media (max-width: 768px) {
    &:after {
      font-size: 1rem;
    }
  }
  @media (max-width: 600px) {
    &:after {
      font-size: 0.8rem;
    }
  }
`;

export const ChangeBtn = styled.div`
  border: 3px solid #75e799;
  padding: 5px 5px;
  border-radius: 40px;
  text-align: center;
  margin-top: 3vw;
  font-weight: 500;
  color: #75e799;
  font-size: 1.5rem;
  cursor: pointer;
  :hover {
    background: #75e799;
    color: #fff;
  }
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    margin-top: 4vw;
    font-size: 0.7rem;
  }
`;

export const ErrorText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  color: #dc143c;
  @media (max-width: 1024px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;
