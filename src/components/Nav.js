import styled from 'styled-components';
import logo from '../images/logo.png';
import profilePic from '../images/baby.png';
import { NotificationsNone, SearchOutlined } from '@material-ui/icons';

const NavDiv = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  color: #fff;
  z-index: 100;
  background: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(
      130deg,
      transparent,
      #75e799 20.07%,
      #f8ff00 50.07%,
      #319197 76.05%,
      transparent
    );
  }
`;

const Logo = styled.img`
  margin-left: 30px;
  width: 80px;
  height: 60px;
`;

const FunctionDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  margin-left: auto;
`;

const SearchIcon = styled(SearchOutlined)`
  transform: scale(1.3);
  color: #fff;
  margin-top: 4px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  height: 40px;
  font-size: 1.2rem;
  padding: 0 0.5em;
  border: 0;
  color: #fff;
  position: absolute;
  top: 0;
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
    font-size: 1.2rem;
    color: #d3d3d3;
  }
`;

const SearchDiv = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  color: #fff;
  background: #111;
  box-sizing: border-box;
  background-clip: padding-box;
  border: 2px solid #75e799;
  z-index: 0;
  border-radius: 50px;
  margin-right: 40px;
  padding: 3px;
  transition: width 500ms ease-in-out;
  position: relative;
  overflow: hidden;
  &:focus-within {
    width: 20rem;
  }
  &:focus-within ${SearchBtn} {
    background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
  }
  &:focus-within ${SearchIcon} {
    color: #333;
    transition: color 150ms ease-in-out;
  }
  &:focus-within ${SearchBar} {
    opacity: 1;
  }
`;

const BellIcon = styled(NotificationsNone)`
  transform: scale(1.6);
  margin-right: 30px;
  cursor: pointer;
`;

const InfoDiv = styled.div`
  position: absolute;
  font-weight: bold;
  right: 30px;
  top: 100px;
  width: 12rem;
  height: 10rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  font-size: 18px;
  background: linear-gradient(180deg, #444, #000);
  box-shadow: 2px 2px 10px 2px #75e799;
  border-radius: 30px;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 55px;
  margin-right: 30px;
  cursor: pointer;
`;

const ProfileDiv = styled.div`
  display: block;
  &:hover ${InfoDiv} {
    display: flex;
  }
`;

export default function Nav() {
  return (
    <NavDiv>
      <Logo src={logo} alt="logo" />
      <FunctionDiv>
        <SearchDiv>
          <SearchBar type="text" placeholder="今天想看什麼電影？" />
          <SearchBtn>
            <SearchIcon />
          </SearchBtn>
        </SearchDiv>
        <BellIcon />
        <ProfileDiv>
          <ProfilePic src={profilePic} />
          <InfoDiv>
            <div>暱稱：愛的小貝比</div>
            <div>日誌：30</div>
            <div>片單：30</div>
            <div>收藏：30</div>
          </InfoDiv>
        </ProfileDiv>
      </FunctionDiv>
    </NavDiv>
  );
}
