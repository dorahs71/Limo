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
  right: -3vmin;
  top: -2vmin;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.1);
  border-radius: 50%;
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
  @media (max-width: 1280px) {
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 50px;
  z-index: 0;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 100px;
  z-index: 1;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;

const ListTitle = styled.div`
  font-size: 2.5vmin;
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
          <ThemeList>
            {posters !== undefined && (
              <ListCh1 src={posters[2]} alt=""></ListCh1>
            )}
            {posters !== undefined && (
              <ListCh2 src={posters[1]} alt=""></ListCh2>
            )}
            {posters !== undefined && (
              <ListCh3 src={posters[0]} alt=""></ListCh3>
            )}
          </ThemeList>
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
