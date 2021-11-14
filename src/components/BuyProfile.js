import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { firestore } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useSelector } from 'react-redux';
import coin from '../images/limocoin.png';
import WarningAlert from './WarningAlert';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const BuyProfileDiv = styled.div`
  top: 10vmin;
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

export default function BuyProfile({ trigger, setTrigger }) {
  const currentUser = useSelector((state) => state.currentUser);
  const [changeImg, setChangeImg] = useState('');
  const [selectBuyImg, setSelectBuyImg] = useState('');
  const [selectPrice, setSelectPrice] = useState('');
  const [showCount, setShowCount] = useState(false);
  const [hasOwnAlert, setHasOwnAlert] = useState(false);
  const [overPriceAlert, setOverPriceAlert] = useState(false);

  useEffect(() => {
    firestore
      .collection('ProfileImages')
      .doc('Change')
      .get()
      .then((doc) => {
        const data = doc.data();
        setChangeImg(data.images);
      });
  }, []);

  const buyProfile = () => {
    if (currentUser.changeImg.includes(selectBuyImg)) {
      setHasOwnAlert(true);
    } else if (currentUser.coin - selectPrice < 0) {
      setOverPriceAlert(true);
    } else {
      firestore
        .collection('Users')
        .doc(currentUser.uid)
        .update({
          changeImg: firebase.firestore.FieldValue.arrayUnion(selectBuyImg),
          coin: firebase.firestore.FieldValue.increment(-selectPrice),
        });
      setSelectPrice('');
      setSelectBuyImg('');
    }
  };

  return trigger ? (
    <PopupDiv>
      <BuyProfileDiv>
        <ProfileGallery>
          {changeImg.map((item) => (
            <BuyImgSection
              onClick={() => {
                setSelectBuyImg(item.imgUrl);
                setSelectPrice(item.price);
                setShowCount(true);
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
          <CancleBtn
            onClick={() => {
              setTrigger(false);
              setSelectPrice('');
              setSelectBuyImg('');
            }}
          >
            取消
          </CancleBtn>
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
  ) : (
    ''
  );
}
