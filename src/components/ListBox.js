import styled from 'styled-components';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ListDeleteAlert from '../components/ListDeleteAlert';
import { useState, useEffect } from 'react';

const DeleteDiv = styled.div`
  height: 3vmin;
  position: absolute;
  display: none;
  width: 3vmin;
  z-index: 12;
  cursor: pointer;
  bottom: 5vmin;
`;

const DeleteIcon = styled(DeleteOutline)`
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: scale(1.5);
  color: #333;
  z-index: 20;
  &:hover {
    background: #edabab;
    color: #fff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 25vmin;
  height: 35vmin;
  position: relative;
  cursor: pointer;
  &:hover ${DeleteDiv} {
    display: flex;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
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
  font-size: 2.8vmin;
  font-weight: 500;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ListBox({ isAuthor, movieId, poster, listId, title }) {
  const [removeMovieAlert, setRemoveMovieAlert] = useState(false);

  return (
    <Box>
      {isAuthor ? (
        <DeleteDiv onClick={() => setRemoveMovieAlert(true)}>
          <DeleteIcon />
        </DeleteDiv>
      ) : (
        ''
      )}
      <MyLink to={`/movie/${movieId}`}>
        <Poster src={poster} alt="" />
        <Overlay>
          <MovieTitle>{title}</MovieTitle>
        </Overlay>
      </MyLink>
      <ListDeleteAlert
        movieId={movieId}
        poster={poster}
        trigger={removeMovieAlert}
        setTrigger={setRemoveMovieAlert}
        message={'確認要移除此電影嗎？'}
        listId={listId}
      />
    </Box>
  );
}
