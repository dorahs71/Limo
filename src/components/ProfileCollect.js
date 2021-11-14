import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
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

export default function ProfileCollect({ title, posters, listId, isUser }) {
  const [removeCollectAlert, setRemoveCollectAlert] = useState(false);
  const handleDeleteCollect = () => {
    const currentUserId = auth.currentUser.uid;
    firestore
      .collection('Lists')
      .doc(listId)
      .update({
        collect: firebase.firestore.FieldValue.arrayRemove(currentUserId),
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
          <Close onClick={() => setRemoveCollectAlert(true)}>
            <CancelIcon />
          </Close>
        ) : (
          ''
        )}
      </ListDiv>
      <DeleteAlert
        trigger={removeCollectAlert}
        setTrigger={setRemoveCollectAlert}
        message={'確認取消收藏此片單嗎？'}
        remove={handleDeleteCollect}
      />
    </>
  );
}
