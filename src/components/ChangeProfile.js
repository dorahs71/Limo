import styled from 'styled-components';
import { useState } from 'react';
import { firestore } from '../utils/firebase';
import { useSelector } from 'react-redux';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(10, 10, 10, 0.9);
  z-index: 100;
`;

const ChangeProfileDiv = styled.div`
  top: 20vmin;
  display: flex;
  width: 80%;
  flex-direction: column;
  font-size: 2.5vmin;
  padding: 5vmin;
  position: relative;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const OwnProfile = styled.div`
  width: 80%;
  margin-top: 10vmin;
  display: flex;
  padding: 2vmin 4vmin;
  overflow: scroll;
`;

const MyImgDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16vmin;
  height: 16vmin;
  margin-right: 8vmin;
  background: ${(props) => (props.select ? 'gold' : '')};
  border-radius: 10px;
  &:hover {
    background: gold;
  }
`;

const MyImg = styled.img`
  width: 15vmin;
  height: 15vmin;
  margin: 0 auto;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
`;

const SendBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  background: #898f86;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #333;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #cad2c6;
  }
`;

const CancleBtn = styled.div`
  margin-top: 3vmin;
  padding: 0.8vmin 1vmin;
  font-size: 2.5vmin;
  font-weight: 400;
  box-shadow: rgba(20, 20, 20, 0.3) 0px 1px 2px 0px,
    rgba(20, 20, 20, 0.15) 0px 1px 3px 1px;
  color: #898f86;
  border: 1px solid #898f86;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #cad2c6;
    color: #333;
  }
`;

export default function ChangeProfile({ trigger, setTrigger }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [selectChangeImg, setSelectChangeImg] = useState('');

  const changeProfile = () => {
    firestore.collection('Users').doc(currentUser.uid).update({
      profileImg: selectChangeImg,
    });
    setTrigger(false);
  };

  return trigger ? (
    <PopupDiv>
      <ChangeProfileDiv>
        <OwnProfile>
          {currentUser.changeImg.map((item) => (
            <MyImgDiv
              onClick={() => setSelectChangeImg(item)}
              select={selectChangeImg === item}
            >
              <MyImg src={item} alt="" />
            </MyImgDiv>
          ))}
        </OwnProfile>
        <BtnDiv>
          <CancleBtn
            onClick={() => {
              setTrigger(false);
            }}
          >
            取消
          </CancleBtn>
          <SendBtn onClick={changeProfile}>確認更換</SendBtn>
        </BtnDiv>
      </ChangeProfileDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
