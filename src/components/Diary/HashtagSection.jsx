import styled from 'styled-components';
import { useState } from 'react';
import { LocalOffer, AddCircle, CancelOutlined } from '@material-ui/icons';
import { TagDeleteAlert } from '../Common/DeleteAlert';
import { addMovieTag, addDiaryTag } from '../../utils/firebase';
import { SectionDiv, Title } from '../Common/Common.style';

export default function HashtagSection({ getDiary, eachMovie, uid, diaryId }) {
  const [removeTagAlert, setRemoveTagAlert] = useState(false);
  const [addTag, setAddTag] = useState('');

  const handleAddTag = () => {
    addMovieTag(eachMovie, addTag);
    addDiaryTag(uid, diaryId, addTag);
    setAddTag('');
  };

  return (
    <SectionDiv>
      <Title>我的標籤</Title>
      <HashtagHead>
        <AddHashtag
          placeholder="寫下我的電影標籤"
          value={addTag}
          onChange={(e) => setAddTag(e.target.value)}
        />
        <AddBtn onClick={handleAddTag} />
      </HashtagHead>
      <HashtagContainer>
        {getDiary?.hashtag?.map((tag) => (
          <>
            <HashtagDiv key={tag}>
              <Close onClick={() => setRemoveTagAlert(true)}>
                <CancelIcon />
              </Close>
              <TagIcon />
              <Hashtag>{tag}</Hashtag>
            </HashtagDiv>
            <TagDeleteAlert
              tag={tag}
              eachMovie={eachMovie}
              uid={uid}
              diaryId={diaryId}
              trigger={removeTagAlert}
              setTrigger={setRemoveTagAlert}
              message={'確認要移除此標籤嗎？'}
            />
          </>
        ))}
      </HashtagContainer>
    </SectionDiv>
  );
}

const HashtagContainer = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const HashtagHead = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5vmin;
  justify-content: center;
  align-items: center;
`;

const AddHashtag = styled.input`
  width: 100%;
  height: 3vmin;
  font-size: 2.8vmin;
  padding: 10px;
  background: #444;
  border: 0;
  color: #fff;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  &:focus {
    outline: 0;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -34px;
  top: -3px;
  display: none;
`;

const CancelIcon = styled(CancelOutlined)`
  transform: scale(1.15);
  color: #f08080;
  border-radius: 50%;
`;

const HashtagDiv = styled.div`
  display: flex;
  margin: 2vmin 0 0 8vmin;
  width: auto;
  position: relative;
  &:hover ${Close} {
    display: flex;
  }
`;

const Hashtag = styled.div`
  font-size: 28px;
  margin-left: 2vmin;
  @media (max-width: 1280px) {
    font-size: 23px;
    margin-left: 1vmin;
  }
`;

const TagIcon = styled(LocalOffer)`
  transform: scale(2);
  color: #7fffd4;
  @media (max-width: 1280px) {
    transform: scale(1.5);
  }
`;

const AddBtn = styled(AddCircle)`
  transform: scale(1.6);
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    transform: scale(1.2);
  }
`;
