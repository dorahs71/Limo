import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StarRounded, Forum, EmojiEmotions } from '@material-ui/icons';
import Review from '../components/Review';
import { useState } from 'react';
import moment from 'moment';
import { firestore } from '../utils/firebase';
import firebase from '../utils/firebase';

const CommentContainer = styled.div`
  width: 100%;
  min-height: 16vmin;
  font-size: 2.5vmin;
  text-align: justify;
  background: #595a59;
  box-shadow: 5px 5px 10px rgba(28, 28, 28, 1);
  display: flex;
  align-items: center;
  padding: 2vmin 3vmin;
  margin-top: 3vmin;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2vmin;
  width: 100%;
`;

const CommentContent = styled.div`
  margin-top: 5px;
  align-self: flex-start;
`;

const UserRate = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.div`
  margin-left: auto;
  font-size: 2.2vmin;
  color: #c5cdc0;
`;

const FunctionDiv = styled.div`
  margin-top: 2vmin;
  display: flex;
  margin-left: auto;
`;

const Recomment = styled(Forum)`
  transform: scale(1.2);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const RecommentDiv = styled.div`
  font-size: 2.2vmin;
  margin-right: 5vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
`;

const Smile = styled(EmojiEmotions)`
  transform: scale(1.2);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const UserSmileDiv = styled.div`
  font-size: 2.2vmin;
  color: #fff;
`;

const SmileDiv = styled.div`
  font-size: 2.2vmin;
  cursor: pointer;
  color: ${(props) => (props.smile ? '#75e799' : '')};
  &:hover {
    color: #75e799;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1.5);
  color: gold;
  margin-right: 1vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;

const Rate = styled.div`
  font-size: 2.5vmin;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  &:hover {
    color: #75e799;
  }
`;

const MovieDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 18vmin;
  height: 20vmin;
  position: relative;
  cursor: pointer;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
`;

const MovieName = styled.div`
  width: 70%;
  text-align: center;
  font-size: 2.2vmin;
  font-weight: 400;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 1;
  }
  > * {
    transform: translateY(2vmin);
    transition: transform 0.4s;
  }
  &:hover > * {
    transform: translateY(0);
  }
`;

export default function ProfileComment({
  commentId,
  poster,
  movieId,
  chTitle,
  date,
  rate,
  comment,
  reviews,
  smileBy,
  isUser,
  currentUserId,
  showCoin,
}) {
  const [showReview, setShowReview] = useState(false);
  const isSmiled = smileBy?.includes(currentUserId);
  const toggleShowReview = () => {
    if (showReview) {
      setShowReview(false);
    } else {
      setShowReview(true);
    }
  };

  const toggleSmile = () => {
    if (isSmiled) {
      firestore

        .collection('Comments')
        .doc(commentId)
        .update({
          smileBy: firebase.firestore.FieldValue.arrayRemove(currentUserId),
        });
    } else {
      firestore

        .collection('Comments')
        .doc(commentId)
        .update({
          smileBy: firebase.firestore.FieldValue.arrayUnion(currentUserId),
        });
    }
  };

  return (
    <>
      <CommentContainer>
        <MovieDiv>
          <MyLink to={`/movie/${movieId}`}>
            <Poster src={poster} />
            <Overlay>
              <MovieName>{chTitle}</MovieName>
            </Overlay>
          </MyLink>
        </MovieDiv>
        <ContentDiv>
          <CommentDate>
            {moment(date?.toDate()).format('YYYY-MM-DD HH:mm:ss')}
          </CommentDate>
          <UserRate>
            <Star />
            <Rate> {rate}</Rate>
          </UserRate>
          <CommentContent>{comment}</CommentContent>
          <FunctionDiv>
            <RecommentDiv onClick={toggleShowReview}>
              <Recomment />
              {reviews?.length || 0}
            </RecommentDiv>

            {isUser ? (
              <UserSmileDiv>
                <Smile />
                {smileBy?.length || 0}
              </UserSmileDiv>
            ) : (
              <SmileDiv onClick={toggleSmile}>
                <Smile />
                {smileBy?.length || 0}
              </SmileDiv>
            )}
          </FunctionDiv>
        </ContentDiv>
      </CommentContainer>
      <Review
        trigger={showReview}
        commentId={commentId}
        reviews={reviews || ''}
        showCoin={showCoin}
      />
    </>
  );
}
