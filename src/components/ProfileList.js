import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { firestore } from '../utils/firebase';
import { useState } from 'react';
import DeleteAlert from '../components/DeleteAlert';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -2.5vmin;
  top: -1.2vmin;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.3);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
`;

const ListDiv = styled.div`
  position: relative;
  cursor: pointer;
  width: 30vmin;
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
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 0px;
  z-index: -1;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  object-fit: contain;
  @media (max-width: 1280px) {
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 50px;
  z-index: 0;
  object-fit: contain;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 100px;
  z-index: 1;
  object-fit: contain;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;

const ListTitle = styled.div`
  font-size: 2vmin;
  margin-top: 23vmin;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ProfileList({ title, posters, listId, isUser }) {
  const [removeListAlert, setRemoveListAlert] = useState(false);

  const handleDeleteList = () => {
    firestore
      .collection('Lists')
      .doc(listId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <>
      <ListDiv>
        <MyLink to={`/list/${listId}`}>
          {posters !== undefined && (
            <ThemeList>
              <ListCh1
                src={
                  posters[2] ||
                  'https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2FlistDefault.png?alt=media&token=a8568e96-73d5-434e-a72b-15cdad41e53e'
                }
                alt=""
              ></ListCh1>

              <ListCh2
                src={
                  posters[1] ||
                  'https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2FlistDefault.png?alt=media&token=a8568e96-73d5-434e-a72b-15cdad41e53e'
                }
                alt=""
              ></ListCh2>

              <ListCh3
                src={
                  posters[0] ||
                  'https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2FlistDefault.png?alt=media&token=a8568e96-73d5-434e-a72b-15cdad41e53e'
                }
                alt=""
              ></ListCh3>
            </ThemeList>
          )}
          <ListTitle>{title}</ListTitle>
        </MyLink>
        {isUser ? (
          <Close onClick={() => setRemoveListAlert(true)}>
            <CancelIcon />
          </Close>
        ) : (
          ''
        )}
      </ListDiv>
      <DeleteAlert
        trigger={removeListAlert}
        setTrigger={setRemoveListAlert}
        message={'確認要刪除此片單嗎？'}
        remove={handleDeleteList}
      />
    </>
  );
}
