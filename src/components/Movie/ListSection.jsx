import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ThemeList from '../Profile/ThemeList';
import shareList from '../../images/shareList.png';
import { Link } from 'react-router-dom';
import { getOrderedData } from '../../utils/firebase';
import {
  SectionDiv,
  Title,
  Space,
  SpaceImg,
  SpaceWord,
} from '../Common/Common.style.jsx';

export default function ListSection({ eachMovie }) {
  const [movieList, setMovieList] = useState('');
  const allUser = useSelector((state) => state.allUser);

  useEffect(() => {
    const unsubscribe = getOrderedData(
      'Lists',
      'listShare',
      true,
      setMovieList
    );
    return () => {
      unsubscribe();
    };
  }, []);

  let relativeList = [];
  let userArr = [];
  let newList = [];

  if (eachMovie.list !== undefined && movieList) {
    eachMovie.list.map((item) => {
      const listData = movieList.find((x) => x.listId === item);
      if (listData !== undefined) {
        relativeList.push(listData);
      }
      return listData;
    });
  }

  if (allUser && relativeList) {
    relativeList.map((list) => {
      const authorData = allUser.find((x) => x.uid === list?.authorId);
      userArr.push(authorData);
      return authorData;
    });
  }

  if (relativeList.length > 0 && userArr.length > 0) {
    newList = relativeList.map((item, i) =>
      Object.assign({}, item, userArr[i])
    );
  }

  return (
    <SectionDiv>
      <Title>相關片單</Title>
      {newList.length === 0 ? (
        <ListContainer>
          <Space>
            <SpaceImg src={shareList} alt="" />
            <SpaceWord>歡迎將這部電影加入片單呦！</SpaceWord>
          </Space>
        </ListContainer>
      ) : (
        <ListWrapper>
          {newList.map((item) => (
            <ListDiv key={item.listId}>
              <OneList>
                <ListLink to={`/list/${item.listId}`}>
                  {item.listPosters !== undefined && (
                    <ThemeList posters={item.listPosters} />
                  )}
                  <ListIntro>
                    <ListTitle>{item.listTitle}</ListTitle>
                    <ListProfileDiv>
                      <ListProfileImg src={item.profileImg} alt="" />
                      <ListProfileName>{item.userName}</ListProfileName>
                    </ListProfileDiv>
                  </ListIntro>
                </ListLink>
              </OneList>
            </ListDiv>
          ))}
        </ListWrapper>
      )}
    </SectionDiv>
  );
}

const ListDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListProfileDiv = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

const OneList = styled.div`
  position: relative;
  cursor: pointer;
  width: 20vmin;
  height: 25vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    color: #75e799;
  }

  &:hover ${ListProfileDiv} {
    color: #75e799;
  }
  @media (max-width: 1280px) {
    width: 30vmin;
    height: 35vmin;
  }
`;

const ListIntro = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7vh 5vmin 0 0;
  @media (max-width: 600px) {
    margin: 5vh 5vmin 0 0;
  }
`;

const ListTitle = styled.div`
  font-size: 2.2vmin;
  margin-top: 16vmin;
  width: 100%;
`;

const ListProfileImg = styled.img`
  width: 4vmin;
  height: 4vmin;
  margin-right: 1vmin;
`;

const ListProfileName = styled.div`
  font-size: 2vmin;
`;

const ListLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #75e799;
  }
`;

const ListContainer = styled.div`
  display: flex;
  margin-top: 2.5vmin;
`;

const ListWrapper = styled.div`
  margin-top: 5vmin;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3vmin 3vmin;
  justify-items: center;
  margin-left: 8vmin;
  align-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 3vmin 3vmin;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 3vh 3vw;
  }
`;
