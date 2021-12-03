import styled from 'styled-components';
import { useState } from 'react';
import { SearchOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import algolia from '../../utils/algolia';

export default function SearchSection({ dispatch }) {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const getSearchData = () => {
    algolia.search(keyword).then((result) => {
      const searchResult = result.hits.map((hit) => {
        return hit;
      });
      dispatch({ type: 'getSearch', todo: searchResult });
      history.push(`/search/${keyword || undefined}`);
    });
  };

  const keypressSearchData = (e) => {
    if (e.keyCode === 13) {
      algolia.search(keyword).then((result) => {
        const searchResult = result.hits.map((hit) => {
          return hit;
        });
        dispatch({ type: 'getSearch', todo: searchResult });
        history.push(`/search/${keyword || undefined}`);
      });
    }
  };

  return (
    <SearchDiv>
      <SearchBar
        type="text"
        placeholder="請輸入電影名、演員、標籤"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => keypressSearchData(e)}
      />
      <SearchBtn onClick={getSearchData}>
        <SearchIcon />
      </SearchBtn>
    </SearchDiv>
  );
}

const SearchBtn = styled.button`
  border: 0;
  width: 1.8vw;
  height: 1.8vw;
  font-size: 2vmin;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  margin-left: auto;
  margin-top: -0.1vw;
`;

const SearchIcon = styled(SearchOutlined)`
  transform: scale(1.5);
  margin: 0.3vw 0 0 0.1vw;
  color: #fff;
  cursor: pointer;
  @media (max-width: 1560px) {
    transform: scale(1.3);
    margin: 0.1vw 0 0 0;
  }
  @media (max-width: 1280px) {
    transform: scale(1);
    margin-left: -0.3vw;
  }
  @media (max-width: 1024px) {
    transform: scale(0.9);
    margin-top: -0.3vw;
    margin-left: -0.5vw;
  }
  @media (max-width: 768px) {
    transform: scale(0.8);
    margin-top: -0.7vw;
    margin-left: -0.8vw;
  }
  @media (max-width: 600px) {
    transform: scale(0.7);
    margin-top: -1vw;
    margin-left: -2vw;
  }
  @media (max-width: 500px) {
    transform: scale(0.7);
    margin-top: -2vw;
    margin-left: -2vw;
  }
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 2vw;
  width: 100%;
  top: 0vw;
  font-size: 1.2vw;
  padding: 0 0.5em;
  border: 0;
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  line-height: 1.2vw;
  background: transparent;
  &:focus {
    outline: 0;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #a9a9a9;
  }
  @media (max-width: 1280px) {
    top: 0.2vw;
  }
  @media (max-width: 768px) {
    font-size: 1.7vw;
    line-height: 1.7vw;
    top: 0.3vw;
    opacity: 1;
  }
  @media (max-width: 600px) {
    font-size: 10px;
    opacity: 1;
    top: 0.9vw;
    line-height: 10px;
  }
`;

const SearchDiv = styled.div`
  width: 2.5vw;
  height: 2.5vw;
  display: flex;
  color: #fff;
  background: transparent;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 2px solid #75e799;
  z-index: 0;
  border-radius: 50px;
  margin-right: 1.5vw;
  padding: 3px 6px 0 0;
  transition: width 500ms ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    width: 25vw;
  }
  &:hover ${SearchIcon} {
    color: #fff;
    transition: color 150ms ease-in-out;
  }
  &:hover ${SearchBar} {
    opacity: 1;
  }
  @media (max-width: 1280px) {
    width: 2.8vw;
    height: 2.8vw;
  }
  @media (max-width: 1024px) {
    width: 3vw;
    height: 3vw;
  }
  @media (max-width: 768px) {
    width: 25vw;
    height: 3.5vw;
    &:hover {
      width: 25vw;
    }
  }
  @media (max-width: 600px) {
    width: 45vw;
    height: 5vw;
    &:hover {
      width: 45vw;
    }
  }
`;
