import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Review from '../Movie/Review';
import { useState } from 'react';
import moment from 'moment';
import { removeSmile, addSmile } from '../../utils/firebase';
import {
  CommentContainer,
  ContentDiv,
  CommentContent,
  UserRate,
  Rate,
  CommentDate,
  FunctionDiv,
  Recomment,
  RecommentDiv,
  Smile,
  SmileDiv,
  Star,
  MyLink,
} from '../Movie/Comment';

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
      removeSmile(commentId, currentUserId);
    } else {
      addSmile(commentId, currentUserId);
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
              <SmileDiv>
                <Smile />
                {smileBy?.length || 0}
              </SmileDiv>
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
  font-weight: 400;
  font-size: 1.5rem;
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
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    font-size: 0.5rem;
  }
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
