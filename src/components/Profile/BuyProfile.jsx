import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getChangeImages, handleChangeProfile } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import coin from '../../images/limocoin.png';
import WarningAlert from '../Common/WarningAlert';
import { PopupDiv, SendBtn, CancelBtn } from '../Common/Common.style';

export default function BuyProfile({ trigger, setTrigger }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [changeImg, setChangeImg] = useState('');
  const [selectBuyImg, setSelectBuyImg] = useState('');
  const [selectPrice, setSelectPrice] = useState('');
  const [hasOwnAlert, setHasOwnAlert] = useState(false);
  const [overPriceAlert, setOverPriceAlert] = useState(false);

  useEffect(() => {
    getChangeImages(setChangeImg);
  }, []);

  const buyProfile = () => {
    if (currentUser.changeImg.includes(selectBuyImg)) {
      setHasOwnAlert(true);
    } else if (currentUser.coin - selectPrice < 0) {
      setOverPriceAlert(true);
    } else {
      handleChangeProfile(currentUser, selectBuyImg, selectPrice);
      setSelectPrice('');
      setSelectBuyImg('');
    }
  };

  return (
    trigger && (
      <PopupDiv>
        <BuyProfileDiv>
          <ProfileGallery>
            {changeImg.map((item) => (
              <BuyImgSection
                onClick={() => {
                  setSelectBuyImg(item.imgUrl);
                  setSelectPrice(item.price);
                }}
                select={selectBuyImg === item.imgUrl}
              >
                <BuyImgDiv>
                  <MyImg src={item.imgUrl} alt="" />
                </BuyImgDiv>
                <PriceDiv>
                  <Coin src={coin} alt="" />
                  <Price>{item.price}</Price>
                </PriceDiv>
              </BuyImgSection>
            ))}
          </ProfileGallery>

          <CountDiv>
            <NowHave>
              目前持有：<Price>{currentUser.coin} </Price>
            </NowHave>
            <Reduce>頭像價格：{selectPrice}</Reduce>
            <Surplus
              over={currentUser.coin - selectPrice < 0 ? 'red' : '#7fffd4'}
            >
              {currentUser.coin - selectPrice}
            </Surplus>
          </CountDiv>
          <BtnDiv>
            <CancelBtn
              onClick={() => {
                setTrigger(false);
                setSelectPrice('');
                setSelectBuyImg('');
              }}
            >
              取消
            </CancelBtn>
            <SendBtn onClick={buyProfile}>確認購買</SendBtn>
          </BtnDiv>
        </BuyProfileDiv>
        <WarningAlert
          trigger={hasOwnAlert}
          setTrigger={setHasOwnAlert}
          message={'你已經擁有這個頭像囉!'}
        />
        <WarningAlert
          trigger={overPriceAlert}
          setTrigger={setOverPriceAlert}
          message={'你的LIMO幣不足，請努力發表評論和片單呦!!'}
        />
      </PopupDiv>
    )
  );
}

const BuyProfileDiv = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  font-size: 2.5vmin;
  padding: 5vmin;
  position: relative;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const MyImg = styled.img`
  width: 15vmin;
  height: 15vmin;
  margin: 0 auto;
  object-fit: contain;
`;

const ProfileGallery = styled.div`
  width: 80%;
  display: grid;
  padding: 2vmin 3vmin;
  background: #555;
  border-radius: 10px;
  overflow: scroll;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 4vmin 0;
`;

const BuyImgSection = styled.div`
  cursor: pointer;
  width: 20vmin;
  height: 20vmin;
  padding: 0.5vmin;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  flex-direction: column;
  background: ${(props) => (props.select ? '#66cdaa' : '')};
  color: ${(props) => (props.select ? '#333' : '')};
  &:hover {
    background: #66cdaa;
    color: #333;
  }
`;

const BuyImgDiv = styled.div`
  display: block;
`;

const PriceDiv = styled.div`
  display: flex;
  width: 100%;
  font-size: 2.5vmin;
  align-items: center;
  justify-content: center;
`;

const Coin = styled.img`
  width: 4vmin;
  height: 4vmin;
  margin-right: 3px;
`;

const Price = styled.div``;

const CountDiv = styled.div`
  margin-top: 4vmin;
  display: flex;
  font-size: 2.5vmin;
  flex-direction: column;
`;

const NowHave = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Reduce = styled.div`
  border-bottom: 1px solid #66cdaa;
`;

const Surplus = styled.div`
  text-align: center;
  color: ${(props) => props.over};
`;

const BtnDiv = styled.div`
  display: flex;
  width: 30%;
  justify-content: space-around;
`;
