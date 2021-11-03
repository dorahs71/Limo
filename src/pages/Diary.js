import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import DiaryQuote from '../components/DiaryQuote';
import DiaryBlock from '../components/DiaryBlock';
import TrailerPopup from '../components/TrailerPopup';
import AOS from 'aos';
import {
  StarRounded,
  LiveTv,
  LocalOffer,
  AddCircle,
  CancelOutlined,
  LibraryAdd,
} from '@material-ui/icons';

const DiaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: auto;
  opacity: 0.5;
  overflow: visible;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #111, transparent);
    z-index: 3;
  }
`;

const Zoom = styled.img`
  display: inline-block;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(1);
  transition: 1s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const HeadPic = styled.div`
  overflow: hidden;
  margin: 0;
`;

const MovieIntro = styled.div`
  display: flex;
`;

const PosterDiv = styled.div`
  display: block;
`;

const PosterImg = styled.img`
  position: absolute;
  z-index: 5;
  left: 10vmin;
  top: 50vmin;
  width: 53vmin;
  height: 60vmin;
  @media (max-width: 1280px) {
    width: 53vmin;
    height: 66vmin;
  }
`;

const PosterSquare = styled.div`
  position: absolute;
  z-index: 4;
  left: 0px;
  top: 55vmin;
  width: 80vmin;
  height: 50vmin;
  background: #75e799;
  @media (max-width: 1280px) {
    width: 70vmin;
    height: 50vmin;
  }
`;

const IntroDiv = styled.div`
  font-size: 28px;
  top: 50vmin;
  right: 40vmin;
  position: absolute;
  z-index: 5;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (max-width: 1280px) {
    top: 51vmin;
    font-size: 21px;
    font-weight: 500;
  }
`;

const ChTitle = styled.div`
  font-weight: bold;
  font-size: 42px;
  @media (max-width: 1280px) {
    font-size: 42px;
  }
`;

const EnTitle = styled.div`
  @media (max-width: 1280px) {
    font-size: 25px;
  }
`;

const MovieDate = styled.div`
  margin-top: 5vmin;
  @media (max-width: 1280px) {
  }
`;

const Length = styled.div`
  margin-top: 2vmin;
  @media (max-width: 1280px) {
  }
`;

const Director = styled.div`
  margin-top: 2vmin;
  @media (max-width: 1280px) {
  }
`;

const Rate = styled.div`
  margin-top: 2vmin;
  align-items: center;
`;

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 1vmin;
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
`;

const TrailerButton = styled.div`
  width: 100%;
  display: flex;
  height: 5vmin;
  background: gold;
  padding: 8px 5px;
  color: #333;
  margin-top: 4vmin;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

const Trailer = styled.div`
  font-size: 28px;
  line-height: 5vmin;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const TrailerIcon = styled(LiveTv)`
  transform: scale(1.7);
  margin-right: 2vmin;
  @media (max-width: 1280px) {
    transform: scale(1.2);
    color: #333;
    margin-right: 1vmin;
  }
`;

const TopDiv = styled.div`
  width: 100%;
  height: 35vmin;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #fffaf0, transparent);
    z-index: 3;
  }
`;

const StoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(#fffaf0, #fffaf0, #fffaf0, #fffaf0, #111);
  padding: 20px 20px;
  color: #333;
  text-align: center;
  align-items: center;
  position: relative;
`;

const Story = styled.div`
  width: 80%;
  font-size: 27px;
  margin-top: 5vmin;
  margin-bottom: 20vmin;
  @media (max-width: 1280px) {
    font-size: 22px;
  }
`;

const StoryTitle = styled.div`
  margin-top: 10vmin;
  color: #333;
  font-size: 50px;
  font-weight: 700;
  width: auto;
  position: relative;
  @media (max-width: 1280px) {
    font-size: 40px;
  }
  /* &:before {
    content: '';
    position: absolute;
    left: 71.5vmin;
    bottom: 0;
    height: 1px;
    width: 15%;
    border-bottom: 6px solid #75e799;
  } */
`;

const Title = styled(StoryTitle)`
  color: #fff;
  text-align: center;
  &:before {
    left: 68vmin;
  }
`;

const CastDiv = styled.div`
  background: #111;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Cast = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px 0px;
  padding: 30px 0px;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1280px) {
    max-width: 1140px;
  }
`;

const ActorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActorImg = styled.img`
  width: 18vmin;
  height: 20vmin;
  border-radius: 50% 30px;
  @media (max-width: 1280px) {
    width: 20vmin;
    height: 22vmin;
  }
`;

const ActorName = styled.div`
  margin-top: 3vmin;
  font-size: 25px;
  font-weight: 700;
  @media (max-width: 1280px) {
    font-size: 20px;
    font-weight: 500;
  }
`;

const HashtagSection = styled.div`
  padding: 3vmin 2vmin 2vmin 2vmin;
  display: flex;
  flex-direction: column;
  @media (max-width: 1280px) {
    padding: 10vmin 5vmin 5vmin 5vmin;
  }
`;

const HashtagContainer = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5vmin 5vmin 5vmin 7vmin;
  max-width: 1140px;
`;

const HashtagHead = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5vmin;
  justify-content: center;
  align-items: center;
`;

const AddHashtag = styled.input`
  width: 80%;
  height: 3vmin;
  font-size: 25px;
  padding: 10px;
  background: #444;
  border: 0;
  color: #fff8dc;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  &:focus {
    outline: 0;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -34px;
  top: -3px;
  display: none;
`;

const CancelIcon = styled(CancelOutlined)`
  transform: scale(1.15);
  color: #f08080;
  border-radius: 50%;
`;

const HashtagDiv = styled.div`
  display: flex;
  margin: 2vmin 0 0 8vmin;
  width: auto;
  position: relative;
  &:hover ${Close} {
    display: flex;
  }
  @media (max-width: 1280px) {
    margin: 5vmin 0 0 8vmin;
  }
`;

const Hashtag = styled.div`
  font-size: 28px;
  margin-left: 2vmin;
  @media (max-width: 1280px) {
    font-size: 23px;
    margin-left: 1vmin;
  }
`;

const TagIcon = styled(LocalOffer)`
  transform: scale(2);
  color: #7fffd4;
  @media (max-width: 1280px) {
    transform: scale(1.5);
  }
`;

const AddBtn = styled(AddCircle)`
  transform: scale(1.6);
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
`;

const AddQuoteDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  /* display: none; */
`;

const QuoteSection = styled.div`
  background: linear-gradient(#111, #00264d);
  width: 100%;
  height: auto;
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* &:hover ${AddQuoteDiv} {
    display: block;
  } */
`;

const QuoteDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const AddQuoteIcon = styled(LibraryAdd)`
  transform: scale(1.5);
  color: #555;
  margin-top: 5vmin;
  cursor: pointer;
  &:hover {
    color: #ffaf1a;
  }
`;

const DiarySection = styled.div`
  background: linear-gradient(#00264d, #111);
  padding: 30px 60px;
  text-align: center;
  margin-bottom: 10vmin;
`;

const DiaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiaryHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const AddDiaryDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  /* display: none; */
`;

export default function Diary() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const { diaryId } = useParams();
  const [movieIntro, setMovieIntro] = useState('');
  const [addTag, setAddTag] = useState('');
  const [updateHashtag, setUpdateHashtag] = useState('');
  const [updateQuote, setUpdateQuote] = useState('');
  const [updateDiary, setUpdateDiary] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        const movieId = data?.movieId;
        firestore
          .collection('Movies')
          .doc(movieId)
          .get()
          .then((docSnapshot) => {
            const movieData = docSnapshot.data();
            if (isMounted) setMovieIntro(movieData);
          });
      });
    return () => {
      isMounted = false;
    };
  }, [uid, diaryId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (isMounted) setUpdateHashtag(data);
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
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryQuotes')
      .orderBy('date')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setUpdateQuote(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid, diaryId]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryData')
      .orderBy('date')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setUpdateDiary(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid, diaryId]);

  const handleAddTag = () => {
    firestore
      .collection('Movies')
      .doc(movieIntro.movieId)
      .update({
        movieTag: firebase.firestore.FieldValue.arrayUnion(addTag),
      });
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .update({
        hashtag: firebase.firestore.FieldValue.arrayUnion(addTag),
      });
    setAddTag('');
  };

  const removeTag = (tag) => {
    firestore
      .collection('Movies')
      .doc(movieIntro.movieId)
      .update({
        movieTag: firebase.firestore.FieldValue.arrayRemove(tag),
      });
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .update({
        hashtag: firebase.firestore.FieldValue.arrayRemove(tag),
      });
  };

  const addQuote = () => {
    const docRef = firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryQuotes')
      .doc();
    docRef.set({
      diaryQuoteId: docRef.id,
      diaryQuote: '',
      date: new Date(),
    });
  };

  const addNewDiary = () => {
    const docRef = firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .doc(diaryId)
      .collection('DiaryData')
      .doc();
    docRef.set({
      diaryDataId: docRef.id,
      diaryNote: '',
      date: new Date(),
    });
  };

  return (
    <DiaryContainer>
      {/* {window.scrollTo(0, 0)} */}
      <BackgroundDiv>
        <HeadPic>
          {movieIntro !== '' && <Zoom src={movieIntro?.gallery[0]} alt="" />}
        </HeadPic>
      </BackgroundDiv>
      <MovieIntro>
        <PosterDiv>
          <PosterImg src={movieIntro?.poster} alt="" data-aos="fade-right" />
          <PosterSquare data-aos="fade-right" />
        </PosterDiv>
        <IntroDiv data-aos="fade-up">
          <ChTitle>{movieIntro?.chTitle}</ChTitle>
          <EnTitle>{movieIntro?.enTitle}</EnTitle>
          <Rate>
            評分：
            <Star />
            {movieIntro?.rate}/ {movieIntro?.rateNum}人
          </Rate>
          <MovieDate>上映日期：{movieIntro?.date}</MovieDate>
          <Length>片長：{movieIntro?.length}</Length>
          <Director>導演：{movieIntro?.director}</Director>
          <TrailerButton onClick={() => setShowTrailer(true)}>
            <TrailerIcon />
            <Trailer> 我想看預告片</Trailer>
          </TrailerButton>
        </IntroDiv>
      </MovieIntro>
      <TopDiv />
      <StoryDiv>
        <StoryTitle data-aos="fade-up">劇情簡介</StoryTitle>
        <Story data-aos="fade-up">{movieIntro?.story}</Story>
      </StoryDiv>
      <CastDiv>
        <Title>演員列表</Title>
        <Cast>
          {movieIntro?.cast?.map((item) => (
            <ActorDiv key={item.chActor}>
              <ActorImg src={item.actorImg} alt="" />
              <ActorName>
                {item.chActor} <br />
                {item.enActor || ''}
              </ActorName>
            </ActorDiv>
          ))}
        </Cast>
      </CastDiv>
      <HashtagSection>
        <Title>我的標籤</Title>
        <HashtagHead>
          <AddHashtag
            placeholder="寫下我的電影標籤"
            value={addTag}
            onChange={(e) => setAddTag(e.target.value)}
          />
          <AddBtn onClick={handleAddTag} />
        </HashtagHead>
        <HashtagContainer>
          {updateHashtag?.hashtag?.map((item) => (
            <HashtagDiv key={item}>
              <Close onClick={() => removeTag(item)}>
                <CancelIcon />
              </Close>
              <TagIcon />
              <Hashtag>{item}</Hashtag>
            </HashtagDiv>
          ))}
        </HashtagContainer>
      </HashtagSection>
      <QuoteSection>
        <QuoteHead>
          <Title>經典對白</Title>
        </QuoteHead>
        <QuoteContainer>
          <QuoteDiv>
            {updateQuote !== '' &&
              updateQuote.map((item) => (
                <DiaryQuote
                  key={item.diaryQuoteId}
                  diaryQuoteId={item.diaryQuoteId}
                  diaryQuote={item.diaryQuote}
                />
              ))}
          </QuoteDiv>
          <AddQuoteDiv onClick={addQuote}>
            <AddQuoteIcon />
          </AddQuoteDiv>
        </QuoteContainer>
      </QuoteSection>
      <DiarySection>
        <DiaryHead>
          <Title>我的日誌</Title>
        </DiaryHead>
        <DiaryWrapper>
          {updateDiary !== '' &&
            updateDiary.map((item) => (
              <DiaryBlock
                key={item.diaryDataId}
                diaryDataId={item.diaryDataId}
                diaryNote={item.diaryNote}
                date={item.date}
              />
            ))}
          <AddDiaryDiv onClick={addNewDiary}>
            <AddQuoteIcon />
          </AddDiaryDiv>
        </DiaryWrapper>
      </DiarySection>
      <TrailerPopup
        trailerKey={movieIntro.trailerKey}
        trigger={showTrailer}
        setTrigger={setShowTrailer}
      />
    </DiaryContainer>
  );
}
