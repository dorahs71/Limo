import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getDiaryBlock, addDiaryBlock } from '../../utils/firebase';
import DiaryBlock from './DiaryBlock';
import { PostAdd } from '@material-ui/icons';
import diary from '../../images/diary.png';
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

export default function DiaryBlockSection({ uid, diaryId }) {
  const [diaryBlock, setDiaryBlock] = useState('');

  useEffect(() => {
    getDiaryBlock(uid, diaryId, setDiaryBlock);
  }, []);

  return (
    <SectionDiv>
      <FunctionHead>
        <Title>我的日記</Title>
      </FunctionHead>
      <Function>
        <FunctionBtn
          onClick={() => {
            addDiaryBlock(uid, diaryId);
          }}
        >
          <DiaryIcon /> 新增日記
        </FunctionBtn>
      </Function>
      <DiaryWrapper>
        {diaryBlock.length > 0 &&
          diaryBlock.map((item) => (
            <DiaryBlock
              key={item.diaryDataId}
              diaryDataId={item.diaryDataId}
              diaryNote={item.diaryNote}
              date={item.date}
              uid={uid}
              diaryId={diaryId}
            />
          ))}
        {diaryBlock.length === 0 && (
          <Space>
            <SpaceImg src={diary} alt="" />
            <SpaceWord>來寫新的日誌吧！</SpaceWord>
          </Space>
        )}
      </DiaryWrapper>
    </SectionDiv>
  );
}

const DiaryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DiaryIcon = styled(PostAdd)`
  transform: scale(1.3);
  margin-right: 0.5vmin;
  @media (max-width: 1280px) {
    transform: scale(1);
  }
`;
