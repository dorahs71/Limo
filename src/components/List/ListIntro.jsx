import styled from 'styled-components';
import { Save, Edit } from '@material-ui/icons';
import { useState } from 'react';
import { updateListIntro, updateListTitle } from '../../utils/firebase';

export default function ListIntro({
  isAuthor,
  updateList,
  updateTitle,
  setUpdateTitle,
  listId,
}) {
  const [updateIntro, setUpdateIntro] = useState('');
  const [edit, setEdit] = useState(false);

  const handleKeyDown = (e) => {
    e.target.style.height = '16vmin';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleUpdateListIntro = () => {
    setEdit(false);
    updateListIntro(listId, updateIntro);
  };

  return (
    <ListIntroDiv>
      <EditTitle>
        <ListTitle
          isAuthor={isAuthor}
          placeholder="請寫下片單名稱..."
          defaultValue={updateTitle}
          readOnly={isAuthor ? false : true}
          onChange={(e) => {
            setUpdateTitle(e.target.value);
          }}
        />

        {isAuthor && (
          <TitleSaveDiv onClick={updateListTitle(listId, updateTitle)}>
            <SaveIcon />
          </TitleSaveDiv>
        )}
        <CollectNum>共 {updateList?.collect?.length || 0} 人收藏</CollectNum>
      </EditTitle>
      <EditIntro>
        {isAuthor && edit ? (
          <EditListIntro
            isAuthor={isAuthor}
            placeholder="這個片單是關於..."
            defaultValue={updateList.listIntro}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => {
              setUpdateIntro(e.target.value);
            }}
          />
        ) : (
          <ReadIntro>{updateList.listIntro}</ReadIntro>
        )}
        {isAuthor && edit && (
          <IntroSaveDiv onClick={handleUpdateListIntro}>
            <SaveIcon />
          </IntroSaveDiv>
        )}
        {isAuthor && !edit && (
          <IntroSaveDiv onClick={() => setEdit(true)}>
            <EditIcon />
          </IntroSaveDiv>
        )}
      </EditIntro>
    </ListIntroDiv>
  );
}

const ListIntroDiv = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin-left: 8vmin;
  @media (max-width: 1280px) {
  }
`;

const SaveIcon = styled(Save)`
  transform: scale(1.5);
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const EditIcon = styled(Edit)`
  transform: scale(1.5);
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const TitleSaveDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  align-self: flex-end;
  margin-top: -5%;
  color: #898f86;
  cursor: pointer;
  display: none;
`;

const EditTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover ${TitleSaveDiv} {
    display: block;
  }
`;

const ListTitle = styled.input`
  background: transparent;
  color: #fff;
  max-width: 100%;
  border: 0;
  cursor: ${(props) => (props.isAuthor ? 'text' : 'default')};
  border-bottom: 8px solid #61d498;
  text-align: center;
  font-size: 5vmin;
  font-weight: 700;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
  }
`;

const EditListIntro = styled.textarea`
  margin-top: 4vmin;
  padding-top: 2vmin;
  background: transparent;
  width: 100%;
  color: #fff;
  min-height: 16vmin;
  white-space: pre-wrap;
  text-align: center;
  border-radius: 5px;
  font-size: 2.8vmin;
  border: 2px #222 solid;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
    border: 1px solid rgba(127, 255, 212, 0.7);
  }
`;

const ReadIntro = styled.div`
  font-size: 2.5vmin;
  margin-top: 4vmin;
  padding-top: 2vmin;
  background: transparent;
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  color: #fff;
  min-height: 16vmin;
`;

const IntroSaveDiv = styled.div`
  width: 4vmin;
  height: 4vmin;
  margin-left: 2vmin;
  cursor: pointer;
  color: #2b2929;
`;

const EditIntro = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  align-items: flex-end;
  justify-content: center;
  &:hover ${IntroSaveDiv} {
    color: #898f86;
  }
`;

const CollectNum = styled.div`
  font-size: 2.3vmin;
  margin-top: 1vmin;
  color: #898f86;
`;
