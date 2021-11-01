import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import { useHistory } from 'react-router-dom';
import ProfileList from '../components/ProfileList';
import ToggleBtn from '../components/Toggle';
import ProfileDiary from '../components/ProfileDiary';

const MainProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileSection = styled.div`
  display: flex;
  padding: 50px;
  margin-top: 10vmin;
  justify-content: center;
`;

const ProfileImgDiv = styled.div`
  width: 20vmin;
  height: 20vmin;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 20vmin;
  height: 15vmin;
  @media (max-width: 1280px) {
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChangeProfileBtn = styled.div`
  top: 31vmin;
  color: #333;
  width: 10vmin;
  height: 2vmin;
  line-height: 2vmin;
  padding: 20px;
  background: gold;
  font-size: 22px;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  @media (max-width: 1280px) {
    width: 15vmin;
    padding: 10px;
    font-size: 20px;
    top: 33vmin;
  }
`;

const LogoutBtn = styled.div`
  margin-top: 5vmin;
  cursor: pointer;
  font-size: 20px;
  padding: 10px;
  line-height: 2vmin;
  width: 6vmin;
  height: 2vmin;
  border: 5px solid #ffb6c1;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background: linear-gradient(#ffb6c1, #6495ed);
    color: #00008b;
  }
  @media (max-width: 1280px) {
    margin-top: 8vmin;
  }
`;

const ProfileIntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8vmin;
  @media (max-width: 1280px) {
  }
`;

const IntroLine = styled.div`
  display: flex;
  font-size: 25px;
  margin-top: 3vmin;
  justify-content: space-between;
  @media (max-width: 1280px) {
    font-size: 22px;
  }
`;

const IntroTitle = styled.div`
  display: block;
`;

const IntroValue = styled.div`
  margin-left: 6vmin;
  display: block;
`;

const TagDiv = styled.div`
  margin-top: 5vmin;
  display: flex;
`;

const Tag = styled.div`
  width: 15vmin;
  font-size: 25px;
  font-weight: 500;
  height: 6vmin;
  opacity: 0.8;
  color: ${(props) => (props.active ? '#fff' : '#666')};
  background: transparent;
  border-radius: 5px;
  border-bottom: 5px solid ${(props) => (props.active ? '#7fffd4' : '#222')};
  line-height: 8vmin;
  text-align: center;
  margin-left: 5vmin;
  cursor: pointer;
  &:hover {
    border-bottom: 5px solid #7fffd4;
    color: #fff;
  }
  @media (max-width: 1280px) {
    width: 15vmin;
    font-size: 20px;
    font-weight: 500;
    height: 8vmin;
    opacity: 0.8;
    color: ${(props) => (props.active ? '#fff' : '#666')};
    border-radius: 5px;
    border-bottom: 5px solid ${(props) => (props.active ? '#7fffd4' : '#222')};
    line-height: 8vmin;
    text-align: center;
    margin-left: 5vmin;
    cursor: pointer;
  }
`;

const ShowBackground = styled.div`
  background: linear-gradient(#111, #2f4f4f, #2f4f4f, #111);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DiaryShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 3px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
    padding: 10vmin 0px 10vmin 0px;
  }
`;

const ListShowcase = styled.div`
  display: grid;
  height: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px 3px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1000px;
    padding: 8vmin 0px 10vmin 0px;
  }
`;

const CommentShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 3px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
    padding: 10px 0px 10vmin 0px;
  }
`;

const FollowShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 3px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
    padding: 10px 0px 10vmin 0px;
  }
`;

const CollectShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px 3px;
  padding: 10vmin 0px 10vmin 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
    padding: 10px 0px 10vmin 0px;
  }
`;

export default function Profile() {
  const [activeitem, setActiveitem] = useState('diary');
  const [showDiary, setShowDiary] = useState('');
  const [showList, setShowList] = useState('');
  const history = useHistory();

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .orderBy('date')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setShowDiary(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
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

  // const toggleEditQuote = () => {
  //   if (editQuote) {
  //     setEditQuote(false);
  //   } else {
  //     setEditQuote(true);
  //   }
  // };

  return (
    <MainProfile>
      <ProfileSection>
        <ProfileContainer>
          <ProfileImgDiv>
            <ProfileImg
              src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=7e617ed2-9a96-4192-8847-c07d8f642228"
              alt=""
            />
          </ProfileImgDiv>
          <ChangeProfileBtn>我要換頭像</ChangeProfileBtn>
          <LogoutBtn onClick={() => auth.signOut().then(history.push('/'))}>
            登出
          </LogoutBtn>
        </ProfileContainer>
        <ProfileIntroDiv>
          {/* <EditQuote>
              <Quote contentEditable={editQuote} edit={editQuote === true}>
                偉大的人不追求成為領導者，而是時勢造就
              </Quote>
              <EditDiv>
                <EditIcon onClick={toggleEditQuote} edit={editQuote === true} />
              </EditDiv>
            </EditQuote> 
             border-bottom: 3px solid
    ${(props) => (props.edit ? '#00e6ac' : 'transparent')};
            */}
          <IntroLine>
            <IntroTitle>暱稱</IntroTitle>
            <IntroValue>甜茶好帥</IntroValue>
          </IntroLine>
          <IntroLine>
            <IntroTitle>誕生日</IntroTitle>
            <IntroValue>2021/10/26</IntroValue>
          </IntroLine>
          <IntroLine>
            <IntroTitle>積分</IntroTitle>
            <IntroValue>235</IntroValue>
          </IntroLine>
          <IntroLine>
            <IntroTitle>即時通知</IntroTitle>
            <ToggleBtn />
          </IntroLine>
        </ProfileIntroDiv>
      </ProfileSection>
      <TagDiv>
        <Tag
          active={activeitem === 'diary'}
          onClick={() => setActiveitem('diary')}
        >
          日誌
        </Tag>
        <Tag
          active={activeitem === 'list'}
          onClick={() => setActiveitem('list')}
        >
          片單
        </Tag>
        <Tag
          active={activeitem === 'follow'}
          onClick={() => setActiveitem('follow')}
        >
          追蹤
        </Tag>
        <Tag
          active={activeitem === 'collect'}
          onClick={() => setActiveitem('collect')}
        >
          收藏
        </Tag>
        <Tag
          active={activeitem === 'comment'}
          onClick={() => setActiveitem('comment')}
        >
          評論
        </Tag>
      </TagDiv>
      <ShowBackground>
        {activeitem === 'diary' && (
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
        {activeitem === 'list' && (
          <ListShowcase>
            {showList.map((item) => (
              <ProfileList
                key={item.listId}
                title={item.listTitle}
                posters={item.listPosters}
                listId={item.listId}
              />
            ))}
          </ListShowcase>
        )}
        {activeitem === 'follow' && <FollowShowcase></FollowShowcase>}
        {activeitem === 'collect' && <CollectShowcase></CollectShowcase>}
        {activeitem === 'comment' && <CommentShowcase></CommentShowcase>}
      </ShowBackground>
    </MainProfile>
  );
}
