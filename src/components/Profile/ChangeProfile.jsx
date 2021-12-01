import styled from 'styled-components';
import { useState } from 'react';
import { changeProfile } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { PopupDiv, SendBtn, CancelBtn } from '../Common/Common.style';

export default function ChangeProfile({ trigger, setTrigger }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [selectChangeImg, setSelectChangeImg] = useState('');

  const handleChangeProfile = () => {
    changeProfile(currentUser, selectChangeImg);
    setTrigger(false);
  };

  return (
    trigger && (
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
            <CancelBtn
              onClick={() => {
                setTrigger(false);
              }}
            >
              取消
            </CancelBtn>
            <SendBtn onClick={handleChangeProfile}>確認更換</SendBtn>
          </BtnDiv>
        </ChangeProfileDiv>
      </PopupDiv>
    )
  );
}

const ChangeProfileDiv = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  font-size: 2.5vmin;
  padding: 5vmin;
  position: relative;
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
  object-fit: contain;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
`;
