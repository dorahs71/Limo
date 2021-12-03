import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { auth } from '../../utils/firebase';
import { useParams, Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { RemoveArrayDataAlert } from '../Common/DeleteAlert';
import { getPrimaryDocData, handleDeleteFollow } from '../../utils/firebase';

export default function ProfileFollow({ followId }) {
  const [removeFollowAlert, setRemoveFollowAlert] = useState(false);
  const [getfollowData, setGetFollowData] = useState('');
  const currentUserId = auth.currentUser?.uid;
  const { userId } = useParams();

  useEffect(() => {
    const unsubscribe = getPrimaryDocData('Users', followId, setGetFollowData);
    return () => {
      unsubscribe();
    };
  }, [followId]);

  return (
    <>
      <FollowDiv>
        <MyLink to={`/profile/${followId}/list`}>
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
      <RemoveArrayDataAlert
        trigger={removeFollowAlert}
        setTrigger={setRemoveFollowAlert}
        message={'確認取消追蹤嗎？'}
        remove={handleDeleteFollow}
        docId={currentUserId}
        removeId={followId}
      />
    </>
  );
}

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: 5px;
  top: -3px;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.3);
  background: #333;
  border-radius: 50%;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
`;

const ImgWrapper = styled.div`
  width: 12vmin;
  height: 12vmin;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    width: 14vmin;
    height: 14.5vmin;
  }
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
  width: 9vmin;
  height: 9vmin;
  @media (max-width: 1280px) {
    width: 11vmin;
    height: 11vmin;
  }
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
