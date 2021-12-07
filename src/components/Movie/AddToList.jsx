import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { AddCircle } from '@material-ui/icons';
import {
  addListName,
  checkListName,
  addListPoster,
  addMovieListArr,
  addMovieListData,
} from '../../utils/firebase';
import WarningAlert from '../Common/WarningAlert';
import AOS from 'aos';
import { PopupDiv, CancelIcon, Title } from '../Common/Common.style';

export default function AddToList({
  trigger,
  setTrigger,
  movie,
  listName,
  setAddListAlert,
  uid,
  movieId,
}) {
  const [newList, setNewList] = useState('');
  const [selectListId, setSelectListId] = useState('');
  const [selectListData, setSelectListData] = useState('');
  const [listNameAlert, setListNameAlert] = useState(false);
  const [listSelectAlert, setListSelectAlert] = useState(false);
  const [ownListAlert, setOwnListAlert] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const addList = () => {
    if (newList) {
      addListName(uid, newList, setNewList);
    } else {
      setListNameAlert(true);
    }
  };

  const checkListData = (id) => {
    setSelectListId(id);
    checkListName(id, setSelectListData);
  };

  const onSubmit = () => {
    const listData = [];
    if (selectListData !== '') {
      selectListData?.map((item) => {
        listData.push(item.movieId);
        return listData;
      });
    }

    if (selectListId === '') {
      setListSelectAlert(true);
    } else if (listData.includes(movieId)) {
      setOwnListAlert(true);
    } else {
      addListPoster(selectListId, movie);
      addMovieListArr(movieId, selectListId);

      addMovieListData(selectListId, movieId, movie);

      setSelectListId('');
      setTrigger(false);
      setAddListAlert(true);
    }
  };

  return (
    trigger && (
      <PopupDiv data-aos="zoom-in">
        <AddToListDiv>
          <Close
            onClick={() => {
              setTrigger(false);
              setSelectListId('');
            }}
          >
            <CancelIcon />
          </Close>
          <Title>加入片單</Title>

          <InputDiv>
            <Input
              label="加入片單"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
              placeholder=" 請輸入新片單名稱..."
            />
            <AddBtn onClick={addList} />
          </InputDiv>
          <ListSection>
            {listName !== '' &&
              listName?.map((item) => (
                <ListDiv
                  key={item.listTitle}
                  onClick={() => checkListData(item.listId)}
                  select={selectListId === item.listId}
                >
                  {item.listTitle}
                </ListDiv>
              ))}
          </ListSection>
          <SendBtn onClick={onSubmit}>確認加入</SendBtn>
        </AddToListDiv>
        <WarningAlert
          trigger={listNameAlert}
          setTrigger={setListNameAlert}
          message={'尚未填寫新片單名稱呦！'}
        />
        <WarningAlert
          trigger={listSelectAlert}
          setTrigger={setListSelectAlert}
          message={'尚未指定要加入的片單呦！'}
        />
        <WarningAlert
          trigger={ownListAlert}
          setTrigger={setOwnListAlert}
          message={'這部電影已加入此片單囉!'}
        />
      </PopupDiv>
    )
  );
}

const AddToListDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vmin;
  min-height: 55vmin;
  padding: 20px 20px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: 2vmin;
  top: -1vmin;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const AddBtn = styled(AddCircle)`
  margin-left: 3vmin;
  cursor: pointer;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  transform: scale(2);
  border-radius: 50%;
  @media (max-width: 1280px) {
    transform: scale(1.8);
  }
  @media (max-width: 1024px) {
    transform: scale(1.5);
  }
  @media (max-width: 768px) {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    transform: scale(1);
  }
`;

const InputDiv = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    font-size: 2.5vmin;
  }
`;

const Input = styled.textarea`
  font-size: 1.5rem;
  width: 80%;
  height: 3vw;
  margin-left: 2vmin;
  border-radius: 5px;
  resize: none;
  border: none;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  resize: none;
  padding: 10px;
  color: #fff;
  background: #444;
  &:focus {
    outline: none;
  }
  @media (max-width: 1024px) {
    height: 4vw;
  }
  @media (max-width: 768px) {
    height: 5vw;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const SendBtn = styled.div`
  text-align: center;
  padding: 1.5vmin;
  background: #c5cdc0;
  color: #333;
  border-radius: 5px;
  font-size: 2.5vmin;
  margin: 5vmin 0px;
  cursor: pointer;
  &:hover {
    background: #75e799;
  }
`;

const ListDiv = styled.div`
  font-size: 1.5rem;
  border-radius: 5px;
  margin-top: 2vmin;
  padding: 10px;
  width: 80%;
  border-bottom: 3px solid #444;
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.select ? '#fff' : '#777')};
  background: ${(props) => (props.select ? '#666' : '#444')};
  &:hover {
    color: #fff;
    background: #666;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ListSection = styled.div`
  width: 100%;
  min-height: 23vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-top: 2vmin;
`;
