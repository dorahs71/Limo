import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { handleSendCard } from '../../utils/firebase';
import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import { PopupDiv, CancelIcon, SendBtn } from '../Common/Common.style';
import CardFriendDiv from './CardFriendDiv';
import EditCardText from './EditCardText';
import WarningAlert from '../Common/WarningAlert';

export default function Card({
  trigger,
  setTrigger,
  poster,
  gallery,
  setSendCardAlert,
}) {
  const [canvas, setCanvas] = useState('');
  const [selectFriend, setSelectFriend] = useState('');
  const [addOverlay, setAddOverlay] = useState(false);
  const [friendAlert, setFriendAlert] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const currentUserId = currentUser.uid;

  let imgURL = '';

  useEffect(() => {
    setCanvas(initCanvas());
    setAddOverlay(true);
  }, [trigger]);

  let initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 600,
      height: 420,
    });

  if (
    addOverlay &&
    canvas !== undefined &&
    imgURL === '' &&
    selectFriend === ''
  ) {
    imgURL = poster;
    fabric.Image.fromURL(
      imgURL,
      function (img) {
        let ratio = (600 / img.width) * 0.47;
        canvas.setHeight(img.height * ratio);
        canvas.setWidth(img.width * ratio);

        let overlayRect = new fabric.Rect({
          width: canvas.get('width'),
          height: canvas.get('height'),
          selectable: false,
          fill: 'rgb(255, 255, 255, 0.3)',
        });
        canvas.add(overlayRect);

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.height / img.height,
          scaleY: canvas.height / img.height,
        });
      },

      { crossOrigin: 'anonymous' }
    );
    setAddOverlay(false);
  }

  function backchange(e) {
    let lastOverlay = canvas.getObjects()[0];
    canvas.remove(lastOverlay);

    imgURL = e.target.src;
    fabric.Image.fromURL(
      imgURL,
      function (img) {
        if (img.height > img.width) {
          let ratio = (600 / img.width) * 0.47;
          canvas.setHeight(img.height * ratio);
          canvas.setWidth(img.width * ratio);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.height / img.height,
            scaleY: canvas.height / img.height,
          });
        } else {
          let ratio = (600 / img.width) * 0.8;
          canvas.setHeight(img.height * ratio);
          canvas.setWidth(img.width * ratio);
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.width / img.width,
          });
        }

        let overlayRect = new fabric.Rect({
          width: canvas.get('width'),
          height: canvas.get('height'),
          selectable: false,
          fill: 'rgb(255, 255, 255, 0.3)',
        });
        canvas.add(overlayRect);
      },
      { crossOrigin: 'anonymous' }
    );
  }

  const sendCard = () => {
    if (!selectFriend) {
      setFriendAlert(true);
    } else {
      const image = canvas.toDataURL();
      let name = currentUserId + '/' + new Date().getTime() + '.png';
      handleSendCard(name, selectFriend, image, currentUser);
      setTrigger(false);
      setSendCardAlert(true);
    }
  };

  const removeStatus = () => {
    setTrigger(false);
    setSelectFriend('');
  };

  return (
    trigger && (
      <PopupDiv>
        <CardDiv>
          <Close onClick={removeStatus}>
            <CancelIcon />
          </Close>
          <EditDiv>
            <canvas id="canvas" />
            <EditCardText trigger={trigger} canvas={canvas} />
            <GalleryDiv>
              <PictureDiv>
                <Picture src={poster} alt="" onClick={(e) => backchange(e)} />
              </PictureDiv>
              {gallery !== '' &&
                gallery.map((item, index) => (
                  <PictureDiv key={index}>
                    <Picture src={item} alt="" onClick={(e) => backchange(e)} />
                  </PictureDiv>
                ))}
            </GalleryDiv>
          </EditDiv>
          <SendDiv>
            <CardFriendDiv
              trigger={trigger}
              selectFriend={selectFriend}
              setSelectFriend={setSelectFriend}
              currentUser={currentUser}
            />
            <SendButton onClick={sendCard}>發送卡片</SendButton>
          </SendDiv>
        </CardDiv>
        <WarningAlert
          trigger={friendAlert}
          setTrigger={setFriendAlert}
          message={'尚未指定送小卡的朋友喔！'}
        />
      </PopupDiv>
    )
  );
}

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 2.5vmin;
  max-width: 85vw;
  height: 40vw;
  padding: 1vw 1vw;
  position: relative;
  margin-top: 5vw;
  align-items: center;
  @media (max-width: 1560px) {
    margin-top: 6vw;
    max-width: 80vw;
    height: 35vw;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -1vw;
  top: -6vw;
  z-index: 300;
  color: #c5cdc0;
  &:hover {
    color: #75e799;
  }
`;

const GalleryDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  padding: -3vw 8vw -3vw 8vw;
  margin-left: 2vw;
`;

const PictureDiv = styled.div`
  width: 100%;
  margin-bottom: 2vw;
  cursor: pointer;
`;

const Picture = styled.img`
  width: 13vw;
  height: 10vw;
  object-fit: contain;
`;

const EditDiv = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SendDiv = styled.div`
  width: 100%;
  height: 20%;
  color: #fff;
  display: flex;
  align-items: center;
  margin-top: 1vw;
  @media (max-width: 1440px) {
    margin-top: 3vw;
    margin-left: 3vw;
  }
  @media (max-width: 1280px) {
    margin-top: 5vw;
    margin-left: 0;
  }
`;

const SendButton = styled(SendBtn)`
  width: 15%;

  @media (max-width: 1560px) {
    margin-left: 2.5vw;
  }
  @media (max-width: 1440px) {
    margin-left: 3vw;
  }
  @media (max-width: 1280px) {
    margin-right: 2vw;
  }
`;
