import styled from 'styled-components';
import rank1 from '../../images/1.png';
import rank2 from '../../images/2.png';
import rank3 from '../../images/3.png';
import voting from '../../images/voting.png';
import { Space, SpaceImg, SpaceWord } from '../Common/Common.style';

export default function MovieQuote({ voteResult }) {
  return (
    <QuoteContainer>
      {voteResult[0] ? (
        <QuoteDiv>
          <RankDiv>
            <RankNo1>No.</RankNo1>
            <Ranking src={rank1} alt="" />
          </RankDiv>
          <Quote>{voteResult[0].option}</Quote>
        </QuoteDiv>
      ) : (
        <Space>
          <SpaceImg src={voting} alt="" />
          <SpaceWord>寫下你/妳認為的經典對白，開啟投票吧！</SpaceWord>
        </Space>
      )}
      {voteResult[1] && (
        <QuoteDiv>
          <RankDiv>
            <RankNo2>No.</RankNo2>
            <Ranking src={rank2} alt="" />
          </RankDiv>
          <Quote>{voteResult[1].option}</Quote>
        </QuoteDiv>
      )}
      {voteResult[2] && (
        <QuoteDiv>
          <RankDiv>
            <RankNo3>No.</RankNo3>
            <Ranking src={rank3} alt="" />
          </RankDiv>
          <Quote>{voteResult[2].option}</Quote>
        </QuoteDiv>
      )}
    </QuoteContainer>
  );
}

const QuoteContainer = styled.div`
  display: flex;
  margin-top: 2.5vmin;
  flex-direction: column;
  align-items: center;
`;

const QuoteDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:not(:last-of-type) {
    margin-bottom: 5vmin;
  }
`;

const RankDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Quote = styled.div`
  font-size: 3vmin;
  font-weight: 700;
  margin-left: 3vmin;
  text-align: justify;
  border-bottom: 1px solid #bed8bf;
`;

const Ranking = styled.img`
  width: 10vmin;
  height: 10vmin;
  margin-left: 2vmin;
`;

const RankNo1 = styled.div`
  font-size: 4.5vmin;
  font-family: 'Original Surfer', cursive;
  color: #fbc500;
`;

const RankNo2 = styled(RankNo1)`
  color: #c4c4c4;
`;

const RankNo3 = styled(RankNo1)`
  color: #b9856f;
`;
