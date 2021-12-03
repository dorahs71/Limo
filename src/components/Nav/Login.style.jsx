import styled from 'styled-components';

export const InputDiv = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1280px) {
    margin-top: 20px;
  }
`;

export const InputName = styled.div`
  display: inline-block;
`;

export const Input = styled.input`
  font-size: 2.5vmin;
  width: 36vmin;
  height: 5vmin;
  margin-left: 2vmin;
  background: transparent;
  border-radius: 5px;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

export const Button = styled.div`
  margin-top: 3vw;
  height: 3rem;
  padding: 5px 5px;
  border-radius: 5px;
  background: transparent;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;
  font-size: 2vw;
  text-align: center;
  line-height: 3rem;
  font-weight: 400;
  background: #62d498;
  color: #333;
  &:hover {
    background: #8aefba;
    color: #fff;
  }
  @media (max-width: 1280px) {
    height: 2rem;
    line-height: 2rem;
  }
`;

export const GoogleBtn = styled.div`
  margin-top: 3vw;
  background: #fff;
  width: 95%;
  height: 4vmin;
  padding: 5px 5px;
  font-size: 2.5vmin;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  color: #333;
  line-height: 4vmin;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  width: 4.5vmin;
  height: 4.5vmin;
  margin-left: 2vw;
`;

export const Title = styled.div`
  font-size: 4vmin;
  font-weight: 800;
  color: #fff;
  width: 16vmin;
  border-bottom: 4px solid #75e799;
  margin: 0 auto;
  text-align: center;
`;

export const Content = styled.div`
  padding: 20px 20px;
  flex-direction: column;
  z-index: 3;
`;

export const Seperator = styled.hr`
  margin-top: 80px;
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
    top: -0.85em;
    font-size: 18px;
    padding: 0 0.3em;
    background: transparent;
    text-shadow: 2px 2px #778899;
  }
  @media (max-width: 1280px) {
    margin-top: 40px;
  }
`;

export const ChangeBtn = styled.div`
  border: 3px solid #75e799;
  padding: 5px 5px;
  border-radius: 40px;
  text-align: center;
  margin-top: 8vmin;
  font-weight: 500;
  color: #75e799;
  font-size: 2vmin;
  cursor: pointer;
  :hover {
    background: #75e799;
    color: #fff;
  }
`;

export const ErrorText = styled.p`
  text-align: center;
  width: 100%;
  font-size: 16px;
  color: #dc143c;
`;
