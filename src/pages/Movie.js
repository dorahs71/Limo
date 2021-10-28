import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, auth } from '../utils/firebase';
import AOS from 'aos';
import { StarRounded, LiveTv, Favorite } from '@material-ui/icons';
import diary from '../images/diary.png';
import list from '../images/list.png';
import smile from '../images/smile.png';
import rank1 from '../images/rank1.png';
import rank2 from '../images/rank2.png';
import rank3 from '../images/rank3.png';
import rank4 from '../images/rank4.png';
import rank5 from '../images/rank5.png';
import vote from '../images/vote.png';
import comment from '../images/comment.png';
import NewComment from '../components/NewComment';
import Comment from '../components/Comment';

const MovieDiv = styled.div`
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
  /* clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%); */
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

const Date = styled.div`
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
  padding: 30px 30px;
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

const AddButtonDiv = styled.div`
  display: flex;
  margin-top: 3vmin;
  justify-content: space-around;
`;

const AddButton = styled.img`
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  border: 4px outset #daffcc;
  cursor: pointer;
  margin-left: 2vmin;
`;

const CastDiv = styled.div`
  background: #111;
  text-align: center;
`;

const Cast = styled.div`
  height: 50vmin;
  margin-top: 6vmin;
  display: flex;
  flex-wrap: wrap;
  padding: 4vmin;
  justify-content: space-evenly;
`;

const ActorDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActorImg = styled.img`
  width: 20vmin;
  height: 22vmin;
  border-radius: 50% 30px;
  @media (max-width: 1280px) {
  }
`;

const ActorName = styled.div`
  margin-top: 5vmin;
  font-size: 25px;
  font-weight: 700;
  @media (max-width: 1280px) {
    font-size: 23px;
    font-weight: 500;
  }
`;

const QuoteSection = styled.div`
  background: #111;
  text-align: center;
`;

const Shake = keyframes`
 20% { transform: translate(-5px, 2px) rotate(1deg); }
  30% { transform: translate(5px, 2px) rotate(-1deg); }
  60% { transform: translate(-5px, 2px) rotate(1deg); }
  70% { transform: translate(5px, 2px) rotate(-1deg); }
 
`;

const VoteBtn = styled.img`
  width: 9vmin;
  height: 9vmin;
  position: absolute;
  right: 20vmin;
  cursor: pointer;
  animation: ${Shake} 2s;
  bottom: -197vmin;
  animation-iteration-count: infinite;
  border-radius: 50%;
  border: 4px outset #daffcc;
  @media (max-width: 1280px) {
    bottom: -193vmin;
  }
`;

const CommentBtn = styled.div`
  width: 8vmin;
  height: 8vmin;
  background: url(${comment}) no-repeat;
  background-size: 8vmin 8vmin;
  margin-bottom: 0;
  /* position: absolute; */
  /* margin-left: auto; */

  cursor: pointer;
  animation: ${Shake} 2s;
  animation-iteration-count: infinite;
  border-radius: 50%;
  border: 4px outset #daffcc;
  /* @media (max-width: 1280px) {
    bottom: -305vmin;
  } */
`;

const QuoteContainer = styled.div`
  margin-top: 6vmin;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  align-items: center;
`;

const QuoteDiv = styled.div`
  display: flex;
  align-items: center;
  background: #fffaf0;
  color: #333;
  margin-bottom: 3vmin;
  width: 80%;
`;

const Quote = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-left: 3vmin;
  border-left: 8px solid #75e799;
  @media (max-width: 1280px) {
    font-size: 25px;
  }
`;

const Ranking = styled.img`
  width: 20vmin;
  height: 14vmin;
  margin-left: 10vmin;
`;

const RankingSmall = styled.img`
  width: 12vmin;
  height: 12vmin;
  margin-left: 14vmin;
  margin-right: 4vmin;
`;

const CommentSection = styled.div`
  padding: 10px;
  background: linear-gradient(#111, #add8e6, #add8e6);
`;

const CommentDiv = styled.div`
  width: 100%;
  height: 50vmin;
  /* margin-top: 6vmin; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
`;

const ReadMore = styled.div`
  width: 10%;
  height: 5vmin;
  text-align: center;
  margin-top: 5vmin;
  font-size: 25px;
  font-weight: 500;
  border-radius: 10px;
  padding: 15px;
  color: #fff;
  background: linear-gradient(to right, #75e799, #66cdaa);
  cursor: pointer;
  &:hover {
    background: linear-gradient(to left, #87cefa, #66cdaa);
    color: #777;
  }
`;

const ListSection = styled.div`
  background: linear-gradient(#add8e6, #111, #111);
  padding: 30px 60px;
  text-align: center;
  margin-bottom: 10vmin;
`;

const ListDiv = styled.div`
  margin-top: 6vmin;
  display: flex;
`;

const List = styled.div`
  cursor: pointer;
  margin-left: 5vmin;
  width: 45vmin;
  height: 55vmin;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #fffaf0, #4682b4);
  @media (max-width: 1280px) {
    width: 45vmin;
    height: 60vmin;
  }
`;

const OneList = styled.div`
  position: relative;
  color: #333;
  width: 330px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 60px 50px;
  margin-left: 6vmin;
  @media (max-width: 1280px) {
    width: 250px;
    height: 230px;
    margin: 30px 30px;
  }
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 12rem;
  height: 14rem;
  right: 0px;
  z-index: 3;
  box-shadow: 1px 1px 10px 1px;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 12rem;
  height: 14rem;
  right: 50px;
  z-index: 4;
  box-shadow: 1px 1px 10px 1px;
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 12rem;
  height: 14rem;
  right: 100px;
  z-index: 5;
  box-shadow: 1px 1px 10px 1px #333;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListTitle = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin-left: 3vmin;
  @media (max-width: 1280px) {
    font-size: 23px;
    color: #222;
  }
`;

const CollectNum = styled.div`
  font-size: 28px;
  font-weight: 400;
  color: #222;
  @media (max-width: 1280px) {
    font-size: 24px;
  }
`;

const Love = styled(Favorite)`
  transform: scale(1.8);
  color: #f08080;
  margin-left: 2vmin;
  @media (max-width: 1280px) {
    transform: scale(1.5);
  }
`;

const ListProfileDiv = styled.div`
  margin-top: 2vmin;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListProfileImg = styled.img`
  width: 10vmin;
  height: 8vmin;
  @media (max-width: 1280px) {
    width: 13vmin;
    height: 10vmin;
  }
`;
const ListProfileName = styled.div`
  color: #222;
  font-size: 23px;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const actor =
  'https://image.agentm.tw/images/artist/cde67e4f-8133-423e-8970-bac2bf8a4680.jpg';

export default function Movie() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const { movieId } = useParams();
  const [eachMovie, setEachMovie] = useState('');
  const [showNewComment, setShowNewComment] = useState(false);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    firestore
      .collection('Movies')
      .doc(movieId)
      .get()
      .then((docSnapshot) => {
        const data = docSnapshot.data();
        console.log(data.gallery[0]);
        setEachMovie(data);
      });
  }, []);

  useEffect(() => {
    firestore
      .collection('Movies')
      .doc(movieId)
      .collection('Comments')
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((docSnapshot) => {
          return docSnapshot.data();
        });
        setComment(data);
      });
  }, []);

  return (
    <MovieDiv>
      <BackgroundDiv>
        <HeadPic>
          {eachMovie !== '' && <Zoom src={eachMovie.gallery[0]} alt="" />}
          {/* <Zoom src={eachMovie?.gallery[0]} alt=''/>  */}
        </HeadPic>
      </BackgroundDiv>
      <MovieIntro>
        <PosterDiv>
          <PosterImg src={eachMovie.poster} alt="" data-aos="fade-right" />
          <PosterSquare data-aos="fade-right" />
        </PosterDiv>
        <IntroDiv data-aos="fade-up">
          <ChTitle>{eachMovie.chTitle}</ChTitle>
          <EnTitle>{eachMovie.enTitle}</EnTitle>
          <Rate>
            評分：
            <Star />
            {eachMovie.rate}/ {eachMovie.rateNum}人
          </Rate>
          <Date>上映日期：{eachMovie.date}</Date>
          <Length>片長：{eachMovie.length}</Length>
          <Director>導演：{eachMovie.director}</Director>
          <TrailerButton>
            <TrailerIcon />
            <Trailer> 我想看預告片</Trailer>
          </TrailerButton>
          <AddButtonDiv>
            <AddButton src={diary} alt="" />
            <AddButton src={smile} alt="" />
            <AddButton src={list} alt="" />
          </AddButtonDiv>
        </IntroDiv>
      </MovieIntro>
      <TopDiv />
      <StoryDiv>
        <StoryTitle data-aos="fade-up">劇情簡介</StoryTitle>
        <Story data-aos="fade-up">{eachMovie.story}</Story>
      </StoryDiv>
      <CastDiv>
        <Title>演員列表</Title>
        <Cast>
          <ActorDiv>
            <ActorImg src={actor} alt="" />
            <ActorName>
              蘿拉伯恩 <br />
              Laura Birn
            </ActorName>
          </ActorDiv>
          <ActorDiv>
            <ActorImg src={actor} alt="" />
            <ActorName>
              蘿拉伯恩 <br />
              Laura Birn
            </ActorName>
          </ActorDiv>
        </Cast>
      </CastDiv>
      <QuoteSection>
        <Title>經典對白</Title>
        <VoteBtn src={vote} alt="" />
        <QuoteContainer>
          <QuoteDiv>
            <Ranking src={rank1} alt="" />
            <Quote>偉大的人不追求成為領導者，而是時勢造就</Quote>
          </QuoteDiv>
          <QuoteDiv>
            <Ranking src={rank2} alt="" />
            <Quote>偉大的人不追求成為領導者，而是時勢造就</Quote>
          </QuoteDiv>
          <QuoteDiv>
            <Ranking src={rank3} alt="" />
            <Quote>偉大的人不追求成為領導者，而是時勢造就</Quote>
          </QuoteDiv>
          <QuoteDiv>
            <RankingSmall src={rank4} alt="" />
            <Quote>偉大的人不追求成為領導者，而是時勢造就</Quote>
          </QuoteDiv>
          <QuoteDiv>
            <RankingSmall src={rank5} alt="" />
            <Quote>偉大的人不追求成為領導者，而是時勢造就</Quote>
          </QuoteDiv>
        </QuoteContainer>
      </QuoteSection>
      <CommentSection>
        <CommentHead>
          <Title>網友評論</Title>
          <CommentBtn onClick={() => setShowNewComment(true)} />
        </CommentHead>
        <NewComment trigger={showNewComment} setTrigger={setShowNewComment} />
        <CommentDiv>
          {comment.map((item) => (
            <Comment
              key={item.commentId}
              commentId={item.commentId}
              authorImg={item.authorImg}
              authorName={item.authorName}
              date={item.date}
              rate={item.rate}
              comment={item.comment}
              smileBy={item.smileBy}
            />
          ))}
          <ReadMore>點我看更多</ReadMore>
        </CommentDiv>
      </CommentSection>
      <ListSection>
        <Title>相關片單</Title>
        <ListDiv>
          <List>
            <OneList>
              <ThemeList>
                <ListCh1
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/PSMRVeKvNsmfh8g5tUTB-756x1080.jpg"
                  alt=""
                ></ListCh1>
                <ListCh2
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/vZUOqQeQSvy1ryr9fxjw-729x1080.jpg"
                  alt=""
                ></ListCh2>
                <ListCh3
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/FdF8AKC2OMVSotuOHVuN-756x1080.jpg"
                  alt=""
                ></ListCh3>
              </ThemeList>
              <ListTitle>好想好想出國玩片單</ListTitle>
            </OneList>
            <CollectNum>
              430
              <Love />
            </CollectNum>
            <ListProfileDiv>
              <ListProfileImg
                src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=7e617ed2-9a96-4192-8847-c07d8f642228"
                alt=""
              />
              <ListProfileName>我是魯拉拉</ListProfileName>
            </ListProfileDiv>
          </List>
          <List></List>
          <List></List>
        </ListDiv>
      </ListSection>
    </MovieDiv>
  );
}
