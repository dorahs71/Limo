import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import AOS from 'aos';
import { StarRounded, LiveTv, Chat, HowToVote } from '@material-ui/icons';
import rank1 from '../images/1.png';
import rank2 from '../images/2.png';
import rank3 from '../images/3.png';
import NewComment from '../components/NewComment';
import Comment from '../components/Comment';
import AddToList from '../components/AddToList';
import TrailerPopup from '../components/TrailerPopup';
import Poll from '../components/Poll';
import Card from '../components/Card';
import CoinAlert from '../components/CoinAlert';
import MovieList from '../components/MovieList';
import card from '../images/card.png';
import voting from '../images/voting.png';
import nodiscuss from '../images/nodiscuss.png';
import WarningAlert from '../components/WarningAlert';
import SuccessAlert from '../components/SuccessAlert';
import movielist from '../images/movielist.png';
import moviediary from '../images/moviediary.png';

const MovieDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 80vmin;
  opacity: 0.5;
  overflow: visible;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10vmin;
    background: linear-gradient(to top, #2b2929, transparent);
    z-index: 10;
  }
`;

const Zoom = styled.img`
  display: inline-block;
  width: 100%;
  height: 80vmin;
  top: 0;
  left: 0;
  transform: scale(1);
  opacity: 0.2;
  transition: 1s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const HeadPic = styled.div`
  overflow: hidden;
  margin: 0;
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
  margin-top: -55%;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1280px) {
    margin-top: -40%;
  }
`;

const PosterImg = styled.img`
  z-index: 5;
  width: 50vmin;
  height: 60vmin;
  box-shadow: 2px 2px 19px 2px rgba(20, 19, 19, 1);
  @media (max-width: 1280px) {
    height: 60vmin;
  }
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
  /* flex-direction: column; */
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

const CardInfo = styled.div`
  width: 130%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
`;

const ListInfo = styled.div`
  width: 130%;
  color: #fff;
  padding: 5px;
  font-weight: 500;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
`;

const DiaryInfo = styled.div`
  width: 130%;
  font-weight: 500;
  color: #fff;
  padding: 5px;
  margin-top: 2vmin;
  background: #292a28;
  margin-right: 2vmin;
  display: none;
`;

const DiaryInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${DiaryInfo} {
    display: block;
  }
`;

const CardInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${CardInfo} {
    display: block;
  }
`;

const ListInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 5vmin;
  &:hover ${ListInfo} {
    display: block;
  }
`;

const AddButtonDiv = styled.div`
  width: 60%;
  display: grid;
  margin-top: 6.5vmin;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 50px;
`;

const AddDiary = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
  &:hover ${DiaryInfo} {
    display: flex;
  }
`;

const AddCard = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
`;

const AddList = styled.div`
  border: 1px solid #fff;
  transform: scale(1.5);
  border-radius: 50%;
  padding: 1vmin;
  margin-right: 2vmin;
  cursor: pointer;
  &:hover {
    background: #898f86;
  }
`;

const IconImg = styled.img`
  width: 3vmin;
  height: 3vmin;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 5vmin;
  position: relative;
  background: linear-gradient(to bottom, #2a2929, #2b2929);
`;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3vmin;
  text-align: center;
  width: -webkit-fill-available;
  align-items: center;
`;

const Story = styled.div`
  font-size: 2.5vmin;
  margin-top: 5vmin;
`;

const Title = styled.div`
  margin-top: 10vmin;
  font-size: 4.5vmin;
  font-weight: 700;
  width: 20vmin;
  border-bottom: 8px solid #61d498;
`;

const Cast = styled.div`
  display: grid;
  margin-top: 5vmin;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px 0px;
  width: 100%;
`;

const ActorDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActorImg = styled.img`
  width: 15vmin;
  height: 16vmin;
  border-radius: 40%;
`;

const ActorName = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
  font-weight: 700;
  @media (max-width: 1280px) {
    font-weight: 500;
  }
`;

const EnName = styled.div`
  font-size: 2vmin;
  font-weight: 500;
  color: #c5cdc0;
`;

const QuoteContainer = styled.div`
  display: flex;
  margin-top: 2.5vmin;
  flex-direction: column;
  align-items: center;
`;

const QuoteDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5vmin;
`;

const FunctionBtn = styled.div`
  padding: 1.2vmin 1vmin;
  margin-top: -3vmin;
  width: 13vmin;
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

const VoteIcon = styled(HowToVote)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(0.9);
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

const RankDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Quote = styled.div`
  font-size: 3vmin;
  font-weight: 700;
  margin-left: 3vmin;
  text-align: justify;
  border-bottom: 1px solid #bed8bf;
  /* @media (max-width: 1280px) {
    font-size: 25px;
  } */
`;

const Ranking = styled.img`
  width: 10vmin;
  height: 10vmin;
  margin-left: 2vmin;
`;

const RankNo1 = styled.div`
  font-size: 4.5vmin;
  font-family: 'Original Surfer', cursive;
  color: #fbc500;
`;

const RankNo2 = styled.div`
  font-size: 4.5vmin;
  font-family: 'Original Surfer', cursive;
  /* margin-top: 3vmin; */
  color: #c4c4c4;
`;

const RankNo3 = styled.div`
  font-size: 4.5vmin;
  font-family: 'Original Surfer', cursive;
  /* margin-top: 3vmin; */
  color: #b9856f;
`;

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5vmin;
`;

const ChatIcon = styled(Chat)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(0.9);
  }
`;

const Space = styled.div`
  width: 100%;
  height: 20vmin;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SpaceImg = styled.img`
  width: 12vmin;
  height: 11vmin;
`;

const Word = styled.div`
  margin-top: 3vmin;
  font-size: 2.5vmin;
`;

export default function Movie() {
  useEffect(() => {
    setTimeout(function () {
      AOS.init();
    }, 1200);
  }, []);

  const { movieId } = useParams();
  const [eachMovie, setEachMovie] = useState('');
  const [showNewComment, setShowNewComment] = useState(false);
  const [showAddToList, setShowAddToList] = useState(false);
  const [listName, setListName] = useState('');
  const [diaryList, setDiaryList] = useState('');
  const [comment, setComment] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [voteResult, setVoteResult] = useState('');
  const [showCoinComment, setShowCoinComment] = useState(false);
  const [showCoinReview, setShowCoinReview] = useState(false);
  const [ownDiaryAlert, setOwnDiaryAlert] = useState(false);
  const [addDiaryAlert, setAddDiaryAlert] = useState(false);
  const [addListAlert, setAddListAlert] = useState(false);
  const [sendCardAlert, setSendCardAlert] = useState(false);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Diaries')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setDiaryList(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid]);

  const addDiary = () => {
    const userDiary = [];

    diaryList?.map((item) => {
      userDiary.push(item.movieId);
      return userDiary;
    });

    if (userDiary.includes(movieId)) {
      setOwnDiaryAlert(true);
    } else {
      const docRef = firestore
        .collection('Users')
        .doc(uid)
        .collection('Diaries')
        .doc();
      docRef.set({
        diaryId: docRef.id,
        movieId,
        poster: eachMovie.poster,
        chTitle: eachMovie.chTitle,
        date: new Date(),
      });
      setAddDiaryAlert(true);
    }
  };

  const addListName = () => {
    setShowAddToList(true);
    let isMounted = true;
    firestore
      .collection('Lists')
      .where('authorId', '==', uid)
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setListName(data);
      });
    return () => {
      isMounted = false;
    };
  };

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .doc(movieId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        if (isMounted) setEachMovie(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Comments')
      .where('movieId', '==', movieId)
      .orderBy('date', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setComment(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Quotes')
      .orderBy('votes', 'desc')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setVoteResult(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <MovieDiv>
        <BackgroundDiv>
          <HeadPic>
            {eachMovie !== '' && <Zoom src={eachMovie.gallery[0]} alt="" />}
          </HeadPic>
        </BackgroundDiv>
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
              <AddButtonDiv>
                <DiaryInfoDiv>
                  <AddDiary onClick={addDiary}>
                    <IconImg src={moviediary} alt="" />
                  </AddDiary>
                  <DiaryInfo>加入日誌</DiaryInfo>
                </DiaryInfoDiv>
                <CardInfoDiv>
                  <AddCard onClick={() => setShowCard(true)}>
                    <IconImg src={card} alt="" />
                  </AddCard>
                  <CardInfo>寄送小卡</CardInfo>
                </CardInfoDiv>
                <ListInfoDiv>
                  <AddList onClick={addListName}>
                    <IconImg src={movielist} alt="" />
                  </AddList>
                  <ListInfo>加入片單</ListInfo>
                </ListInfoDiv>
              </AddButtonDiv>
            </IntroDiv>
          </MovieIntro>
          <Card
            trigger={showCard}
            setTrigger={setShowCard}
            poster={eachMovie.poster}
            gallery={eachMovie.gallery}
            setSendCardAlert={setSendCardAlert}
          />
          <TopDiv />
          <AddToList
            trigger={showAddToList}
            setTrigger={setShowAddToList}
            movie={eachMovie}
            listName={listName}
            setAddListAlert={setAddListAlert}
          />
          <SectionDiv>
            <Title data-aos="fade-up">劇情簡介</Title>
            <Story data-aos="fade-up">{eachMovie.story}</Story>
          </SectionDiv>
          <SectionDiv>
            <Title data-aos="fade-up">演員列表</Title>
            <Cast>
              {eachMovie.cast?.map((item) => (
                <ActorDiv key={item.chActor}>
                  <ActorImg src={item.actorImg} alt="" />
                  <ActorName>
                    {item.chActor}
                    <EnName>{item.enActor || ''}</EnName>
                  </ActorName>
                </ActorDiv>
              ))}
            </Cast>
          </SectionDiv>
          <SectionDiv>
            <FunctionHead>
              <Title>經典對白</Title>
            </FunctionHead>
            <Function>
              <FunctionBtn onClick={() => setShowVote(true)}>
                <VoteIcon /> 參加投票
              </FunctionBtn>
            </Function>

            <QuoteContainer>
              {voteResult[0] ? (
                <QuoteDiv>
                  <RankDiv>
                    <RankNo1>No.</RankNo1>
                    <Ranking src={rank1} alt="" />
                  </RankDiv>
                  <Quote>{voteResult[0].option}</Quote>
                </QuoteDiv>
              ) : (
                <Space>
                  <SpaceImg src={voting} alt="" />
                  <Word>寫下你/妳認為的經典對白，開啟投票吧！</Word>
                </Space>
              )}
              {voteResult[1] ? (
                <QuoteDiv>
                  <RankDiv>
                    <RankNo2>No.</RankNo2>
                    <Ranking src={rank2} alt="" />
                  </RankDiv>
                  <Quote>{voteResult[1].option}</Quote>
                </QuoteDiv>
              ) : (
                ''
              )}
              {voteResult[2] ? (
                <QuoteDiv>
                  <RankDiv>
                    <RankNo3>No.</RankNo3>
                    <Ranking src={rank3} alt="" />
                  </RankDiv>
                  <Quote>{voteResult[2].option}</Quote>
                </QuoteDiv>
              ) : (
                ''
              )}
            </QuoteContainer>
          </SectionDiv>

          <SectionDiv>
            <Title>相關片單</Title>
            <MovieList />
          </SectionDiv>
          <SectionDiv>
            <FunctionHead>
              <Title>網友評論</Title>
            </FunctionHead>
            <Function>
              <FunctionBtn onClick={() => setShowNewComment(true)}>
                <ChatIcon /> 新增評論
              </FunctionBtn>
            </Function>
            <CommentDiv>
              {comment.length === 0 && (
                <Space>
                  <SpaceImg src={nodiscuss} alt="" />
                  <Word>來分享你對這部電影的想法吧！</Word>
                </Space>
              )}

              {comment.map((item) => (
                <Comment
                  key={item.commentId}
                  commentId={item.commentId}
                  authorId={item.authorId}
                  date={item.date}
                  rate={item.rate}
                  comment={item.comment}
                  reviews={item.reviews}
                  smileBy={item.smileBy}
                  showCoin={setShowCoinReview}
                />
              ))}
              {/* <ReadMore>點我看更多</ReadMore> */}
            </CommentDiv>
          </SectionDiv>
        </MovieMain>
        <NewComment
          trigger={showNewComment}
          setTrigger={setShowNewComment}
          poster={eachMovie.poster}
          chTitle={eachMovie.chTitle}
          showCoin={setShowCoinComment}
        />
        <TrailerPopup
          trailerKey={eachMovie.trailerKey}
          trigger={showTrailer}
          setTrigger={setShowTrailer}
        />
      </MovieDiv>
      <Poll trigger={showVote} setTrigger={setShowVote} />
      <CoinAlert
        trigger={showCoinComment}
        setTrigger={setShowCoinComment}
        type={'評論'}
        coin={100}
      />
      <CoinAlert
        trigger={showCoinReview}
        setTrigger={setShowCoinReview}
        type={'留言'}
        coin={30}
      />
      <WarningAlert
        trigger={ownDiaryAlert}
        setTrigger={setOwnDiaryAlert}
        message={'這部電影已經加入日誌囉!'}
      />
      <SuccessAlert
        trigger={addDiaryAlert}
        setTrigger={setAddDiaryAlert}
        message={'電影已經成功加入日誌～'}
      />
      <SuccessAlert
        trigger={addListAlert}
        setTrigger={setAddListAlert}
        message={'電影已經成功加入片單～'}
      />
      <SuccessAlert
        trigger={sendCardAlert}
        setTrigger={setSendCardAlert}
        message={'小卡成功送出囉！'}
      />
    </>
  );
}
