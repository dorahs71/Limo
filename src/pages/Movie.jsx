import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getMainMovie,
  getFirstComment,
  getMoreComment,
  getCurrentUserDiaries,
  getOrderedData,
} from '../utils/firebase';
import AOS from 'aos';
import NewComment from '../components/Movie/NewComment';
import AddToList from '../components/Movie/AddToList';
import TrailerPopup from '../components/Movie/TrailerPopup';
import Poll from '../components/Movie/Poll';
import Card from '../components/Movie/Card';
import CoinAlert from '../components/Common/CoinAlert';
import WarningAlert from '../components/Common/WarningAlert';
import SuccessAlert from '../components/Common/SuccessAlert';
import { Waypoint } from 'react-waypoint';
import Loading from '../components/Common/Loading';
import LoginAlert from '../components/Common/LoginAlert';
import MovieIntroduction from '../components/Movie/MovieIntroduction';
import MovieFunction from '../components/Movie/MovieFunction';
import ListSection from '../components/Movie/ListSection';
import MidSection from '../components/Movie/MidSection';
import MovieCommentSection from '../components/Movie/MovieCommentSection';

export default function Movie() {
  const { movieId } = useParams();
  const [eachMovie, setEachMovie] = useState('');
  const [showNewComment, setShowNewComment] = useState(false);
  const [showAddToList, setShowAddToList] = useState(false);
  const [listName, setListName] = useState('');
  const [diaryList, setDiaryList] = useState('');
  const [getAllComment, setGetAllComment] = useState([]);
  const [comment, setComment] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showCoinComment, setShowCoinComment] = useState(false);
  const [showCoinReview, setShowCoinReview] = useState(false);
  const [ownDiaryAlert, setOwnDiaryAlert] = useState(false);
  const [addDiaryAlert, setAddDiaryAlert] = useState(false);
  const [addListAlert, setAddListAlert] = useState(false);
  const [sendCardAlert, setSendCardAlert] = useState(false);
  const [loginAlert, setLoginAlert] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);

  const history = useHistory();
  const currentUserId = currentUser?.uid;
  const lastPostRef = useRef();

  useEffect(() => {
    setTimeout(function () {
      AOS.init();
    }, 1200);
  }, []);

  useEffect(() => {
    const unsubscribe = getCurrentUserDiaries(currentUserId, setDiaryList);
    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  useEffect(() => {
    let isMounted = true;
    getMainMovie(movieId).then((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        if (isMounted) setEachMovie(data);
      } else {
        history.push('/404');
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getOrderedData(
      'Comments',
      'movieId',
      movieId,
      setGetAllComment
    );
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getFirstComment(
      'movieId',
      movieId,
      lastPostRef,
      setComment
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return eachMovie ? (
    <>
      <BackgroundDiv>
        <HeadPic>
          {eachMovie !== '' && <Zoom src={eachMovie.gallery[0]} alt="" />}
        </HeadPic>
      </BackgroundDiv>
      <MovieDiv>
        <MovieMain>
          <MovieIntro>
            <PosterImg src={eachMovie.poster} alt="" data-aos="fade-right" />
            <IntroDiv data-aos="fade-left">
              <MovieIntroduction
                eachMovie={eachMovie}
                getAllComment={getAllComment}
                setShowTrailer={setShowTrailer}
              />
              <MovieFunction
                diaryList={diaryList}
                movieId={movieId}
                eachMovie={eachMovie}
                currentUser={currentUser}
                setListName={setListName}
                setShowCard={setShowCard}
                setShowAddToList={setShowAddToList}
                setLoginAlert={setLoginAlert}
                setAddDiaryAlert={setAddDiaryAlert}
                setOwnDiaryAlert={setOwnDiaryAlert}
                setSendCardAlert={setSendCardAlert}
                setAddListAlert={setAddListAlert}
              />
            </IntroDiv>
          </MovieIntro>
          <Card
            trigger={showCard}
            setTrigger={setShowCard}
            poster={eachMovie.poster}
            gallery={eachMovie.gallery}
            setSendCardAlert={setSendCardAlert}
          />

          <AddToList
            trigger={showAddToList}
            setTrigger={setShowAddToList}
            movie={eachMovie}
            listName={listName}
            setAddListAlert={setAddListAlert}
            uid={currentUserId}
            movieId={movieId}
          />

          <MidSection eachMovie={eachMovie} setShowVote={setShowVote} />
          <ListSection eachMovie={eachMovie} />
          <MovieCommentSection
            currentUser={currentUser}
            setShowNewComment={setShowNewComment}
            setLoginAlert={setLoginAlert}
            setShowCoinReview={setShowCoinReview}
            comment={comment}
          />
        </MovieMain>
        <Waypoint
          onEnter={() => {
            if (lastPostRef.current) {
              const unsubscribe = getMoreComment(
                'movieId',
                movieId,
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
        <NewComment
          trigger={showNewComment}
          setTrigger={setShowNewComment}
          poster={eachMovie.poster}
          chTitle={eachMovie.chTitle}
          rate={eachMovie.rate}
          allComment={getAllComment}
          showCoin={setShowCoinComment}
        />
        <TrailerPopup
          trailerKey={eachMovie.trailerKey}
          trigger={showTrailer}
          setTrigger={setShowTrailer}
        />
      </MovieDiv>
      <Poll movieId={movieId} trigger={showVote} setTrigger={setShowVote} />
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
      <LoginAlert
        trigger={loginAlert}
        setTrigger={setLoginAlert}
        message={'記得先登入會員才可以使用LIMO的功能喔！'}
      />
    </>
  ) : (
    <Loading />
  );
}

const MovieDiv = styled.div`
  max-width: 1560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: 80vh;
  opacity: 0.5;
  overflow: visible;
  position: absolute;
  top: 0;
`;

const Zoom = styled.img`
  display: inline-block;
  width: 100%;
  height: 80vh;
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
  &:after {
    content: '';
    position: absolute;
    bottom: -20vmin;
    right: 0;
    width: 100%;
    height: 30vw;
    background: linear-gradient(to bottom, transparent, #2b2929, #2b2929);
  }
`;

const MovieMain = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MovieIntro = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15vh;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    justify-content: center;
  }
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const PosterImg = styled.img`
  z-index: 5;
  width: 40vmin;
  height: 60vmin;
  object-fit: cover;
  box-shadow: 2px 2px 19px 2px rgba(20, 19, 19, 1);
  @media (max-width: 1280px) {
  }
`;

const IntroDiv = styled.div`
  z-index: 5;
  margin-left: 8vmin;
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  @media (max-width: 1024px) {
    align-items: center;
    justify-content: center;
    margin-top: 5vmin;
    width: 60%;
    margin-left: 0;
  }
`;
