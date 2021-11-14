import { Nav, Footer } from './components/Nav';
import { useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import Movie from './pages/Movie';
import Profile from './pages/Profile';
import Diary from './pages/Diary';
import List from './pages/List';
import Search from './pages/Search';
import ScrollToTop from './components/ScrollToTop';

const NavDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  color: #fff;
  z-index: 100;
  background: #1b1919;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 4px 5px -1px rgba(27, 25, 25, 0.56);
`;

const StartNav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 65px;
  color: #fff;
  z-index: 100;
  background: linear-gradient(to top, transparent 0%, rgb(34, 32, 32, 0.3) 50%);
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
    <BrowserRouter>
      {isScrolled ? (
        <NavDiv>
          <Nav />
        </NavDiv>
      ) : (
        <StartNav>
          <Nav />
        </StartNav>
      )}
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Index />
        </Route>
        <Route path="/movie/:movieId" exact>
          <Movie />
        </Route>
        <Route path="/diary/:diaryId" exact>
          <Diary />
        </Route>
        <Route path="/list/:listId" exact>
          <List />
        </Route>
        <Route path="/profile/:userId" exact>
          <Profile />
        </Route>
        <Route path="/search/:keyword">
          {/* <Route path="/search/:keyword"> */}
          <Search />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
