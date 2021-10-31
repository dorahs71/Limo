import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListDiv = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vmin 0 5vmin 5vmin;
  @media (max-width: 1280px) {
    height: 45vmin;
    /* margin: 20px 30px; */
  }
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 0px;
  z-index: 3;
  box-shadow: 1px 1px 10px 1px;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  @media (max-width: 1280px) {
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 50px;
  z-index: 4;
  box-shadow: 1px 1px 10px 1px;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 100px;
  z-index: 5;
  box-shadow: 1px 1px 10px 1px #333;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;

const ListTitle = styled.div`
  margin-top: 32vmin;
  margin-left: 8vmin;
  font-size: 25px;
  @media (max-width: 1280px) {
    font-size: 20px;
    margin-left: 8vmin;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  width: 100%;
`;

export default function ProfileList({ title, posters, listId }) {
  return (
    <ListDiv>
      <MyLink to={`/list/${listId}`}>
        <ThemeList>
          <ListCh1 src={posters[2]} alt=""></ListCh1>
          <ListCh2 src={posters[1]} alt=""></ListCh2>
          <ListCh3 src={posters[0]} alt=""></ListCh3>
        </ThemeList>
        <ListTitle>{title}</ListTitle>
      </MyLink>
    </ListDiv>
  );
}
