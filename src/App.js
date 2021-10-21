import { Nav, Footer } from './components/Nav';
import Index from './pages/Index';
import { useState } from 'react';
import styled from 'styled-components';

const NavDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  color: #fff;
  z-index: 100;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(
      130deg,
      transparent,
      #75e799 20.07%,
      #f8ff00 50.07%,
      #319197 76.05%,
      transparent
    );
  }
`;

const StartNav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  color: #fff;
  z-index: 100;
  background: linear-gradient(to top, transparent 0%, rgb(0, 0, 0, 0.3) 50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      {isScrolled ? (
        <NavDiv>
          <Nav />
        </NavDiv>
      ) : (
        <StartNav>
          <Nav />
        </StartNav>
      )}
      <Index />
      <Footer />
    </>
  );
}
