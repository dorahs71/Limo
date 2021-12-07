import { useState } from 'react';
import { RemoveDocAlert } from '../Common/DeleteAlert';
import ThemeList from './ThemeList';
import { removeList } from '../../utils/firebase';
import { ListDiv, MyLink, ListTitle, Close, CancelIcon } from './List.style';

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
