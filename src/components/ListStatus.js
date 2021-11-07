import { firestore } from '../utils/firebase';
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
  currentUserId,
  listTitle,
}) {
  const [listStatus, setListStatus] = useState(status);
  const currentUser = useSelector((state) => state.currentUser);
  const isFollow = currentUser?.follow.includes(authorId);

  useEffect(() => {
    setListStatus(status);
  }, [status]);

  const toggleStatus = () => {
    if (listStatus) {
      setListStatus(false);
      firestore.collection('Lists').doc(listId).update({
        listShare: false,
      });
    } else {
      setListStatus(true);
      firestore.collection('Lists').doc(listId).update({
        listShare: true,
      });
      if (isFollow) {
        console.log(isFollow);
        // firestore
        //   .collection('Users')
        //   .doc(currentUserId)
        //   .collection('Notifications')
        //   .set({
        //     authorId,
        //     listId,
        //     read: false,
        //     listTitle,
        //   });
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
