import styled from 'styled-components';
import { StarRounded, LiveTv } from '@material-ui/icons';

export default function MovieIntroduction({ eachMovie, setShowTrailer }) {
  return (
    <>
      <ChTitle>{eachMovie.chTitle}</ChTitle>
      <EnTitle>{eachMovie.enTitle}</EnTitle>
      <ColumnDiv>
        <ColumnValue>
          <Column>
            評分：
            <Star />
            {eachMovie.rate} / {eachMovie.rateNum}人
          </Column>
        </ColumnValue>
        <ColumnValue>
          <Column>上映日期：{eachMovie.date} </Column>
        </ColumnValue>
        <ColumnValue>
          <Column>片長：{eachMovie.length} </Column>
        </ColumnValue>
        <ColumnValue>
          <Column>導演：{eachMovie.director} </Column>
        </ColumnValue>
      </ColumnDiv>
      {eachMovie.trailerKey !== '' && (
        <TrailerButton onClick={() => setShowTrailer(true)}>
          <TrailerIcon />
          <Trailer> 我想看預告片</Trailer>
        </TrailerButton>
      )}
    </>
  );
}

const ChTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 3rem;
  @media (max-width: 1280px) {
    font-size: 2.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const EnTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #c5cdc0;
`;

const ColumnDiv = styled.div`
  display: flex;
  margin-top: 4vmin;
  flex-direction: column;
  align-items: flex-start;
`;

const ColumnValue = styled.div`
  display: flex;
  align-items: center;
`;

const Column = styled.div`
  margin-top: 1vmin;
  font-size: 1.5rem;
  align-items: center;
  display: flex;
  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 5px;
  @media (max-width: 1280px) {
    transform: scale(1.1);
  }
`;

const TrailerButton = styled.div`
  width: 70%;
  display: flex;
  height: 5vmin;
  background: #62d498;
  padding: 8px 5px;
  color: #333;
  margin-top: 4vmin;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #8aefba;
    color: #fff;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Trailer = styled.div`
  font-size: 1.5rem;
  line-height: 5vmin;
  @media (max-width: 1280px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 375px) {
    font-size: 0.9rem;
  }
`;

const TrailerIcon = styled(LiveTv)`
  transform: scale(1.7);
  margin-right: 2vmin;
  @media (max-width: 1280px) {
    transform: scale(1.2);
    margin-right: 1vmin;
  }
  @media (max-width: 375px) {
    transform: scale(1);
  }
`;
