import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Cancel, AddCircle } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';
import WarningAlert from './WarningAlert';
import AOS from 'aos';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const AddToListDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  width: 70vmin;
  min-height: 55vmin;
  padding: 20px 20px;
  position: relative;
  top: 12vmin;
  margin: 0 auto;
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

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  border-radius: 50%;
`;

const AddBtn = styled(AddCircle)`
  transform: scale(1.6);
  margin-left: 3vmin;
  cursor: pointer;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    transform: scale(1.4);
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
  font-size: 2.8vmin;
  width: 80%;
  height: 3vmin;
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
  @media (max-width: 1280px) {
    width: 50vmin;
  }
`;

const Title = styled.div`
  font-size: 4vmin;
  font-weight: 800;
  color: #fff;
  width: 16vmin;
  border-bottom: 4px solid #75e799;
  align-self: center;
  text-align: center;
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
  font-size: 3vmin;
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

export default function AddToList({
  trigger,
  setTrigger,
  movie,
  listName,
  setAddListAlert,
}) {
  const [newList, setNewList] = useState('');
  const [selectListId, setSelectListId] = useState('');
  const [selectListData, setSelectListData] = useState('');
  const [listNameAlert, setListNameAlert] = useState(false);
  const [listSelectAlert, setListSelectAlert] = useState(false);
  const [ownListAlert, setOwnListAlert] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const addList = () => {
    const uid = auth.currentUser.uid;

    if (newList) {
      const docRef = firestore.collection('Lists').doc();
      docRef
        .set({
          authorId: uid,
          listId: docRef.id,
          listTitle: newList,
          date: new Date(),
          listShare: false,
          collect: [],
        })
        .then(setNewList(''));
    } else {
      setListNameAlert(true);
    }
  };

  const checkListData = (id) => {
    setSelectListId(id);
    firestore
      .collection('Lists')
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        return data;
      })
      .then((data) => {
        if (data.listPosters) {
          firestore
            .collection('Lists')
            .doc(id)
            .collection('ListData')
            .get()
            .then((collectionSnapshot) => {
              const data = collectionSnapshot.docs.map((doc) => {
                return doc.data();
              });
              setSelectListData(data);
            });
        } else {
          setSelectListData('');
        }
      });
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
      firestore
        .collection('Lists')
        .doc(selectListId)
        .update({
          listPosters: firebase.firestore.FieldValue.arrayUnion(movie.poster),
        });

      firestore
        .collection('Movies')
        .doc(movieId)
        .update({
          list: firebase.firestore.FieldValue.arrayUnion(selectListId),
        });

      firestore
        .collection('Lists')
        .doc(selectListId)
        .collection('ListData')
        .doc(movieId)
        .set({
          movieId,
          poster: movie.poster,
          chTitle: movie.chTitle,
          date: new Date(),
        });

      setSelectListId('');
      setTrigger(false);
      setAddListAlert(true);
    }
  };

  return trigger ? (
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
  ) : (
    ''
  );
}
