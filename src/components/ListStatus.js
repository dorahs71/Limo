import { firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Label = styled.label`
  display: inline-block;
  position: relative;
  margin: 0px 1vmin 0 1vmin;
  width: 6vmin;
  height: 3vmin;
  cursor: pointer;
`;

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #333;
  transition: 0.4s;
  border-radius: 10vmin;
  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 3vmin;
    width: 3vmin;
    background: #fff;
    transition: 0.4s;
  }
`;

const Toggle = styled.input`
  display: none;
  &:checked + ${Slider} {
    background: #00cca3;
    &:before {
      transform: translateX(3vmin);
    }
  }
`;

export default function ListStatus({
  status,
  listId,
  authorId,

  reduceCoin,
  listTitle,
  showCoin,
}) {
  const [listStatus, setListStatus] = useState(status);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    setListStatus(status);
  }, [status]);

  const toggleStatus = () => {
    if (listStatus) {
      setListStatus(false);
      firestore.collection('Lists').doc(listId).update({
        listShare: false,
      });
      firestore
        .collection('Users')
        .doc(authorId)
        .update({
          coin: firebase.firestore.FieldValue.increment(-300),
        });

      reduceCoin(true);
    } else {
      setListStatus(true);
      firestore.collection('Lists').doc(listId).update({
        listShare: true,
      });

      if (currentUser.followBy !== undefined) {
        currentUser.followBy.map((item) => {
          firestore
            .collection('Users')
            .doc(item)
            .collection('Notifications')
            .doc()
            .set({
              authorId,
              listId,
              authorName: currentUser.userName,
              authorImg: currentUser.profileImg,
              read: false,
              listTitle,
              type: 'list',
              date: new Date(),
            });
          return item;
        });

        firestore
          .collection('Users')
          .doc(authorId)
          .update({
            coin: firebase.firestore.FieldValue.increment(300),
          });

        showCoin(true);
      }
    }
  };

  return (
    <Label>
      <Toggle
        type="checkbox"
        checked={listStatus}
        onChange={toggleStatus}
      ></Toggle>
      <Slider />
    </Label>
  );
}
