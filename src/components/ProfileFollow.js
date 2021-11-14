import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useParams, Link } from 'react-router-dom';
import firebase from '../utils/firebase';
import { Cancel } from '@material-ui/icons';
import DeleteAlert from '../components/DeleteAlert';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: 4vmin;
  top: -3vmin;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.1);
  background: #333;
  border-radius: 50%;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const ImgWrapper = styled.div`
  width: 14vmin;
  height: 14.5vmin;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FollowDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover ${Close} {
    display: block;
  }
  &:hover ${ImgWrapper} {
    background: #75e799;
    border-radius: 50%;
  }
`;

const FollowImg = styled.img`
  width: 11vmin;
  height: 11vmin;
`;

const FollowName = styled.div`
  font-size: 2.5vmin;
  text-align: center;
  margin-top: 1vmin;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function ProfileFollow({ followId }) {
  const [removeFollowAlert, setRemoveFollowAlert] = useState(false);
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
    <>
      <FollowDiv>
        <MyLink to={`/profile/${followId}`}>
          <ImgWrapper>
            <FollowImg src={getfollowData.profileImg} />
          </ImgWrapper>
          <FollowName>{getfollowData.userName}</FollowName>
        </MyLink>
        {currentUserId === userId && (
          <Close onClick={() => setRemoveFollowAlert(true)}>
            <CancelIcon />
          </Close>
        )}
      </FollowDiv>
      <DeleteAlert
        trigger={removeFollowAlert}
        setTrigger={setRemoveFollowAlert}
        message={'確認取消追蹤嗎？'}
        remove={handleDeleteFollow}
      />
    </>
  );
}
