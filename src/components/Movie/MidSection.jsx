import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getVoteResult } from '../../utils/firebase';
import MovieQuote from './MovieQuote';
import MovieCast from './MovieCast';
import {
  SectionDiv,
  Title,
  FunctionHead,
  Function,
  FunctionBtn,
} from '../Common/Common.style';
import { HowToVote } from '@material-ui/icons';

export default function MidSection({ eachMovie, setShowVote }) {
  const [voteResult, setVoteResult] = useState('');

  useEffect(() => {
    const unsubscribe = getVoteResult(eachMovie.movieId, setVoteResult);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <SectionDiv>
        <Title data-aos="fade-up">劇情簡介</Title>
        <Story>{eachMovie.story}</Story>
      </SectionDiv>
      <SectionDiv>
        <Title data-aos="fade-up">演員列表</Title>
        <MovieCast eachMovie={eachMovie} />
      </SectionDiv>
      <SectionDiv>
        <FunctionHead>
          <Title data-aos="fade-up">經典對白</Title>
        </FunctionHead>
        <Function>
          <FunctionBtn onClick={() => setShowVote(true)}>
            <VoteIcon /> 參加投票
          </FunctionBtn>
        </Function>
        <MovieQuote voteResult={voteResult} />
      </SectionDiv>
    </>
  );
}

const Story = styled.div`
  margin-top: 4vw;
  text-align: justify;
  font-size: 1.5rem;

  @media screen and (max-width: 1440px) {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const VoteIcon = styled(HowToVote)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(0.9);
  }
  @media (max-width: 600px) {
    margin-top: -3.5vh;
    visibility: hidden;
  }
`;
