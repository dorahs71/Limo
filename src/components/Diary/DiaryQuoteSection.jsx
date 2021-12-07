import styled from 'styled-components';
import { useState, useEffect } from 'react';
import DiaryQuote from './DiaryQuote';
import noquote from '../../images/noquote.png';
import { RateReview } from '@material-ui/icons';
import {
  FunctionBtn,
  FunctionHead,
  Function,
  SectionDiv,
  Title,
  Space,
  SpaceImg,
  SpaceWord,
} from '../Common/Common.style';
import { getDiaryQuotes, addDiaryQuote } from '../../utils/firebase';

export default function DiaryQuoteSection({ uid, diaryId }) {
  const [diaryQuotes, setDiaryQuotes] = useState('');

  useEffect(() => {
    getDiaryQuotes(uid, diaryId, setDiaryQuotes);
  }, [uid, diaryId]);

  return (
    <SectionDiv>
      <FunctionHead>
        <Title>經典對白</Title>
      </FunctionHead>
      <Function>
        <FunctionBtn onClick={() => addDiaryQuote(uid, diaryId)}>
          <QuoteIcon /> 新增對白
        </FunctionBtn>
      </Function>

      <QuoteContainer>
        <QuoteDiv>
          {diaryQuotes.length > 0 &&
            diaryQuotes.map((item) => (
              <DiaryQuote
                key={item.diaryQuoteId}
                diaryQuoteId={item.diaryQuoteId}
                diaryQuote={item.diaryQuote}
                uid={uid}
                diaryId={diaryId}
              />
            ))}
          {diaryQuotes.length === 0 && (
            <Space>
              <SpaceImg src={noquote} alt="" />
              <SpaceWord>來記下你的有感對白～</SpaceWord>
            </Space>
          )}
        </QuoteDiv>
      </QuoteContainer>
    </SectionDiv>
  );
}

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const QuoteDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuoteIcon = styled(RateReview)`
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
