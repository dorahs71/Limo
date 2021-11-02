import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useParams, Link } from 'react-router-dom';
import firebase from '../utils/firebase';
import { Cancel } from '@material-ui/icons';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -30px;
  top: -7vmin;
  z-index: 300;
  @media (max-width: 1280px) {
    right: 6vmin;
    top: -2vmin;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const FollowDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover ${Close} {
    display: block;
  }
`;

const FollowImg = styled.img`
  width: 16vmin;
  height: 12vmin;
`;

const FollowName = styled.div`
  font-size: 20px;
  text-align: center;
  &:hover {
    color: #7fffd4;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ProfileFollow({ followId }) {
  const [getfollowData, setGetFollowData] = useState('');
  const currentUserId = auth.currentUser?.uid;
  const { userId } = useParams();

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(followId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (isMounted) setGetFollowData(data);
      });
    return () => {
      isMounted = false;
    };
  }, [followId]);

  const handleDeleteFollow = () => {
    firestore
      .collection('Users')
      .doc(currentUserId)
      .update({
        follow: firebase.firestore.FieldValue.arrayRemove(followId),
      });
  };

  return (
    <FollowDiv>
      <MyLink to={`/profile/${followId}`}>
        <FollowImg src={getfollowData.profileImg} />
        <FollowName>{getfollowData.userName}</FollowName>
      </MyLink>
      {currentUserId === userId && (
        <Close onClick={handleDeleteFollow}>
          <CancelIcon />
        </Close>
      )}
    </FollowDiv>
  );
}
