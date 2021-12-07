import { auth } from '../../utils/firebase';
import { useState } from 'react';
import { RemoveArrayDataAlert } from '../Common/DeleteAlert';
import ThemeList from './ThemeList';
import { ListDiv, MyLink, ListTitle, Close, CancelIcon } from './List.style';
import { handleDeleteCollect } from '../../utils/firebase';

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
