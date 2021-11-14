import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import DiaryQuote from '../components/DiaryQuote';
import DiaryBlock from '../components/DiaryBlock';
import TrailerPopup from '../components/TrailerPopup';
import diary from '../images/diary.png';
import noquote from '../images/noquote.png';
import AOS from 'aos';
import {
  StarRounded,
  LiveTv,
  LocalOffer,
  AddCircle,
  CancelOutlined,
  RateReview,
  PostAdd,
  Theaters,
} from '@material-ui/icons';
import TagDeleteAlert from '../components/TagDeleteAlert';

const DiaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Background = styled.div`
  opacity: 0.05;
  background: ${(prop) => `url(${prop.img})no-repeat center fixed`};
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  background-size: cover;
  z-index: -1;
`;

const MovieMain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1290px) {
    max-width: 1280px;
  }
`;

const MovieIntro = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10%;
  justify-content: space-between;
  align-items: center;
`;

const PosterImg = styled.img`
  z-index: 5;
  width: 50vmin;
  height: 60vmin;
  box-shadow: 2px 2px 19px 2px rgba(20, 19, 19, 1);
`;

const IntroDiv = styled.div`
  z-index: 5;
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    font-weight: 500;
  }
`;

const ChTitle = styled.div`
  font-weight: bold;
  font-size: 5vmin;
`;

const EnTitle = styled.div`
  font-size: 2.2vmin;
  font-weight: 500;
  color: #c5cdc0;
`;

const ColumnDiv = styled.div`
  display: flex;
  margin-top: 4vmin;
  flex-direction: column;
  align-items: flex-start;
`;

const ColumnValue = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1280px) {
  }
`;

const Column = styled.div`
  margin-top: 1vmin;
  font-size: 2.5vmin;
  align-items: center;
  display: flex;
`;

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 5px;
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
`;

const TrailerButton = styled.div`
  width: 50%;
  display: flex;
  height: 5vmin;
  background: #62d498;
  padding: 8px 5px;
  color: #333;
  margin-top: 4vmin;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #8aefba;
  }
`;

const Trailer = styled.div`
  font-size: 2.5vmin;
  line-height: 5vmin;
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

const MovieIcon = styled(Theaters)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const MovieLinkBtn = styled.div`
  padding: 1.2vmin 1vmin;
  margin-top: 3vmin;
  width: 25vmin;
  height: 1vmin;
  font-weight: 400;
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

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3vmin;
  text-align: center;
  width: -webkit-fill-available;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 10vmin;
  font-size: 4.5vmin;
  font-weight: 700;
  width: 20vmin;
  border-bottom: 8px solid #61d498;
`;

const HashtagContainer = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const HashtagHead = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5vmin;
  justify-content: center;
  align-items: center;
`;

const AddHashtag = styled.input`
  width: 100%;
  height: 3vmin;
  font-size: 2.8vmin;
  padding: 10px;
  background: #444;
  border: 0;
  color: #fff;
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
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const FunctionBtn = styled.div`
  padding: 1.2vmin 1vmin;
  margin-top: -3vmin;
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

const FunctionHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Function = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const QuoteDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteIcon = styled(RateReview)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const DiaryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiaryIcon = styled(PostAdd)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const Space = styled.div`
  width: 100%;
  height: 25vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SpaceImg = styled.img`
  margin-top: 1vmin;
  width: 12vmin;
  height: 11vmin;
`;

const Word = styled.div`
  margin-top: 3vmin;
  font-size: 2.8vmin;
`;

export default function Diary() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const { diaryId } = useParams();
  const [eachMovie, setEachMovie] = useState('');
  const [addTag, setAddTag] = useState('');
  const [updateHashtag, setUpdateHashtag] = useState('');
  const [updateQuote, setUpdateQuote] = useState('');
  const [updateDiary, setUpdateDiary] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [removeTagAlert, setRemoveTagAlert] = useState(false);

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
            if (isMounted) setEachMovie(movieData);
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
      .doc(eachMovie.movieId)
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
      .doc(eachMovie.movieId)
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
      <MovieMain>
        <MovieIntro>
          <PosterImg src={eachMovie.poster} alt="" data-aos="fade-right" />
          <IntroDiv data-aos="fade-left">
            <ChTitle>{eachMovie.chTitle}</ChTitle>
            <EnTitle>{eachMovie.enTitle}</EnTitle>
            <ColumnDiv>
              <ColumnValue>
                <Column>
                  評分：
                  <Star /> {eachMovie.rate} / {eachMovie.rateNum}人
                </Column>
              </ColumnValue>
              <ColumnValue>
                <Column>上映日期：{eachMovie.date} </Column>
              </ColumnValue>
              <ColumnValue>
                <Column>片長：{eachMovie.length} </Column>
              </ColumnValue>
              <ColumnValue>
                <Column>導演：{eachMovie.director} </Column>
              </ColumnValue>
            </ColumnDiv>
            {eachMovie.trailerKey !== '' && (
              <TrailerButton onClick={() => setShowTrailer(true)}>
                <TrailerIcon />
                <Trailer> 我想看預告片</Trailer>
              </TrailerButton>
            )}
            <MyLink to={`/movie/${eachMovie.movieId}`}>
              <MovieLinkBtn>
                <MovieIcon /> 查看電影詳細資訊
              </MovieLinkBtn>
            </MyLink>
          </IntroDiv>
        </MovieIntro>

        <SectionDiv>
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
              <>
                <HashtagDiv key={item}>
                  <Close onClick={() => setRemoveTagAlert(true)}>
                    <CancelIcon />
                  </Close>
                  <TagIcon />
                  <Hashtag>{item}</Hashtag>
                </HashtagDiv>
                <TagDeleteAlert
                  tag={item}
                  trigger={removeTagAlert}
                  setTrigger={setRemoveTagAlert}
                  message={'確認要移除此標籤嗎？'}
                  remove={removeTag}
                />
              </>
            ))}
          </HashtagContainer>
        </SectionDiv>
        <SectionDiv>
          <FunctionHead>
            <Title>經典對白</Title>
          </FunctionHead>
          <Function>
            <FunctionBtn onClick={addQuote}>
              <QuoteIcon /> 新增對白
            </FunctionBtn>
          </Function>

          <QuoteContainer>
            <QuoteDiv>
              {updateQuote.length > 0 &&
                updateQuote.map((item) => (
                  <DiaryQuote
                    key={item.diaryQuoteId}
                    diaryQuoteId={item.diaryQuoteId}
                    diaryQuote={item.diaryQuote}
                  />
                ))}
              {updateQuote.length === 0 && (
                <Space>
                  <SpaceImg src={noquote} alt="" />
                  <Word>來記下你的有感對白～</Word>
                </Space>
              )}
            </QuoteDiv>
          </QuoteContainer>
        </SectionDiv>
        <SectionDiv>
          <FunctionHead>
            <Title>我的日記</Title>
          </FunctionHead>
          <Function>
            <FunctionBtn onClick={addNewDiary}>
              <DiaryIcon /> 新增日記
            </FunctionBtn>
          </Function>
          <DiaryWrapper>
            {updateDiary.length > 0 &&
              updateDiary.map((item) => (
                <DiaryBlock
                  key={item.diaryDataId}
                  diaryDataId={item.diaryDataId}
                  diaryNote={item.diaryNote}
                  date={item.date}
                />
              ))}
            {updateDiary.length === 0 && (
              <Space>
                <SpaceImg src={diary} alt="" />
                <Word>來寫新的日誌吧！</Word>
              </Space>
            )}
          </DiaryWrapper>
        </SectionDiv>
      </MovieMain>
      <TrailerPopup
        trailerKey={eachMovie.trailerKey}
        trigger={showTrailer}
        setTrigger={setShowTrailer}
      />
      <Background img={eachMovie.poster} />
    </DiaryContainer>
  );
}
