import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { auth } from '../../utils/firebase';
import { useState } from 'react';
import { RemoveArrayDataAlert } from '../Common/DeleteAlert';
import ThemeList from './ThemeList';
import { handleDeleteCollect } from '../../utils/firebase';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -2.5vmin;
  top: -0.8vmin;
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

const ListTitle = styled.div`
  font-size: 2vmin;
  margin-top: 23vmin;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ProfileCollect({ title, posters, listId, isUser }) {
  const [removeCollectAlert, setRemoveCollectAlert] = useState(false);
  const currentUserId = auth.currentUser.uid;

  return (
    <>
      <ListDiv>
        <MyLink to={`/list/${listId}`}>
          {posters !== undefined && <ThemeList posters={posters} />}
          <ListTitle>{title}</ListTitle>
        </MyLink>
        {isUser && (
          <Close onClick={() => setRemoveCollectAlert(true)}>
            <CancelIcon />
          </Close>
        )}
      </ListDiv>
      <RemoveArrayDataAlert
        trigger={removeCollectAlert}
        setTrigger={setRemoveCollectAlert}
        message={'確認取消收藏此片單嗎？'}
        remove={handleDeleteCollect}
        docId={listId}
        removeId={currentUserId}
      />
    </>
  );
}
