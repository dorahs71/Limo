import styled from 'styled-components';
import { useState, useEffect } from 'react';
import trailer from '../videos/trailer.mp4';
import { Link } from 'react-router-dom';
import { InfoOutlined, Favorite, StarRounded } from '@material-ui/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import Coverflow from '../components/Coverflow';
import Tilt from 'react-parallax-tilt';
import { firestore } from '../utils/firebase';
import Slick from '../components/Slick';

const VideoDiv = styled.div`
  top: 0;
  width: 100%;
  object-fit: contain;
  &:after {
    content: '';
    position: absolute;
    bottom: -20vmin;
    right: 0;
    width: 100%;
    height: 40vmin;
    background: linear-gradient(to bottom, transparent, #2b2929, #2b2929);
    /* background: #2b2929; */
  }
  @media (max-width: 1200px) {
    &:after {
      height: 0vmin;
      background: transparent;
    }
  }
`;

const Video = styled.video`
  top: 0;
  width: 100%;
  height: 100%;
  position: relative;
`;

const TrailerDiv = styled.div`
  position: absolute;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  text-align: justify;
  z-index: 100;
  margin-left: 6vmin;
  margin-top: -40vmin;
  text-shadow: 2px 2px #778899;
  max-width: 50vmin;
  @media (max-width: 850px) {
    margin-top: -30vmin;
    max-width: 40vmin;
  }
  @media (max-width: 500px) {
    margin-top: -35vmin;
  }
`;

const TrailerTitle = styled.div`
  font-size: 5vmin;
  @media (max-width: 850px) {
    font-size: 4vmin;
  }
  @media (max-width: 500px) {
    font-size: 3vmin;
  }
`;

const TrailerIntro = styled.div`
  font-size: 3vmin;
  @media (max-width: 850px) {
    font-size: 2vmin;
  }
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const TrailerLink = styled(Link)`
  text-decoration: none;
  width: 20vmin;
  height: 6vmin;
  color: #515151;
`;

const TrailerBtn = styled.div`
  /* margin-top: 1vmin; */
  width: 20vmin;
  height: 6vmin;
  z-index: 10;
  margin-top: 2vmin;
  font-size: 2.5vmin;
  font-weight: 450;
  color: #515151;
  background: #62d498;
  padding: 5px 5px;
  border-radius: 10px;
  text-shadow: none;
  border: 0;
  outline: 0;
  line-height: 50px;
  display: flex;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #8aefba;
    color: #fff;
  }
  @media (max-width: 850px) {
    font-size: 2vmin;
    width: 18vmin;
    height: 5vmin;
  }
  @media (max-width: 500px) {
    width: 23vmin;
  }
`;

const InfoIcon = styled(InfoOutlined)`
  transform: scale(1.4);
  margin-right: 1vmin;
  @media (max-width: 850px) {
    transform: scale(1);
  }
  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;

const MainDiv = styled.div`
  max-width: 1560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* @media (min-width: 1290px) {
    max-width: 1280px;
  } */
`;

const IndexDiv = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin-top: 5vmin;
  font-size: 4.5vmin;
  font-weight: 700;
  width: 18vmin;
  border-bottom: 8px solid #61d498;
`;

const ListSection = styled.div`
  margin-top: 10vmin;
  display: flex;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 3px;
  justify-items: center;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const List = styled.div`
  margin: 0 auto;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 48vmin;
  height: 40vmin;
  cursor: pointer;
  text-align: center;
  justify-content: space-between;
  background: rgba(223, 223, 223, 0.9);
  /* background: #292727; */
  box-shadow: 1vmin 1vmin 2vmin rgba(20, 19, 19, 1);
  &:hover {
    /* transform: scale(1.1); */
  }
  @media (max-width: 1280px) {
    height: 40vmin;
  }
`;

const ThemeList = styled.div`
  display: flex;
`;

const ListImg = styled.img`
  width: 16vmin;
  height: 20vmin;
  object-fit: cover;

  @media (max-width: 1280px) {
    width: 16vmin;
    height: 25vmin;
  }
`;

const ListIntro = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  /* justify-content: space-evenly; */
  background: #4e524c;
  height: 5vmin;
  padding: 1vmin 0;
`;

const ListTitle = styled.div`
  font-size: 2.5vmin;
  font-weight: 450;
  /* margin-top: 20vmin; */
  align-self: center;
  color: #333;
  /* margin-left: 3vmin; */
`;

const CollectNum = styled.div`
  border-left: 2px solid #c5cdc0;
  font-size: 2vmin;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const Love = styled(Favorite)`
  color: #f08080;
  margin-right: 1vmin;
  @media (max-width: 500px) {
    transform: scale(0.6);
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
  width: 3.5vmin;
  height: 3.5vmin;
  margin-right: 1vmin;
`;

const ListProfileName = styled.div`
  font-size: 2vmin;
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const TiltDiv = styled(Tilt)`
  width: 48vmin;
  cursor: pointer;
  margin-bottom: 3vmin;
  /* @media (max-width: 1280px) {
    width: 66vmin;
  } */
`;

const CategorySection = styled.div`
  margin-top: 10vmin;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 50px 0px;
  width: 100%;
`;

const CardSection = styled.div`
  margin-top: 5vmin;
  justify-items: center;
  margin-bottom: 5vmin;
  margin-bottom: 15vmin;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5vmin 3px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    margin-bottom: 15vmin;
    grid-gap: 15vmin 3px;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1);
  color: gold;
  margin-right: 3px;
  @media (max-width: 500px) {
    transform: scale(0.6);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  margin-top: 3vmin;
  display: flex;
  width: 25vmin;
  height: 35vmin;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: 1.5s ease-in-out;
  transform-style: preserve-3d;

  @media (max-width: 1280px) {
    width: 25vmin;
    height: 30vmin;
  }
  @media (max-width: 600px) {
    width: 25vmin;
    height: 30vmin;
  }
`;

const RecentCard = styled.div`
  margin-top: 3vmin;
  display: flex;
  width: 25vmin;
  height: 35vmin;
  position: relative;
  transition: 0.7s ease-in-out;
  transform-style: preserve-3d;
  &:hover {
    transform: rotateY(180deg);
  }
  @media (max-width: 1280px) {
    width: 30vmin;
    height: 35vmin;
  }
  @media (max-width: 600px) {
    width: 25vmin;
    height: 30vmin;
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

  @media (max-width: 600px) {
    font-size: 1.5vmin;
    height: 9vmin;
  }
  @media (max-width: 450px) {
    height: 12vmin;
  }
`;

const BackTitle = styled.div`
  font-size: 2.5vmin;
  font-weight: 450;
  margin-bottom: 1vmin;
  margin-top: 1vmin;
`;

const RecentRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-top: 1vmin; */
`;

const BackIntro = styled.div`
  background: rgba(20, 20, 20, 0.8);
  font-size: 1.8vmin;
  width: 93.2%;
  height: 95%;
  padding: 1vmin;
  font-weight: 350;
`;

const BackWord = styled.p`
  overflow: hidden;
  white-space: normal;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 8;
  font-size: 2vmin;
`;

const CategoryWrapper = styled.div`
  width: 40vmin;
  height: 25vmin;
  /* border: 1px solid var(--background-color); */
  border-radius: 1.6rem;
  padding: 4rem;
  display: flex;
  align-items: flex-end;
  position: relative;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  transform: rotateX(calc(var(--rX) * 1deg)) rotateY(calc(var(--rY) * 1deg));
  background: linear-gradient(hsla(0, 0%, 100%, 0.1), hsla(0, 0%, 100%, 0.1)),
    url('https://imgs.gvm.com.tw/upload/gallery/20200313/71567_00.jpg');
  background-position: var(--bX) var(--bY);
  background-size: cover;
  box-shadow: 0 0 3rem 0.5rem hsla(0, 0%, 0%, 0.2);
  transition: transform 0.6s 1s;
  /* filter: hue-rotate(20deg) saturate(140%); */
  filter: saturate(40%);
  &:hover {
    filter: hue-rotate(20deg) saturate(50%);
  }
`;

const ListLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

export default function Index() {
  const [showParallax, setShowParallax] = useState([]);
  const [movies, setMovies] = useState([]);
  const [getUser, setGetUser] = useState('');
  const [getList, setGetList] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Movies')
      .where('date', '>', '2021/11/22')
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
    let isMounted = true;
    firestore
      .collection('Lists')
      .where('listShare', '==', true)
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setGetList(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    let isMounted = true;
    firestore.collection('Users').onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      if (isMounted) setGetUser(data);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  let userArr = [];
  let popularList = [];
  let newList = [];

  if (getList !== '') {
    newList = getList
      .sort(function (a, b) {
        return a.collect.length - b.collect.length;
      })
      .reverse()
      .slice(0, 4);
  }

  if (getUser && newList) {
    newList.map((list) => {
      const authorData = getUser.find((x) => x.uid === list.authorId);
      userArr.push(authorData);
      return authorData;
    });
  }

  if (newList.length > 0 && userArr.length > 0) {
    popularList = newList.map((item, i) => Object.assign({}, item, userArr[i]));
  }

  return (
    <>
      {/* <VideoSec> */}
      <VideoDiv>
        <Video autoPlay muted loop>
          <source src={trailer} type="video/mp4" />
        </Video>

        <TrailerDiv>
          <TrailerTitle>駭客任務：復活</TrailerTitle>
          <TrailerIntro>
            睽違17年，2020開拍，基努李維、凱莉安摩絲回歸演出
            「尼歐」與「崔妮蒂」，延續人類與機器人的戰爭。
          </TrailerIntro>
          <TrailerLink to={'/movie/gmAKlYPKrYgwSdBHuMng'}>
            <TrailerBtn>
              <InfoIcon />
              更多資訊
            </TrailerBtn>
          </TrailerLink>
        </TrailerDiv>
      </VideoDiv>
      {/* </VideoSec> */}
      <MainDiv>
        <IndexDiv>
          <Title data-aos="fade-up">網友推薦</Title>
          <Slick />
          {/* <Coverflow /> */}
          {/* <CoverflowBg /> */}
          {/* <MovieRate slides={movies} /> */}
          <Title data-aos="fade-up">精選片單</Title>

          <ListSection>
            {popularList !== '' &&
              popularList.map((item) => {
                return (
                  <ListLink to={`/list/${item.listId}`} key={item.listId}>
                    <TiltDiv
                      glareEnable={true}
                      glareMaxOpacity={0.8}
                      glareColor="#ffffff"
                      glarePosition="bottom"
                      // glareBorderRadius="20px"
                    >
                      <List>
                        <ThemeList>
                          {item.listPosters[2] !== undefined && (
                            <ListImg src={item.listPosters[2]} alt=""></ListImg>
                          )}
                          {item.listPosters[1] !== undefined && (
                            <ListImg src={item.listPosters[1]} alt=""></ListImg>
                          )}
                          {item.listPosters[0] !== undefined && (
                            <ListImg src={item.listPosters[0]} alt=""></ListImg>
                          )}
                        </ThemeList>

                        <ListTitle>{item.listTitle}</ListTitle>
                        <ListIntro>
                          <ListProfileDiv>
                            <ListProfileImg src={item.profileImg} alt="" />
                            <ListProfileName>{item.userName}</ListProfileName>
                          </ListProfileDiv>
                          <CollectNum>
                            <Love />
                            {item.collect?.length || 0}
                          </CollectNum>
                        </ListIntro>
                      </List>
                    </TiltDiv>
                  </ListLink>
                );
              })}
          </ListSection>

          {/* <Title data-aos="fade-up">主題分類</Title>
        <CategorySection>
          action, drama, animation:http://img5.mtime.cn/mg/2019/06/28/122400.90180580.jpg, advanture:https://www.porticomedia.com/sites/default/files/photo_Mummy3.jpg, sci-fi:https://cdn2.ettoday.net/images/4339/4339819.jpg , comedy
          <CategoryWrapper></CategoryWrapper>
        </CategorySection> */}

          <Title data-aos="fade-up">近期上映</Title>
          <CardSection>
            {showParallax.map((movie) => {
              return (
                <CardLink to={`/movie/${movie.movieId}`} key={movie.movieId}>
                  <RecentCard>
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
                        <BackWord>{movie.story}</BackWord>
                      </BackIntro>
                    </BackSide>
                  </RecentCard>
                </CardLink>
              );
            })}
          </CardSection>
        </IndexDiv>
      </MainDiv>
    </>
  );
}
