import styled from 'styled-components';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';
import nocomment from '../../images/nocomment.png';
import ProfileComment from './ProfileComment';

export default function CommentSection({
  activeItem,
  comment,
  isUser,
  currentUserId,
  setShowCoinReview,
}) {
  return (
    <>
      {activeItem === 'comment' && comment.length === 0 && (
        <Space>
          <SpaceImg src={nocomment} alt="" />
          <SpaceWord>開始分享自己對電影的看法吧！</SpaceWord>
        </Space>
      )}
      {activeItem === 'comment' && comment.length > 0 && (
        <CommentShowcase>
          {comment !== '' &&
            comment.map((item) => (
              <ProfileComment
                key={item.commentId}
                commentId={item.commentId}
                movieId={item.movieId}
                poster={item.poster}
                chTitle={item.chTitle}
                date={item.date}
                rate={item.rate}
                comment={item.comment}
                reviews={item.reviews}
                smileBy={item.smileBy}
                isUser={isUser}
                currentUserId={currentUserId}
                showCoin={setShowCoinReview}
              />
            ))}
        </CommentShowcase>
      )}
    </>
  );
}

const CommentShowcase = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vmin 0;
  text-align: center;
  width: 100%;
  align-items: center;
`;
