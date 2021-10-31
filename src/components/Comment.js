import styled from 'styled-components';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';
import { StarRounded, Forum, EmojiEmotions } from '@material-ui/icons';
import Review from '../components/Review';
import { useState } from 'react';

const CommentContainer = styled.div`
  width: 80%;
  height: 18vmin;
  font-size: 25px;
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

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  @media (max-width: 1280px) {
    width: 13%;
  }
`;

const User = styled.img`
  width: 10vmin;
  height: 8vmin;
  @media (max-width: 1280px) {
    width: 15vmin;
    height: 10vmin;
  }
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #75e799;
  text-decoration: underline;
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
  color: ${(props) => (props.smile ? '#75e799' : '')};
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

export default function Comment({
  commentId,
  authorImg,
  authorName,
  date,
  rate,
  comment,
  reviews,
  smileBy,
}) {
  const { movieId } = useParams();
  const uid = auth.currentUser.uid;
  const isSmiled = smileBy?.includes(uid);
  const [showReview, setShowReview] = useState(false);

  const toggleSmile = () => {
    if (isSmiled) {
      firestore
        .collection('Movies')
        .doc(movieId)
        .collection('Comments')
        .doc(commentId)
        .update({
          smileBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firestore
        .collection('Movies')
        .doc(movieId)
        .collection('Comments')
        .doc(commentId)
        .update({
          smileBy: firebase.firestore.FieldValue.arrayUnion(uid),
        });
    }
  };

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
        <UserDiv>
          <User src={authorImg} />
          <UserName>{authorName}</UserName>
        </UserDiv>
        <ContentDiv>
          <CommentDate>{date.toDate().toLocaleString()}</CommentDate>
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
      />
    </>
  );
}
