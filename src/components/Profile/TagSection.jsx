import styled from 'styled-components';

export default function TagSection({
  activeItem,
  history,
  userId,
  dispatch,
  isUser,
}) {
  return (
    <TagDiv>
      <Tag
        active={activeItem === 'list'}
        onClick={() => {
          history.push(`/profile/${userId}/list`);
          dispatch({ type: 'changeState', todo: 'list' });
        }}
      >
        片單
      </Tag>

      <Tag
        active={activeItem === 'comment'}
        onClick={() => {
          history.push(`/profile/${userId}/comment`);
          dispatch({ type: 'changeState', todo: 'comment' });
        }}
      >
        評論
      </Tag>

      <Tag
        active={activeItem === 'collect'}
        onClick={() => {
          history.push(`/profile/${userId}/collect`);
          dispatch({ type: 'changeState', todo: 'collect' });
        }}
      >
        收藏
      </Tag>
      <Tag
        active={activeItem === 'follow'}
        onClick={() => {
          history.push(`/profile/${userId}/follow`);
          dispatch({ type: 'changeState', todo: 'follow' });
        }}
      >
        追蹤
      </Tag>

      {isUser && (
        <Tag
          active={activeItem === 'diary'}
          onClick={() => {
            history.push(`/profile/${userId}/diary`);
            dispatch({ type: 'changeState', todo: 'diary' });
          }}
        >
          日誌
        </Tag>
      )}
      {isUser && (
        <Tag
          active={activeItem === 'card'}
          onClick={() => {
            history.push(`/profile/${userId}/card`);
            dispatch({ type: 'changeState', todo: 'card' });
          }}
        >
          小卡
        </Tag>
      )}
    </TagDiv>
  );
}

const TagDiv = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Tag = styled.div`
  width: 6vw;
  font-weight: 600;
  height: 3vw;
  opacity: 0.8;
  color: ${(props) => (props.active ? '#fff' : '#666')};
  background: transparent;
  border-radius: 5px;
  border-bottom: 5px solid
    ${(props) => (props.active ? '#7fffd4' : 'transparent')};
  line-height: 6vmin;
  text-align: center;
  margin-left: 5vmin;
  cursor: pointer;
  &:hover {
    border-bottom: 5px solid #7fffd4;
    color: #fff;
  }
  font-size: 1.5rem;
  @media (max-width: 1440px) {
    font-size: 1.2rem;
  }

  @media (max-width: 1024px) {
    height: 4vw;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    height: 5vw;
    font-size: 0.6rem;
  }
  @media (max-width: 375px) {
    width: 7vw;
    font-size: 0.5rem;
  }
`;
