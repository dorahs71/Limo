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
        <Story data-aos="fade-up">{eachMovie.story}</Story>
      </SectionDiv>
      <SectionDiv>
        <Title data-aos="fade-up">演員列表</Title>
        <MovieCast eachMovie={eachMovie} />
      </SectionDiv>
      <SectionDiv>
        <FunctionHead>
          <Title>經典對白</Title>
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
  font-size: 2.5vmin;
  margin-top: 5vmin;
  text-align: justify;
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
