import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StarRounded, Forum, EmojiEmotions } from '@material-ui/icons';
import Review from '../components/Review';
import { useState } from 'react';
import moment from 'moment';

const CommentContainer = styled.div`
  width: 80%;
  height: 20vmin;
  font-size: 25px;
  border: #75e799 solid 2px;
  background: linear-gradient(#555, #111);
  display: flex;
  align-items: center;
  padding: 0px 20px;
  margin-top: 3vmin;
  @media (max-width: 1280px) {
    font-size: 20px;
    padding: 10px 20px;
    height: 20vmin;
  }
`;

const MovieDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1280px) {
    width: 13%;
  }
`;

const Poster = styled.img`
  width: 10vmin;
  height: 13vmin;
  @media (max-width: 1280px) {
    width: 15vmin;
    height: 10vmin;
  }
`;

const MovieName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 2px;
  text-align: center;
  color: #fff;
  &:hover {
    color: #75e799;
  }

  @media (max-width: 1280px) {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vmin;
  width: 100%;
`;

const CommentContent = styled.div`
  margin-top: 1vmin;
`;

const UserRate = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.div`
  margin-left: auto;
`;

const FunctionDiv = styled.div`
  display: flex;
  margin-left: auto;
`;

const Recomment = styled(Forum)`
  transform: scale(1.5);
  margin-right: 1vmin;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const RecommentDiv = styled.div`
  font-size: 20px;
  margin-right: 5vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    font-size: 16px;
  }
`;

const Smile = styled(EmojiEmotions)`
  transform: scale(1.5);
  margin-right: 1vmin;

  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;

const SmileDiv = styled.div`
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    font-size: 16px;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 1vmin;
`;

const Rate = styled.div`
  font-size: 22px;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
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
}) {
  const [showReview, setShowReview] = useState(false);

  const toggleShowReview = () => {
    if (showReview) {
      setShowReview(false);
    } else {
      setShowReview(true);
    }
  };

  return (
    <>
      <CommentContainer>
        <MovieDiv>
          <MyLink to={`/movie/${movieId}`}>
            <Poster src={poster} />
            <MovieName>{chTitle}</MovieName>
          </MyLink>
        </MovieDiv>
        <ContentDiv>
          <CommentDate>
            {moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss')}
          </CommentDate>
          <UserRate>
            <Star />
            <Rate> {rate}</Rate>
          </UserRate>
          <CommentContent>{comment}</CommentContent>
          <FunctionDiv>
            <RecommentDiv>
              <Recomment onClick={toggleShowReview} />
              {reviews?.length || 0}
            </RecommentDiv>

            <SmileDiv>
              <Smile />
              {smileBy?.length || 0}
            </SmileDiv>
          </FunctionDiv>
        </ContentDiv>
      </CommentContainer>
      <Review
        trigger={showReview}
        commentId={commentId}
        reviews={reviews || ''}
      />
    </>
  );
}
