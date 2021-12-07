import styled from 'styled-components';
import { auth, getAuthorData } from '../../utils/firebase';
import { Link } from 'react-router-dom';
import { StarRounded, Forum, EmojiEmotions } from '@material-ui/icons';
import Review from './Review';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { removeSmile, addSmile } from '../../utils/firebase';

export default function Comment({
  commentId,
  authorId,
  date,
  rate,
  comment,
  reviews,
  smileBy,
  showCoin,
}) {
  const uid = auth.currentUser?.uid;
  const isSmiled = smileBy?.includes(uid);
  const [showReview, setShowReview] = useState(false);
  const [getAuthor, setGetAuthor] = useState('');

  const toggleSmile = () => {
    if (isSmiled) {
      removeSmile(commentId, uid);
    } else {
      addSmile(commentId, uid);
    }
  };

  const toggleShowReview = () => {
    if (showReview) {
      setShowReview(false);
    } else {
      setShowReview(true);
    }
  };

  useEffect(() => {
    const unsubscribe = getAuthorData(authorId, setGetAuthor);
    return () => {
      unsubscribe();
    };
  }, [authorId]);

  return (
    <>
      <CommentContainer>
        <UserDiv>
          <MyLink to={`/profile/${authorId}/comment`}>
            <User src={getAuthor.profileImg} />
            <UserName>{getAuthor.userName}</UserName>
          </MyLink>
        </UserDiv>
        <ContentDiv>
          <CommentDate>
            {moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss').substr(0, 16)}
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

            <SmileDiv onClick={toggleSmile} smile={isSmiled}>
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
        showCoin={showCoin}
      />
    </>
  );
}

export const CommentContainer = styled.div`
  width: 100%;
  min-height: 5vw;
  text-align: justify;
  background: #595a59;
  box-shadow: 5px 5px 10px rgba(28, 28, 28, 1);
  display: flex;
  align-items: center;
  padding: 1vw 2vw;
  margin-top: 2vw;
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

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 8vw;
`;

const User = styled.img`
  width: 4vw;
  height: 4vw;
  object-fit: contain;

  @media (max-width: 600px) {
    width: 6vw;
    height: 6vw;
  }
`;

const UserName = styled.div`
  margin-top: 1vw;
  font-weight: 500;
  text-align: center;
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

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5vw;
  width: 100%;
`;

export const CommentContent = styled.div`
  margin-top: 5px;
  align-self: flex-start;
  white-space: pre-wrap;
`;

export const UserRate = styled.div`
  display: flex;
  align-items: center;
`;

export const Rate = styled.div`
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

export const CommentDate = styled(Rate)`
  margin-left: auto;
  color: #c5cdc0;
`;

export const FunctionDiv = styled.div`
  margin-top: 1vw;
  display: flex;
  margin-left: auto;
`;

export const Recomment = styled(Forum)`
  transform: scale(1.5);
  margin-right: 0.5vw;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    margin-right: 0;
    transform: scale(0.75);
  }
`;

export const RecommentDiv = styled.div`
  margin-right: 3vw;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
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

export const Smile = styled(EmojiEmotions)`
  transform: scale(1.5);
  margin-right: 0.5vw;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    margin-right: 0;
    transform: scale(0.75);
  }
`;

export const SmileDiv = styled(RecommentDiv)`
  margin-right: 0;
  color: ${(props) => (props.smile ? '#75e799' : '')};
`;

export const Star = styled(StarRounded)`
  transform: scale(1.5);
  color: gold;
  margin-right: 1vmin;
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    transform: scale(1);
  }
  @media (max-width: 600px) {
    margin-right: 0;
    transform: scale(0.75);
  }
`;

export const MyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  &:hover {
    color: #75e799;
  }
`;
