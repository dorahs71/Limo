import { Nav, Footer } from './components/Nav/Nav';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';
import Movie from './pages/Movie';
import Profile from './pages/Profile';
import Diary from './pages/Diary';
import List from './pages/List';
import Search from './pages/Search';
import ScrollToTop from './components/Common/ScrollToTop';
import NotFound from './pages/NotFound';
import { getAllUsers } from './utils/firebase';
import { useDispatch } from 'react-redux';

const MainDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4vw;
  color: #fff;
  z-index: 1000;
  background: #1b1919;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 4px 5px -1px rgba(27, 25, 25, 0.56);
  @media (max-width: 768px) {
    height: 5vw;
  }
  @media (max-width: 600px) {
    height: 10vw;
  }
`;

const StartNav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 4vw;
  color: #fff;
  z-index: 1000;
  background: linear-gradient(to top, transparent 0%, rgb(34, 32, 32, 0.3) 50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    height: 5vw;
  }
  @media (max-width: 600px) {
    height: 10vw;
  }
`;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    getAllUsers(dispatch);
  }, []);

  return (
    <MainDiv>
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
          <Route path="/profile/:userId/:active" exact>
            <Profile />
          </Route>
          <Route path="/search/:keyword">
            <Search />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </MainDiv>
  );
}
