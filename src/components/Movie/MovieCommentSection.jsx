import styled from 'styled-components';
import Comment from './Comment';
import { Chat } from '@material-ui/icons';
import nodiscuss from '../../images/nodiscuss.png';
import {
  SectionDiv,
  Title,
  Space,
  SpaceImg,
  SpaceWord,
  FunctionHead,
  Function,
  FunctionBtn,
} from '../Common/Common.style.jsx';

export default function MovieCommentSection({
  currentUser,
  setShowNewComment,
  setLoginAlert,
  setShowCoinReview,
  comment,
}) {
  return (
    <SectionDiv>
      <FunctionHead>
        <Title data-aos="fade-up">網友評論</Title>
      </FunctionHead>
      <Function>
        <FunctionBtn
          onClick={() => {
            if (currentUser) {
              setShowNewComment(true);
            } else {
              setLoginAlert(true);
            }
          }}
        >
          <ChatIcon /> 新增評論
        </FunctionBtn>
      </Function>
      <CommentDiv>
        {comment.length === 0 && (
          <Space>
            <SpaceImg src={nodiscuss} alt="" />
            <SpaceWord>來分享你對這部電影的想法吧！</SpaceWord>
          </Space>
        )}

        {comment.map((item) => (
          <Comment
            key={item.commentId}
            commentId={item.commentId}
            authorId={item.authorId}
            date={item.date}
            rate={item.rate}
            comment={item.comment}
            reviews={item.reviews}
            smileBy={item.smileBy}
            showCoin={setShowCoinReview}
          />
        ))}
      </CommentDiv>
    </SectionDiv>
  );
}

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.5vmin;
`;

const ChatIcon = styled(Chat)`
  transform: scale(1.3);
  margin-right: 0.5vw;
  @media (max-width: 1280px) {
    transform: scale(0.9);
  }
  @media (max-width: 600px) {
    margin-top: -3.5vh;
    visibility: hidden;
  }
`;
