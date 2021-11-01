import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Cancel, AddCircle } from '@material-ui/icons';
import { auth, firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';

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
  font-size: 25px;
  width: 60vmin;
  height: 55vmin;
  background: #333;
  border: 1px solid #75e799;
  padding: 20px 20px;
  position: relative;
  top: 250px;

  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 70vmin;
    height: 55vmin;
    top: 25vmin;
    font-size: 25px;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
`;

const AddBtn = styled(AddCircle)`
  transform: scale(1.6);
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const InputDiv = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    font-size: 18px;
  }
`;

const Input = styled.textarea`
  font-size: 25px;
  width: 80%;
  height: 3vmin;
  margin-left: 2vmin;
  border-radius: 5px;
  resize: none;
  border: none;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  color: #fff8dc;
  resize: none;
  padding: 10px;
  background: #444;
  &:focus {
    outline: none;
  }
  @media (max-width: 1280px) {
    width: 50vmin;
    font-size: 20px;
  }
`;

const Header = styled.div`
  width: 100%;
  font-size: 40px;
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  border-radius: 5px;
  text-shadow: 2px 2px #778899;
  background: linear-gradient(to top, #7fffd4, #90ee90, transparent);
  @media (max-width: 1280px) {
    font-size: 28px;
  }
`;

const SendBtn = styled.div`
  text-align: center;
  width: 50%;
  height: 5vmin;
  line-height: 5vmin;
  border: 4px solid #7fffd4;
  border-radius: 5px;
  font-size: 25px;
  margin-top: 4vmin;
  margin-bottom: 3vmin;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to left, #87cefa, #66cdaa);
    color: #191970;
  }
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const ListDiv = styled.div`
  /* background: #444;
  color: #777; */
  font-size: 23px;
  border-radius: 5px;
  margin-top: 2vmin;
  padding: 10px;
  width: 80%;
  border-bottom: 3px solid #444;
  cursor: pointer;
  text-align: center;
  color: ${(props) => (props.select ? '#fff8dc' : '#777')};
  background: ${(props) => (props.select ? '#666' : '#444')};
  &:hover {
    color: #fff8dc;
    background: #666;
  }
`;

const ListSection = styled.div`
  width: 100%;
  height: 22vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  margin-top: 2vmin;
`;

export default function AddToList({ trigger, setTrigger, movie }) {
  const [newList, setNewList] = useState('');
  const [showList, setShowList] = useState('');
  const [selectListId, setSelectListId] = useState('');

  const { movieId } = useParams();
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowList(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid]);

  const addList = () => {
    const docRef = firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc();
    docRef
      .set({
        authorId: uid,
        listId: docRef.id,
        listTitle: newList,
        date: new Date(),
        type: 'public',
      })
      .then(setNewList(''));
  };

  const onSubmit = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(selectListId)
      .update({
        listPosters: firebase.firestore.FieldValue.arrayUnion(movie.poster),
      });

    const docRef = firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(selectListId)
      .collection('ListData')
      .doc();
    docRef.set({
      listDataId: docRef.id,
      movieId,
      poster: movie.poster,
      chTitle: movie.chTitle,
      date: new Date(),
    });
    setTrigger(false);
  };

  return trigger ? (
    <PopupDiv>
      <AddToListDiv>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        <Header>加入片單</Header>

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
          {showList?.map((item) => (
            <ListDiv
              key={item.listTitle}
              onClick={() => setSelectListId(item.listId)}
              select={selectListId === item.listId}
            >
              {item.listTitle}
            </ListDiv>
          ))}
        </ListSection>
        <SendBtn onClick={onSubmit}>加入片單</SendBtn>
      </AddToListDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
