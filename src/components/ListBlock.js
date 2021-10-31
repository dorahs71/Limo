import styled from 'styled-components';
import { Save, Delete } from '@material-ui/icons';
import { useState } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useParams, Link } from 'react-router-dom';

const ListBlockDiv = styled.div`
  display: flex;
  height: 30vmin;
  border-radius: 5px;
  color: #fff;
  align-items: center;
  padding: 2vmin 3vmin 3vmin 2vmin;
  background: linear-gradient(#555, #000);
  margin-bottom: 4vmin;
`;

const MovieDiv = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  align-items: center;
  flex-grow: 3;
  text-align: center;
`;

const MoviePoster = styled.img`
  width: 15vmin;
  height: 20vmin;
`;

const MovieTitle = styled.div`
  margin-top: 2vmin;
  font-size: 25px;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const FunctionDiv = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 3vmin;
  display: block;
`;

const EditListContent = styled.div`
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  /* &:focus-within ${FunctionDiv} {
  display: block;
} */
`;

const ListContent = styled.textarea`
  font-size: 22px;
  height: auto;
  color: #fff8dc;
  background: transparent;
  resize: none;
  height: 20vmin;
  width: 95%;
  margin-left: 3vmin;
  border: #777 inset 2px;
  &:focus {
    outline: 0;
  }
  ::placeholder {
    color: #666;
  }
`;

const SaveNote = styled(Save)`
  transform: scale(1.2);
  cursor: pointer;
  &:hover {
    color: #00cca3;
  }
`;

const DeleteIcon = styled(Delete)`
  transform: scale(1.2);
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #f08080;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ListBlock({
  listDataId,
  movieId,
  chTitle,
  listNote,
  poster,
}) {
  const [updateNote, setUpdateNote] = useState('');
  const { listId } = useParams();
  const uid = auth.currentUser.uid;

  const handleUpdateListNote = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .collection('ListData')
      .doc(listDataId)
      .update({
        listNote: updateNote,
      });
  };

  const handleDeleteMovie = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .collection('ListData')
      .doc(listDataId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <ListBlockDiv>
      <MovieDiv>
        <MyLink to={`/movie/${movieId}`}>
          <MoviePoster src={poster} alt="" />
          <MovieTitle>{chTitle}</MovieTitle>
        </MyLink>
      </MovieDiv>

      <EditListContent>
        <ListContent
          placeholder="我想談談這部電影..."
          defaultValue={listNote || ''}
          onChange={(e) => {
            setUpdateNote(e.target.value);
          }}
        />
        <FunctionDiv>
          <SaveNote onClick={handleUpdateListNote} />
          <DeleteIcon onClick={handleDeleteMovie} />
        </FunctionDiv>
      </EditListContent>
    </ListBlockDiv>
  );
}
