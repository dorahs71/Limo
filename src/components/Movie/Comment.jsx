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

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vmin;
`;

const User = styled.img`
  width: 6vmin;
  height: 6vmin;
  object-fit: contain;
`;

const UserName = styled.div`
  font-size: 2vmin;
  margin-top: 1vmin;
  font-weight: 500;
  text-align: center;
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
  white-space: pre-wrap;
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
  margin-top: 1vmin;
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
