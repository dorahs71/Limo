import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { auth } from '../utils/firebase';
import { useHistory, useParams } from 'react-router-dom';
import CardPopup from '../components/Profile/CardPopup';
import ChangeProfile from '../components/Profile/ChangeProfile';
import BuyProfile from '../components/Profile/BuyProfile';
import CoinAlert from '../components/Common/CoinAlert';
import { Waypoint } from 'react-waypoint';
import LogoutAlert from '../components/Profile/LogoutAlert';
import LoginAlert from '../components/Common/LoginAlert';
import { useDispatch, useSelector } from 'react-redux';
import UserIntro from '../components/Profile/UserIntro';
import Loading from '../components/Common/Loading';
import TagSection from '../components/Profile/TagSection';
import ListSection from '../components/Profile/ListSection';
import FollowSection from '../components/Profile/FollowSection';
import CollectSection from '../components/Profile/CollectSection';
import CommentSection from '../components/Profile/CommentSection';
import DiarySection from '../components/Profile/DiarySection';
import CardSection from '../components/Profile/CardSection';
import {
  getUserProfile,
  getOrderedData,
  getUserSubCollectionData,
  getShareList,
  getCollectList,
  getMoreComment,
  getFirstComment,
} from '../utils/firebase';

export default function Profile() {
  const [showDiary, setShowDiary] = useState('');
  const [showList, setShowList] = useState('');
  const [showShareList, setShowShareList] = useState('');
  const [showCollect, setShowCollect] = useState('');
  const [userIntro, setUserIntro] = useState('');
  const [comment, setComment] = useState('');
  const [showCard, setShowCard] = useState('');
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [showCoinReview, setShowCoinReview] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [selectCard, setSelectCard] = useState('');
  const [logoutAlert, setLogoutAlert] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const [loginAlert, setLoginAlert] = useState(false);
  const activeItem = useSelector((state) => state.active);
  const { active } = useParams();
  const dispatch = useDispatch();
  dispatch({ type: 'changeState', todo: active });
  const history = useHistory();
  const lastPostRef = useRef();
  const currentUserId = currentUser.uid;
  const { userId } = useParams();
  const isUser = currentUserId === userId;

  if (
    active !== 'list' &&
    active !== 'comment' &&
    active !== 'collect' &&
    active !== 'follow' &&
    active !== 'diary' &&
    active !== 'card'
  ) {
    history.push('/404');
  }

  const logout = () => {
    auth.signOut().then(history.push('/'));
  };

  useEffect(() => {
    const unsubscribe = getUserProfile(userId, setUserIntro, history);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getUserSubCollectionData(
      userId,
      'Diaries',
      setShowDiary
    );
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getUserSubCollectionData(userId, 'Cards', setShowCard);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getOrderedData(
      'Lists',
      'authorId',
      userId,
      setShowList
    );
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getShareList(userId, setShowShareList);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getCollectList(userId, setShowCollect);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    const unsubscribe = getFirstComment(
      'authorId',
      userId,
      lastPostRef,
      setComment
    );
    return () => {
      unsubscribe();
    };
  }, [userId]);

  return userIntro &&
    showDiary &&
    showList &&
    showShareList &&
    showCollect &&
    comment ? (
    <ProfileDiv>
      <MainProfile>
        <UserIntro
          userId={userId}
          currentUser={currentUser}
          userIntro={userIntro}
          setShowChangeProfile={setShowChangeProfile}
          setShowBuy={setShowBuy}
          setLogoutAlert={setLogoutAlert}
          setLoginAlert={setLoginAlert}
          history={history}
        />
        <TagSection
          activeItem={activeItem}
          history={history}
          userId={userId}
          dispatch={dispatch}
          isUser={isUser}
        />
        <ListSection
          isUser={isUser}
          activeItem={activeItem}
          showList={showList}
          showShareList={showShareList}
        />

        <CommentSection
          activeItem={activeItem}
          comment={comment}
          isUser={isUser}
          currentUserId={currentUserId}
          setShowCoinReview={setShowCoinReview}
        />

        <CollectSection
          activeItem={activeItem}
          showCollect={showCollect}
          isUser={isUser}
        />

        <FollowSection activeItem={activeItem} userIntro={userIntro} />

        <DiarySection
          isUser={isUser}
          activeItem={activeItem}
          showDiary={showDiary}
        />

        <CardSection
          isUser={isUser}
          activeItem={activeItem}
          showCard={showCard}
          setSelectCard={setSelectCard}
          setShowCardPopup={setShowCardPopup}
        />
        <CardPopup
          trigger={showCardPopup}
          setTrigger={setShowCardPopup}
          cardImg={selectCard}
        />
        <ChangeProfile
          trigger={showChangeProfile}
          setTrigger={setShowChangeProfile}
        />
        <BuyProfile trigger={showBuy} setTrigger={setShowBuy} />
        <CoinAlert
          trigger={showCoinReview}
          setTrigger={setShowCoinReview}
          type={'留言'}
          coin={30}
        />
        <LogoutAlert
          trigger={logoutAlert}
          setTrigger={setLogoutAlert}
          message={'確認要登出LIMO嗎？'}
          remove={logout}
        />
        <LoginAlert
          trigger={loginAlert}
          setTrigger={setLoginAlert}
          message={'記得先登入會員才可以開始追蹤喔！'}
        />
        <Waypoint
          onEnter={() => {
            if (lastPostRef.current) {
              const unsubscribe = getMoreComment(
                'authorId',
                userId,
                lastPostRef,
                comment,
                setComment
              );
              return () => {
                unsubscribe();
              };
            }
          }}
        />
      </MainProfile>
    </ProfileDiv>
  ) : (
    <Loading />
  );
}

const ProfileDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainProfile = styled.div`
  width: 80%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    min-height: 95vh;
  }
`;
