import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { auth, getOneDiary, getMainMovie } from '../utils/firebase';
import TrailerPopup from '../components/Movie/TrailerPopup';
import AOS from 'aos';
import { Theaters } from '@material-ui/icons';
import MovieIntroduction from '../components/Movie/MovieIntroduction';
import HashtagSection from '../components/Diary/HashtagSection';
import Loading from '../components/Common/Loading';
import DiaryQuoteSection from '../components/Diary/DiaryQuoteSection';
import DiaryBlockSection from '../components/Diary/DiaryBlockSection';

export default function Diary() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const { diaryId } = useParams();
  const [eachMovie, setEachMovie] = useState('');
  const [getDiary, setGetDiary] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);

  const uid = auth.currentUser?.uid;
  const history = useHistory();

  useEffect(() => {
    getOneDiary(uid, diaryId).onSnapshot((doc) => {
      const data = doc.data();
      setGetDiary(data);
      const movieId = data?.movieId;
      getMainMovie(movieId).then((doc) => {
        const movieData = doc.data();
        setEachMovie(movieData);
      });
    });
  }, [uid, diaryId]);

  // if (eachMovie === undefined) {
  //   history.push('/404');
  // }

  console.log(eachMovie);

  return eachMovie && getDiary ? (
    <DiaryContainer>
      <MovieMain>
        <MovieIntro>
          <PosterImg src={eachMovie.poster} alt="" data-aos="fade-right" />
          <IntroDiv data-aos="fade-left">
            <MovieIntroduction
              eachMovie={eachMovie}
              setShowTrailer={setShowTrailer}
            />
            <MyLink to={`/movie/${eachMovie.movieId}`}>
              <MovieLinkBtn>
                <MovieIcon /> 查看電影詳細資訊
              </MovieLinkBtn>
            </MyLink>
          </IntroDiv>
        </MovieIntro>

        <HashtagSection
          getDiary={getDiary}
          eachMovie={eachMovie}
          uid={uid}
          diaryId={diaryId}
        />

        <DiaryQuoteSection uid={uid} diaryId={diaryId} />

        <DiaryBlockSection uid={uid} diaryId={diaryId} />
      </MovieMain>
      <TrailerPopup
        trailerKey={eachMovie.trailerKey}
        trigger={showTrailer}
        setTrigger={setShowTrailer}
      />
      <Background img={eachMovie.poster} />
    </DiaryContainer>
  ) : (
    <Loading />
  );
}

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
`;

const MovieIntro = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    margin-top: 20%;
    justify-content: center;
  }
`;

const PosterImg = styled.img`
  z-index: 5;
  width: 39vmin;
  height: 58vmin;

  box-shadow: 2px 2px 19px 2px rgba(20, 19, 19, 1);
  @media (max-width: 1280px) {
    width: 42vmin;
    height: 60vmin;
  }
`;

const IntroDiv = styled.div`
  margin-left: 8vmin;
  z-index: 5;
  width: 40%;
  display: flex;
  font-weight: 500;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    align-items: center;
    justify-content: center;
    margin-top: 5vmin;
    width: 80%;
    margin-left: 0;
  }
`;

const MovieIcon = styled(Theaters)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    transform: scale(0.8);
  }
`;

const MovieLinkBtn = styled.div`
  padding: 1vw;
  margin-top: 3vmin;
  width: 20vw;
  height: 1vw;
  font-weight: 400;
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
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    width: 30vw;
    height: 2vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    width: 35vw;
    height: 3vw;
    font-size: 0.5rem;
  }
`;
