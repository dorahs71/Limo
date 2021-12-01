import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { Favorite } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { getOrderedData } from '../../utils/firebase';

export default function ListSection() {
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

  let userArr = [];
  let popularList = [];
  let newList = [];

  if (movieList !== '') {
    newList = movieList
      .sort(function (a, b) {
        return a.collect.length - b.collect.length;
      })
      .reverse()
      .slice(0, 4);
  }

  if (allUser && newList) {
    newList.map((list) => {
      const authorData = allUser.find((x) => x.uid === list.authorId);
      userArr.push(authorData);
      return authorData;
    });
  }

  if (newList.length > 0 && userArr.length > 0) {
    popularList = newList.map((item, i) => Object.assign({}, item, userArr[i]));
  }

  return (
    <ListSectionDiv>
      {popularList !== '' &&
        popularList.map((item) => {
          return (
            <ListLink to={`/list/${item.listId}`} key={item.listId}>
              <TiltDiv
                glareEnable={true}
                glareMaxOpacity={0.8}
                glareColor="#ffffff"
                glarePosition="bottom"
              >
                <List>
                  <ThemeList>
                    {item.listPosters[2] !== undefined && (
                      <ListImg src={item.listPosters[2]} alt=""></ListImg>
                    )}
                    {item.listPosters[1] !== undefined && (
                      <ListImg src={item.listPosters[1]} alt=""></ListImg>
                    )}
                    {item.listPosters[0] !== undefined && (
                      <ListImg src={item.listPosters[0]} alt=""></ListImg>
                    )}
                  </ThemeList>

                  <ListTitle>{item.listTitle}</ListTitle>
                  <ListIntro>
                    <ListProfileDiv>
                      <ListProfileImg src={item.profileImg} alt="" />
                      <ListProfileName>{item.userName}</ListProfileName>
                    </ListProfileDiv>
                    <CollectNum>
                      <Love />
                      {item.collect?.length || 0}
                    </CollectNum>
                  </ListIntro>
                </List>
              </TiltDiv>
            </ListLink>
          );
        })}
    </ListSectionDiv>
  );
}

const ListSectionDiv = styled.div`
  margin-top: 5vmin;
  display: flex;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px 3px;
  justify-items: center;
  width: 100%;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const List = styled.div`
  margin: 0 auto;
  border-radius: 10px;
  align-items: center;
  flex-direction: column;
  display: flex;
  width: 42vmin;
  height: 40vmin;
  cursor: pointer;
  text-align: center;
  justify-content: space-between;
  background: rgba(223, 223, 223, 0.9);
  box-shadow: 1vmin 1vmin 2vmin rgba(20, 19, 19, 1);
  @media (max-width: 1280px) {
    width: 54vmin;
  }
`;

const TiltDiv = styled(Tilt)`
  width: 42vmin;
  cursor: pointer;
  margin-bottom: 3vmin;
  @media (max-width: 1280px) {
    width: 54vmin;
  }
`;

const ThemeList = styled.div`
  display: flex;
`;

const ListImg = styled.img`
  width: 14vmin;
  height: 20vmin;
  object-fit: cover;

  @media (max-width: 1280px) {
    width: 18vmin;
    height: 26vmin;
  }
`;

const ListIntro = styled.div`
  width: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  background: #4e524c;
  height: 5vmin;
  padding: 1vmin 0;
`;

const ListTitle = styled.div`
  font-size: 2.5vmin;
  font-weight: 600;
  align-self: center;
  color: #333;
`;

const CollectNum = styled.div`
  border-left: 2px solid #c5cdc0;
  font-size: 2vmin;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const Love = styled(Favorite)`
  color: #f08080;
  margin-right: 1vmin;
  @media (max-width: 500px) {
    transform: scale(0.6);
  }
`;

const ListProfileDiv = styled.div`
  cursor: pointer;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

const ListProfileImg = styled.img`
  width: 3.5vmin;
  height: 3.5vmin;
  margin-right: 1vmin;
`;

const ListProfileName = styled.div`
  font-size: 2vmin;
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

const ListLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;
