import styled from 'styled-components';
import { useState, useEffect } from 'react';
import trailer from '../videos/trailer.mp4';
import { Link } from 'react-router-dom';
import { InfoOutlined, Favorite, StarRounded } from '@material-ui/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Coverflow from '../components/Coverflow';
import Tilt from 'react-parallax-tilt';
import Showing from '../components/Showing';
import { firestore } from '../utils/firebase';

const VideoSec = styled.div`
  width: 100%;
  top: 0;
  position: inherit;
  object-fit: contain;
  height: 100vh;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #2b2929, #2b2929, transparent);
    z-index: 30;
  }
  @media (max-width: 1280px) {
    height: 0;
  }
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const MainDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  max-width: 1500px;
  padding: 30px 24px;
  margin: 0 auto;
  @media (max-width: 1280px) {
    margin-top: 800px;
  }
`;

const Title = styled.div`
  margin-top: 5vmin;
  font-size: 4.5vmin;
  font-weight: 700;
  width: 18vmin;
  border-bottom: 8px solid #61d498;
`;

const TrailerDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  left: 50px;
  top: 500px;
  text-shadow: 2px 2px #778899;
  max-width: 500px;
  @media (max-width: 1280px) {
    top: 300px;
  }
`;

const TrailerTitle = styled.div`
  font-size: 70px;
  @media (max-width: 1280px) {
    font-size: 56px;
  }
`;

const TrailerIntro = styled.div`
  font-size: 30px;
  @media (max-width: 1280px) {
    font-size: 24px;
  }
`;

const TrailerBtn = styled.div`
  /* margin-top: 1vmin; */
  width: 10rem;
  height: 3rem;
  z-index: 10;
  font-size: 2.5vmin;
  font-weight: bold;
  color: #515151;
  text-shadow: 0px 0px;
  background: #62d498;
  padding: 5px 5px;
  border-radius: 10px;
  border: 0;
  outline: 0;
  line-height: 50px;
  display: flex;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #8aefba;
  }
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.4);
  margin-right: 10px;
`;

const ListDiv = styled.div`
  margin-top: 10vmin;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px 0px;
  width: 100%;
`;

const List = styled.div`
  /* margin-left: 5vmin; */
  margin: 0 auto;
  width: 45vmin;
  height: 20vmin;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 45vmin;
  height: 30vmin;
  cursor: pointer;
  text-align: center;
  justify-content: space-between;
  background: rgba(223, 223, 223, 0.9);
  /* background: #292727; */
  box-shadow: 1vmin 1vmin 2vmin rgba(20, 19, 19, 1);
  &:hover {
    /* transform: scale(1.1); */
  }
`;

const ThemeList = styled.div`
  display: flex;
`;

const ListImg = styled.img`
  width: 15vmin;
  height: 18vmin;
`;

const ListIntro = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  /* justify-content: space-evenly; */
  background: #4e524c;
  height: 3vmin;
  padding: 1vmin 0;
`;

const ListTitle = styled.div`
  font-size: 2.2vmin;
  font-weight: 450;
  /* margin-top: 20vmin; */
  align-self: center;
  color: #333;
  /* margin-left: 3vmin; */
`;

const CollectNum = styled.div`
  border-left: 2px solid #c5cdc0;
  font-size: 1.8vmin;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

const Love = styled(Favorite)`
  transform: scale(1.4);
  color: #f08080;
  margin-right: 1vmin;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const ListProfileDiv = styled.div`
  cursor: pointer;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

const ListProfileImg = styled.img`
  width: 3vmin;
  height: 3vmin;
  margin-right: 1vmin;
`;

const ListProfileName = styled.div`
  font-size: 1.8vmin;
`;

const CardSection = styled.div`
  margin-top: 5vmin;
  margin-bottom: 5vmin;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 3px;
`;

const RecentCard = styled.div`
  margin-top: 3vmin;
  display: flex;
  width: 30vmin;
  height: 40vmin;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 1.5s ease-in-out;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
`;

const FrontSide = styled.div`
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  /* padding: 2vmin 5vmin; */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  z-index: 2;
  background-size: 100vh;
  background-size: cover;
  background-image: ${(props) => `url(${props.poster})`};
`;

const BackSide = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  /* padding: 2vmin 5vmin; */
  transform-style: preserve-3d;
  backface-visibility: hidden;
  background-size: cover;
  background-color: #333;
  z-index: 0;
  transform: rotateY(180deg);
  background-image: ${(props) => `url(${props.poster})`};
`;

const FrontTitle = styled.div`
  transform: translateZ(10px);
  background: rgba(20, 20, 20, 0.9);
  font-size: 2vmin;
  width: 100%;
  height: 7vmin;
  padding: 2vmin;
  word-wrap: break-word;
  font-weight: 400;
  margin-top: 98%;
`;

// const FrontTitle = styled.div`
//   transform: translateZ(10px);
//   background: rgba(20, 20, 20, 0.9);
//   font-size: 3vmin;
//   width: 100%;
//   height: 6vmin;
//   padding: 2vmin;
//   word-wrap: break-word;
//   font-weight: 300;
//   margin-top: 100%;
// `;

const BackTitle = styled.div`
  font-size: 2.5vmin;
  font-weight: 450;
  margin-bottom: 1vmin;
`;

const RecentRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1vmin;
`;

const BackIntro = styled.div`
  background: rgba(20, 20, 20, 0.8);
  font-size: 1.8vmin;
  width: 93.2%;
  height: 95%;
  padding: 1vmin;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-weight: 350;
  @media (max-width: 1280px) {
    font-size: 2vmin;
    -webkit-line-clamp: 10;
  }
`;

const TiltDiv = styled(Tilt)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-top: 3vmin;
  display: flex;
  width: 30vmin;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 1.5s ease-in-out;
  transform-style: preserve-3d;
`;

export default function Index() {
  const [showParallax, setShowParallax] = useState([]);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .where('date', '>', '2021/11/1')
      .orderBy('date')
      .limit(8)
      .get()
      .then((item) => {
        const parallaxList = item.docs.map((doc) => doc.data());
        if (isMounted) setShowParallax(parallaxList);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  function getMovies() {
    let isMounted = true;
    firestore
      .collection('Movies')
      .where('rate', '>', '6.5')
      .orderBy('rate', 'desc')
      .limit(10)
      .get()
      .then((item) => {
        const movieList = item.docs.map((doc) => doc.data());
        if (isMounted) setMovies(movieList);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return () => {
      isMounted = false;
    };
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <VideoSec>
        <Video autoPlay muted loop>
          <source src={trailer} type="video/mp4" />
        </Video>
        <TrailerDiv>
          <TrailerTitle>駭客任務：復活</TrailerTitle>
          <TrailerIntro>
            睽違17年，2020開拍，基努李維、凱莉安摩絲回歸演出
            「尼歐」與「崔妮蒂」，延續人類與機器人的戰爭。
          </TrailerIntro>
          <MyLink to={'/movie/gmAKlYPKrYgwSdBHuMng'}>
            <TrailerBtn>
              <InfoIcon />
              更多資訊
            </TrailerBtn>
          </MyLink>
        </TrailerDiv>
      </VideoSec>
      <MainDiv>
        <Title data-aos="fade-up">網友推薦</Title>
        <Coverflow />
        {/* <CoverflowBg /> */}
        {/* <MovieRate slides={movies} /> */}
        <Title data-aos="fade-up">精選片單</Title>

        <ListDiv>
          <List>
            <TiltDiv
              glareEnable={true}
              glareMaxOpacity={0.8}
              glareColor="#ffffff"
              glarePosition="bottom"
              // glareBorderRadius="20px"
            >
              <ThemeList>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/PSMRVeKvNsmfh8g5tUTB-756x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/vZUOqQeQSvy1ryr9fxjw-729x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/FdF8AKC2OMVSotuOHVuN-756x1080.jpg"
                  alt=""
                ></ListImg>
              </ThemeList>

              <ListTitle>好想好想出國玩片單</ListTitle>
              <ListIntro>
                <ListProfileDiv>
                  <ListProfileImg
                    src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
                    alt=""
                  />
                  <ListProfileName>我是魯拉拉</ListProfileName>
                </ListProfileDiv>
                <CollectNum>
                  <Love />
                  430
                </CollectNum>
              </ListIntro>
            </TiltDiv>
          </List>

          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.8}
            glareColor="#ffffff"
            glarePosition="bottom"
            // glareBorderRadius="20px"
          >
            <List>
              <ThemeList>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/PSMRVeKvNsmfh8g5tUTB-756x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/vZUOqQeQSvy1ryr9fxjw-729x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/FdF8AKC2OMVSotuOHVuN-756x1080.jpg"
                  alt=""
                ></ListImg>
              </ThemeList>

              <ListTitle>好想好想出國玩片單</ListTitle>
              <ListIntro>
                <ListProfileDiv>
                  <ListProfileImg
                    src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
                    alt=""
                  />
                  <ListProfileName>我是魯拉拉</ListProfileName>
                </ListProfileDiv>
                <CollectNum>
                  <Love />
                  430
                </CollectNum>
              </ListIntro>
            </List>
          </Tilt>

          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.8}
            glareColor="#ffffff"
            glarePosition="bottom"
            // glareBorderRadius="20px"
          >
            <List>
              <ThemeList>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/PSMRVeKvNsmfh8g5tUTB-756x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/vZUOqQeQSvy1ryr9fxjw-729x1080.jpg"
                  alt=""
                ></ListImg>
                <ListImg
                  src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/FdF8AKC2OMVSotuOHVuN-756x1080.jpg"
                  alt=""
                ></ListImg>
              </ThemeList>

              <ListTitle>好想好想出國玩片單</ListTitle>
              <ListIntro>
                <ListProfileDiv>
                  <ListProfileImg
                    src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
                    alt=""
                  />
                  <ListProfileName>我是魯拉拉</ListProfileName>
                </ListProfileDiv>
                <CollectNum>
                  <Love />
                  430
                </CollectNum>
              </ListIntro>
            </List>
          </Tilt>
        </ListDiv>

        <Title data-aos="fade-up">近期上映</Title>
        <CardSection>
          {showParallax.map((movie) => {
            return (
              <MyLink to={`/movie/${movie.movieId}`}>
                <RecentCard key={movie.movieId}>
                  <FrontSide poster={movie.poster}>
                    <FrontTitle>
                      {movie.chTitle}
                      <RecentRate>
                        <Star /> {movie.rate}
                      </RecentRate>
                    </FrontTitle>
                  </FrontSide>

                  <BackSide poster={movie.poster}>
                    <BackIntro>
                      <BackTitle>劇情簡介</BackTitle>
                      {movie.story}
                    </BackIntro>
                  </BackSide>
                </RecentCard>
              </MyLink>
            );
          })}
        </CardSection>

        {/* {showParallax.map((movie) => {
          return (
            <Showing
              key={movie.movieId}
              chTitle={movie.chTitle}
              enTitle={movie.enTitle}
              story={movie.story}
              poster={movie.poster}
              bgImg={movie.gallery[0]}
              movieId={movie.movieId}
            />
          );
        })} */}
      </MainDiv>
    </>
  );
}
