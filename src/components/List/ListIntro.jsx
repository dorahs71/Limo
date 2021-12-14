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
  @media (max-width: 600px) {
    margin-left: 3vw;
  }
`;

const SaveIcon = styled(Save)`
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  transform: scale(1.5);
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const EditIcon = styled(Edit)`
  cursor: pointer;
  &:hover {
    color: #99cfff;
  }
  transform: scale(1.5);
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 1024px) {
    transform: scale(1);
  }
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const TitleSaveDiv = styled.div`
  width: 3vw;
  height: 3vw;
  align-self: flex-end;
  margin-top: -3%;
  color: #898f86;
  cursor: pointer;
  visibility: hidden;
`;

const EditTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover ${TitleSaveDiv} {
    visibility: visible;
  }
`;

const ListTitle = styled.input`
  background: transparent;
  color: #fff;
  max-width: 100%;
  border: 0;
  cursor: ${(props) => (props.isAuthor ? 'text' : 'default')};
  border-bottom: 4px solid #61d498;
  text-align: center;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
  }
  font-weight: 600;
  font-size: 2rem;
  @media (max-width: 1440px) {
    font-size: 1.8rem;
  }
  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const EditListIntro = styled.textarea`
  margin-top: 2vw;
  padding-top: 1vw;
  background: transparent;
  width: 100%;
  color: #fff;
  min-height: 16vmin;
  white-space: pre-wrap;
  text-align: center;
  border-radius: 5px;
  border: 2px #222 solid;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
    border: 1px solid rgba(127, 255, 212, 0.7);
  }
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const ReadIntro = styled.div`
  margin-top: 3vw;
  padding-top: 1vw;
  background: transparent;
  width: 100%;
  text-align: center;
  white-space: pre-wrap;
  color: #fff;
  min-height: 16vh;
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

const IntroSaveDiv = styled.div`
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
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
  margin-top: 1vmin;
  color: #898f86;
  font-size: 1.2rem;
  @media (max-width: 1440px) {
    font-size: 1rem;
  }

  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;
