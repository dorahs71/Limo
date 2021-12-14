import styled from 'styled-components';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { RemoveListMovieAlert } from '../Common/DeleteAlert';
import { useState } from 'react';

export default function ListBox({ isAuthor, movieId, poster, listId, title }) {
  const [removeMovieAlert, setRemoveMovieAlert] = useState(false);

  return (
    <Box>
      {isAuthor && (
        <DeleteDiv onClick={() => setRemoveMovieAlert(true)}>
          <DeleteIcon />
        </DeleteDiv>
      )}
      <MyLink to={`/movie/${movieId}`}>
        <Poster src={poster} alt="" />
        <Overlay>
          <MovieTitle>{title}</MovieTitle>
        </Overlay>
      </MyLink>
      <RemoveListMovieAlert
        trigger={removeMovieAlert}
        setTrigger={setRemoveMovieAlert}
        message={'確認要移除此電影嗎？'}
        listId={listId}
        movieId={movieId}
        poster={poster}
      />
    </Box>
  );
}

const DeleteDiv = styled.div`
  width: 2vw;
  height: 2vw;
  position: absolute;
  display: none;
  z-index: 12;
  cursor: pointer;
  bottom: 3vw;
  @media (max-width: 600px) {
    width: 5vw;
    height: 5vw;
    bottom: 5vw;
  }
`;

const DeleteIcon = styled(DeleteOutline)`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  color: #333;
  z-index: 20;
  &:hover {
    background: #edabab;
    color: #fff;
  }
  transform: scale(1.5);
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:hover ${DeleteDiv} {
    display: flex;
  }
`;

const Poster = styled.img`
  width: 14vw;
  height: 20vw;
  object-fit: cover;

  @media (max-width: 1024px) {
    height: 22vw;
  }

  @media (max-width: 768px) {
    width: 20vw;
    height: 29vw;
  }

  @media (max-width: 600px) {
    width: 25vw;
    height: 35vw;
  }
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  > * {
    transform: translateY(2vmin);
    transition: transform 0.4s;
  }
  &:hover > * {
    transform: translateY(0);
  }
`;

const MovieTitle = styled.div`
  width: 70%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
