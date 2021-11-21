import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useHistory, useParams } from 'react-router-dom';
import firebase from '../utils/firebase';
import ProfileList from '../components/ProfileList';
// import ToggleBtn from '../components/Toggle';
import ProfileDiary from '../components/ProfileDiary';
import ProfileFollow from '../components/ProfileFollow';
import ProfileComment from '../components/ProfileComment';
import ProfileCollect from '../components/ProfileCollect';
import CardPopup from '../components/CardPopup';
import ChangeProfile from '../components/ChangeProfile';
import BuyProfile from '../components/BuyProfile';
import CoinAlert from '../components/CoinAlert';
import moment from 'moment';
import coin from '../images/limocoin.png';
import change from '../images/change.png';
import fans from '../images/fans.png';
import { Cake, Storefront, Stars } from '@material-ui/icons';
import nocollect from '../images/nocollect.png';
import nocard from '../images/nocard.png';
import nodiary from '../images/nodiary.png';
import nofollow from '../images/nofollow.png';
import nolist from '../images/nolist.png';
import nocomment from '../images/nocomment.png';
import DeleteAlert from '../components/DeleteAlert';
import { Waypoint } from 'react-waypoint';
import loading from '../images/loading.gif';
import LogoutAlert from '../components/LogoutAlert';
import LoginAlert from '../components/LoginAlert';
import { useDispatch, useSelector } from 'react-redux';

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
const ProfileSection = styled.div`
  display: flex;
  padding: 50px;
  margin-top: 10vmin;
  justify-content: center;
`;

const ChangeImg = styled.img`
  width: 5vmin;
  height: 5vmin;
`;

const ChangeWord = styled.div`
  font-size: 2vmin;
`;

const ProfileImg = styled.img`
  width: 15vmin;
  height: 15vmin;
  object-fit: contain;
`;

const ProfileImgDiv = styled.div`
  width: 20vmin;
  height: 20vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c5cdc0;
  border-radius: 50%;
  position: relative;
`;

const ChangeProfileBtn = styled.div`
  width: 10vmin;
  height: 10vmin;
  display: flex;
  margin-top: -50%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  display: none;
  z-index: 1;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover ${ChangeProfileBtn} {
    display: flex;
  }

  &:hover ${ProfileImgDiv} {
    opacity: ${(props) => props.isUser};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const FollowIcon = styled(Stars)`
  transform: scale(1.5);
  color: ${(props) => (props.follow ? '#FFD700' : '#B2B2B2')};
  margin-right: 2vmin;
`;

const FollowBtn = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
  text-align: center;
  width: 18vmin;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background: #767b73;
    color: #fff;
  }
`;

const LogoutBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #cad2c6;
  }
`;

const ProfileIntroDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-around; */
  margin-left: 8vmin;
`;

const IntroInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
`;

const IntroLine = styled.div`
  display: flex;
  font-size: 3vmin;
  margin-top: 3vmin;
  align-items: center;
`;

const NameValue = styled.div`
  font-size: 5vmin;
  font-weight: 500;
`;

const IntroValue = styled.div`
  margin-left: 3vmin;
  display: block;
`;

const CakeIcon = styled(Cake)`
  transform: scale(1.3);
`;

const StoreIcon = styled(Storefront)`
  transform: scale(1.2);
  margin-right: 1vmin;
`;

const StoreBtn = styled.div`
  margin-top: 3vmin;
  padding: 1.5vmin 1vmin;
  width: 14vmin;
  height: 1vmin;
  font-weight: 450;
  font-size: 2.2vmin;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
  color: #898f86;
  cursor: pointer;
  &:hover {
    background: #898f86;
    color: #fff;
  }
`;

const CoinNum = styled.div`
  display: block;
`;

const CoinImg = styled.img`
  width: 4vmin;
  height: 4vmin;
`;

const FansImg = styled.img`
  width: 4vmin;
  height: 4vmin;
`;

const TagDiv = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Tag = styled.div`
  width: 15vmin;
  font-size: 2.5vmin;
  font-weight: 500;
  height: 6vmin;
  opacity: 0.8;
  color: ${(props) => (props.active ? '#fff' : '#666')};
  background: transparent;
  border-radius: 5px;
  border-bottom: 5px solid
    ${(props) => (props.active ? '#7fffd4' : 'transparent')};
  line-height: 6vmin;
  text-align: center;
  margin-left: 5vmin;
  cursor: pointer;
  &:hover {
    border-bottom: 5px solid #7fffd4;
    color: #fff;
  }
`;

const DiaryShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5vmin 0.8vmin;
  padding: 5vmin 0;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ListShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vmin 0vmin;
  padding: 5vmin 0;
  width: 100%;
  justify-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
    grid-gap: 5vmin 0vmin;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CommentShowcase = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vmin 0;
  text-align: center;
  width: 100%;
  align-items: center;
`;

const FollowShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px 3px;
  padding: 5vmin 0;
  width: 100%;
`;

const CollectShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vmin 0vmin;
  padding: 5vmin 0;
  width: 100%;
  justify-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90%;
    grid-gap: 5vmin 0vmin;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CardShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px 3px;
  padding: 5vmin 0;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5vmin 0vmin;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CardSenderDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SenderImgDiv = styled.img`
  width: 5vmin;
  height: 5vmin;
`;
const SenderNameDiv = styled.div`
  font-size: 2.5vmin;
`;
const CardDiv = styled.img`
  margin-top: 1vmin;
  width: 20vmin;
  height: 15vmin;
  border-radius: 10px;
`;

const Space = styled.div`
  width: 100%;
  height: 35vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SpaceImg = styled.img`
  width: 12vmin;
  height: 11vmin;
  object-fit: contain;
`;

const Word = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
`;

const Loading = styled.img`
  width: 10vmin;
  height: 10vmin;
`;

const LoadingDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Profile() {
  const [showDiary, setShowDiary] = useState('');
  const [showList, setShowList] = useState('');
  const [showShareList, setShowShareList] = useState('');
  const [showCollect, setShowCollect] = useState('');
  const [showProfile, setShowProfile] = useState('');
  const [showComment, setShowComment] = useState('');
  const [updateFollow, setUpdateFollow] = useState('');
  const [showCard, setShowCard] = useState('');
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [showChangeProfile, setShowChangeProfile] = useState(false);
  const [showCoinReview, setShowCoinReview] = useState(false);
  const [showBuy, setShowBuy] = useState(false);
  const [selectCard, setSelectCard] = useState('');
  const [userData, setUserData] = useState('');
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

  const isUser = currentUserId === userId;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(currentUserId)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (isMounted) setUpdateFollow(data);
      });
    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  const isFollow = updateFollow?.follow?.includes(userId);
  const toggleFollow = () => {
    if (currentUserId) {
      if (isFollow) {
        firestore
          .collection('Users')
          .doc(currentUserId)
          .update({
            follow: firebase.firestore.FieldValue.arrayRemove(userId),
          });
        firestore
          .collection('Users')
          .doc(userId)
          .update({
            followBy: firebase.firestore.FieldValue.arrayRemove(currentUserId),
          });
      } else {
        firestore
          .collection('Users')
          .doc(currentUserId)
          .update({
            follow: firebase.firestore.FieldValue.arrayUnion(userId),
          });
        firestore
          .collection('Users')
          .doc(userId)
          .update({
            followBy: firebase.firestore.FieldValue.arrayUnion(currentUserId),
          });
      }
    } else {
      setLoginAlert(true);
    }
  };

  const logout = () => {
    auth.signOut().then(history.push('/'));
  };

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(userId)
      .collection('Diaries')
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowDiary(data);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(userId)
      .collection('Cards')
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowCard(data);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .where('authorId', '==', userId)
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
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .where('authorId', '==', userId)
      .where('listShare', '==', true)
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowShareList(data);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Lists')
      .where('collect', 'array-contains', userId)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowCollect(data);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          if (isMounted) setShowProfile(data);
        } else {
          history.push('/404');
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Comments')
      .where('authorId', '==', userId)
      .orderBy('date', 'desc')
      .limit(5)
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        lastPostRef.current =
          collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
        if (isMounted) setShowComment(data);
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .get()
      .then((collection) => {
        const data = collection.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setUserData(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  let friendData = [];

  if (userData !== '' && showCard !== '') {
    showCard.map((item) => {
      const data = userData.find(({ uid }) => uid === item.senderId);
      friendData.push({
        friendImg: data.profileImg,
        friendName: data.userName,
        cardUrl: item.cardUrl,
      });
      return data;
    });
  }

  return showProfile &&
    showDiary &&
    showList &&
    showShareList &&
    showCollect &&
    showComment ? (
    <ProfileDiv>
      <MainProfile>
        <ProfileSection>
          <ProfileContainer>
            <ProfileWrapper isUser={isUser ? 0.25 : 1}>
              <ProfileImgDiv>
                <ProfileImg src={showProfile?.profileImg} alt="" />
              </ProfileImgDiv>
              {isUser ? (
                <ChangeProfileBtn onClick={() => setShowChangeProfile(true)}>
                  <ChangeImg src={change} alt="" />
                  <ChangeWord>更換頭像</ChangeWord>
                </ChangeProfileBtn>
              ) : (
                ''
              )}
            </ProfileWrapper>
            {currentUserId === userId && (
              <>
                <StoreBtn onClick={() => setShowBuy(true)}>
                  <StoreIcon /> 頭像商城
                </StoreBtn>
                <LogoutBtn onClick={() => setLogoutAlert(true)}>登出</LogoutBtn>
              </>
            )}
            {currentUserId !== userId && (
              <FollowBtn onClick={toggleFollow} follow={isFollow}>
                <FollowIcon follow={isFollow} />{' '}
                {isFollow ? '追蹤中' : '我要追蹤'}
              </FollowBtn>
            )}
          </ProfileContainer>
          <ProfileIntroDiv>
            <NameValue>{showProfile?.userName}</NameValue>
            <IntroInfo>
              {/* <IntroLine>
                <CakeIcon />
                <IntroValue>
                  {moment(showProfile?.birthday?.toDate())
                    .format('YYYY / MM / DD HH:mm:ss')
                    .substr(0, 15)}
                </IntroValue>
              </IntroLine> */}
              <IntroLine>
                <FansImg src={fans} alt="" />
                <IntroValue>
                  <CoinNum>
                    {showProfile?.followBy?.length || 0}&nbsp;&nbsp;粉絲
                  </CoinNum>
                </IntroValue>
              </IntroLine>
              {currentUserId === userId && (
                <>
                  <IntroLine>
                    <CoinImg src={coin} alt="" />
                    <IntroValue>
                      <CoinNum>{showProfile?.coin?.toLocaleString()}</CoinNum>
                    </IntroValue>
                  </IntroLine>

                  {/* <IntroLine>
                <IntroTitle>即時通知</IntroTitle>
                <ToggleBtn />
              </IntroLine> */}
                </>
              )}
            </IntroInfo>
          </ProfileIntroDiv>
        </ProfileSection>

        <TagDiv>
          <Tag
            active={activeItem === 'list'}
            onClick={() => {
              history.push(`/profile/${userId}/list`);
              // setActiveItem('list');
              dispatch({ type: 'changeState', todo: 'list' });
            }}
          >
            片單
          </Tag>

          <Tag
            active={activeItem === 'comment'}
            onClick={() => {
              history.push(`/profile/${userId}/comment`);
              // setActiveItem('comment');
              dispatch({ type: 'changeState', todo: 'comment' });
            }}
          >
            評論
          </Tag>

          <Tag
            active={activeItem === 'collect'}
            onClick={() => {
              history.push(`/profile/${userId}/collect`);
              // setActiveItem('collect');
              dispatch({ type: 'changeState', todo: 'collect' });
            }}
          >
            收藏
          </Tag>
          <Tag
            active={activeItem === 'follow'}
            onClick={() => {
              history.push(`/profile/${userId}/follow`);
              // setActiveItem('follow');
              dispatch({ type: 'changeState', todo: 'follow' });
            }}
          >
            追蹤
          </Tag>

          {isUser && (
            <Tag
              active={activeItem === 'diary'}
              onClick={() => {
                history.push(`/profile/${userId}/diary`);
                dispatch({ type: 'changeState', todo: 'diary' });
                // setActiveItem('diary');
              }}
            >
              日誌
            </Tag>
          )}
          {isUser && (
            <Tag
              active={activeItem === 'card'}
              onClick={() => {
                history.push(`/profile/${userId}/card`);
                dispatch({ type: 'changeState', todo: 'card' });
                // setActiveItem('card');
              }}
            >
              小卡
            </Tag>
          )}
        </TagDiv>
        {isUser && activeItem === 'list' && showList.length === 0 && (
          <Space>
            <SpaceImg src={nolist} alt="" />
            <Word>快將喜歡的電影加入片單吧！</Word>
          </Space>
        )}
        {isUser && activeItem === 'list' && showList.length > 0 && (
          <ListShowcase>
            {showList?.map((item) => (
              <ProfileList
                key={item.listId}
                title={item.listTitle}
                posters={item.listPosters}
                listId={item.listId}
                isUser={isUser}
              />
            ))}
          </ListShowcase>
        )}
        {!isUser && activeItem === 'list' && showShareList.length === 0 && (
          <Space>
            <SpaceImg src={nolist} alt="" />
            <Word>快將喜歡的電影加入片單吧！</Word>
          </Space>
        )}
        {!isUser && activeItem === 'list' && showShareList.length > 0 && (
          <ListShowcase>
            {showShareList?.map((item) => (
              <ProfileList
                key={item.listId}
                title={item.listTitle}
                posters={item.listPosters}
                listId={item.listId}
                isUser={isUser}
              />
            ))}
          </ListShowcase>
        )}
        {activeItem === 'follow' && showProfile.follow === undefined && (
          <Space>
            <SpaceImg src={nofollow} alt="" />
            <Word>你還沒有關注的對象呦！</Word>
          </Space>
        )}
        {activeItem === 'follow' && showProfile.follow?.length === 0 && (
          <Space>
            <SpaceImg src={nofollow} alt="" />
            <Word>你還沒有關注的對象呦！</Word>
          </Space>
        )}
        {activeItem === 'follow' &&
          showProfile.follow !== '' &&
          showProfile.follow?.length > 0 && (
            <FollowShowcase>
              {showProfile.follow?.map((item) => (
                <ProfileFollow key={item} followId={item} />
              ))}
            </FollowShowcase>
          )}
        {activeItem === 'collect' && showCollect.length === 0 && (
          <Space>
            <SpaceImg src={nocollect} alt="" />
            <Word>開始收藏喜歡的片單吧！</Word>
          </Space>
        )}
        {activeItem === 'collect' && showCollect.length > 0 && (
          <CollectShowcase>
            {showCollect?.map((item) => (
              <ProfileCollect
                key={item.listId}
                title={item.listTitle}
                posters={item.listPosters}
                listId={item.listId}
                isUser={isUser}
              />
            ))}
          </CollectShowcase>
        )}
        {activeItem === 'comment' && showComment.length === 0 && (
          <Space>
            <SpaceImg src={nocomment} alt="" />
            <Word>開始分享自己對電影的看法吧！</Word>
          </Space>
        )}
        {activeItem === 'comment' && showComment.length > 0 && (
          <CommentShowcase>
            {showComment !== '' &&
              showComment.map((item) => (
                <ProfileComment
                  key={item.commentId}
                  commentId={item.commentId}
                  movieId={item.movieId}
                  poster={item.poster}
                  chTitle={item.chTitle}
                  date={item.date}
                  rate={item.rate}
                  comment={item.comment}
                  reviews={item.reviews}
                  smileBy={item.smileBy}
                  isUser={isUser}
                  currentUserId={currentUserId}
                  showCoin={setShowCoinReview}
                />
              ))}
          </CommentShowcase>
        )}
        {isUser && activeItem === 'diary' && showDiary.length === 0 && (
          <Space>
            <SpaceImg src={nodiary} alt="" />
            <Word>快將喜歡的電影加入日誌吧！</Word>
          </Space>
        )}
        {isUser && activeItem === 'diary' && showDiary.length > 0 && (
          <DiaryShowcase>
            {showDiary !== '' &&
              showDiary.map((item) => (
                <ProfileDiary
                  key={item.diaryId}
                  diaryId={item.diaryId}
                  poster={item.poster}
                  chTitle={item.chTitle}
                />
              ))}
          </DiaryShowcase>
        )}
        {isUser && activeItem === 'card' && friendData.length === 0 && (
          <Space>
            <SpaceImg src={nocard} alt="" />
            <Word>還沒收到朋友寄來的小卡呦～</Word>
          </Space>
        )}
        {isUser && activeItem === 'card' && friendData.length > 0 && (
          <CardShowcase>
            {friendData.map((friend) => (
              <ProfileCard
                key={friend.cardUrl}
                onClick={() => {
                  setSelectCard(friend.cardUrl);
                  setShowCardPopup(true);
                }}
              >
                <CardSenderDiv>
                  <SenderImgDiv src={friend.friendImg} alt="" />
                  <SenderNameDiv>{friend.friendName}</SenderNameDiv>
                </CardSenderDiv>
                <CardDiv src={friend.cardUrl} alt="" />
              </ProfileCard>
            ))}
          </CardShowcase>
        )}

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
              firestore
                .collection('Comments')
                .where('authorId', '==', userId)
                .orderBy('date', 'desc')
                .startAfter(lastPostRef.current)
                .limit(5)
                .onSnapshot((collectionSnapshot) => {
                  const data = collectionSnapshot.docs.map((doc) => {
                    return doc.data();
                  });
                  lastPostRef.current =
                    collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                  setShowComment([...showComment, ...data]);
                });
            }
          }}
        />
      </MainProfile>
    </ProfileDiv>
  ) : (
    <LoadingDiv>
      <Loading src={loading} alt="" />
    </LoadingDiv>
  );
}
