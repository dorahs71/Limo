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
  width: 2.5vmin;
  height: 2.5vmin;
  font-size: 2vmin;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  margin-left: auto;
  @media (max-width: 1280px) {
    width: 3vmin;
    height: 3vmin;
  }
  @media (max-width: 992px) {
    width: 3.5vmin;
    height: 3.5vmin;
  }

  @media (max-width: 500px) {
    width: 2vmin;
    height: 2vmin;
  }
`;

const SearchIcon = styled(SearchOutlined)`
  margin-left: -3px;
  transform: scale(1.1);
  color: #fff;
  margin-top: 2px;
  cursor: pointer;
  @media (max-width: 1280px) {
    margin-top: -1px;
    transform: scale(1);
  }
  @media (max-width: 1024px) {
    margin-top: 1px;
    transform: scale(1);
    margin-left: 3px;
  }
  @media (max-width: 992px) {
    margin-top: 0px;
    transform: scale(1);
    margin-left: -6px;
  }
  @media (max-width: 768px) {
    margin-left: 1px;
  }
  @media (max-width: 750px) {
    margin-left: -2px;
  }
  @media (max-width: 600px) {
    margin-top: -1px;
    margin-left: -4px;
  }
  @media (max-width: 500px) {
    transform: scale(0.8);
    margin-top: -15px;
    margin-left: -4px;
  }
  @media (max-width: 400px) {
    transform: scale(0.6);
    margin-top: -100px;
    margin-left: -8px;
  }
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 30px;
  width: 100%;
  font-size: 2vmin;
  padding: 0 0.5em;
  border: 0;
  color: #fff;
  position: absolute;
  top: 2px;
  bottom: 0;
  left: 0;
  opacity: 0;
  line-height: calc(40px - 3px);
  background: transparent;
  &:focus {
    outline: 0;
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 1.7vmin;
    color: #a9a9a9;
  }
  @media (max-width: 1280px) {
    font-size: 2.5vmin;
    ::placeholder,
    ::-webkit-input-placeholder {
      font-size: 2.5vmin;
    }
  }
`;

const SearchDiv = styled.div`
  width: 4vmin;
  height: 4vmin;
  display: flex;
  color: #fff;
  background: transparent;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 2px solid #75e799;
  z-index: 0;
  border-radius: 50px;
  margin-right: 2vmin;
  padding: 3px 6px 0 0;
  transition: width 500ms ease-in-out;
  position: relative;
  overflow: hidden;
  &:hover {
    width: 35vmin;
  }
  &:hover ${SearchBtn} {
    background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
  }
  &:hover ${SearchIcon} {
    color: #333;
    transition: color 150ms ease-in-out;
  }
  &:hover ${SearchBar} {
    opacity: 1;
  }
  @media (max-width: 1280px) {
    width: 4.5vmin;
    height: 4.5vmin;
    &:hover {
      width: 40vmin;
    }
  }
  @media (max-width: 1024px) {
    width: 4.2vmin;
    height: 4.2vmin;
  }
  @media (max-width: 992px) {
    width: 4.8vmin;
    height: 4.8vmin;
  }
  @media (max-width: 750px) {
    width: 5.2vmin;
    height: 5.2vmin;
    &:hover {
      width: 40vmin;
    }
  }
  @media (max-width: 600px) {
    width: 5.8vmin;
    height: 5.8vmin;
  }
`;
