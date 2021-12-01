import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { useState } from 'react';
import { RemoveDocAlert } from '../Common/DeleteAlert';
import ThemeList from './ThemeList';
import { removeList } from '../../utils/firebase';

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

  return (
    <>
      <ListDiv>
        <MyLink to={`/list/${listId}`}>
          {posters !== undefined && <ThemeList posters={posters} />}
          <ListTitle>{title}</ListTitle>
        </MyLink>
        {isUser && (
          <Close onClick={() => setRemoveListAlert(true)}>
            <CancelIcon />
          </Close>
        )}
      </ListDiv>
      <RemoveDocAlert
        trigger={removeListAlert}
        setTrigger={setRemoveListAlert}
        message={'確認要刪除此片單嗎？'}
        docId={listId}
        remove={removeList}
      />
    </>
  );
}
