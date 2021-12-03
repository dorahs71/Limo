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

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 600,
      height: 420,
    });

  if (addOverlay && canvas !== '' && imgURL === '' && selectFriend === '') {
    let overlayRect = new fabric.Rect({
      width: canvas.get('width'),
      height: canvas.get('height'),
      selectable: false,
      fill: 'rgb(255, 255, 255, 0.3)',
    });
    canvas.add(overlayRect);

    imgURL = poster;
    fabric.Image.fromURL(
      imgURL,
      function (img) {
        canvas.setBackgroundImage(img, canvas.renderAll?.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
      },
      { crossOrigin: 'anonymous' }
    );
    setAddOverlay(false);
  }

  function backchange(e) {
    imgURL = e.target.src;
    fabric.Image.fromURL(
      imgURL,
      function (img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
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

  return (
    trigger && (
      <PopupDiv>
        <CardDiv>
          <Close
            onClick={() => {
              setTrigger(false);
              setSelectFriend('');
            }}
          >
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
  max-width: 1200px;
  height: 87%;
  padding: 20px 20px;
  position: relative;
  margin-top: -10vh;
  align-items: center;
  @media (max-width: 1280px) {
    top: 15vmin;
    max-width: 900px;
    height: 80%;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -1vmin;
  top: -6vmin;
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
  padding: -3vmin 5vmin -3vmin 5vmin;
`;

const PictureDiv = styled.div`
  width: 100%;
  margin-bottom: 5vmin;
  cursor: pointer;
`;

const Picture = styled.img`
  width: 22vmin;
  height: 18vmin;
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
  margin-top: 1vmin;
`;

const SendButton = styled(SendBtn)`
  @media (max-width: 1280px) {
    margin-left: 8vmin;
  }
`;
