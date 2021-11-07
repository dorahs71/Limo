import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import {
  Cancel,
  DeleteOutlined,
  TextFields,
  FormatBold,
} from '@material-ui/icons';
// import { auth, firestore } from '../utils/firebase';
// import firebase from '../utils/firebase';
import { fabric } from 'fabric';

const PopupDiv = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(22, 22, 22, 0.8);
  z-index: 100;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
  width: 80%;
  height: 87%;
  background: #333;
  padding: 20px 20px;
  position: relative;
  top: 100px;
  margin: 0 auto;
  align-items: center;
  @media (max-width: 1280px) {
    top: 5vmin;
    font-size: 25px;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -10px;
  top: -10px;
  z-index: 300;
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const CanvasDiv = styled.canvas``;

const TextFunction = styled.div`
  width: 10vmin;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AddText = styled(TextFields)`
  transform: scale(1.5);
  color: #75e799;
  cursor: pointer;
  margin-bottom: 3vmin;
`;

const ColorInput = styled.input`
  margin-bottom: 3vmin;
`;

const BoldText = styled(FormatBold)`
  transform: scale(1.5);
  color: #75e799;
  cursor: pointer;
  margin-bottom: 3vmin;
`;

const DeleteText = styled(DeleteOutlined)`
  transform: scale(1.5);
  color: #75e799;
  cursor: pointer;
  margin-bottom: 3vmin;
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
  margin-top: 5vmin;
`;

const FriendDiv = styled.div`
  display: flex;
  overflow: scroll;
  width: 80%;
  background: #666;
  border-radius: 20px;
  padding: 2px 2px 0 2px;
`;

const SendButton = styled.div`
  background: #00ffff;
  width: 15vmin;
  height: 10vmin;
  border-radius: 10px;
  font-size: 20px;
  color: #333;
  text-align: center;
  line-height: 10vmin;
  cursor: pointer;
  margin-left: 8vmin;
`;

const FollowDiv = styled.div`
  display: flex;
  position: relative;
  margin-right: 3vmin;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.select ? '#333' : '')};
  background: ${(props) => (props.select ? 'gold' : '')};
  &:hover {
    color: #333;
    background: gold;
  }
`;

const FollowImg = styled.img`
  width: 13vmin;
  height: 10vmin;
`;

const FollowName = styled.div`
  font-size: 16px;
  text-align: center;
`;

export default function Card({ trigger, setTrigger, poster, gallery }) {
  const [canvas, setCanvas] = useState('');
  const [addOverlay, setAddOverlay] = useState(true);
  const [color, setColor] = useState('#000');
  const [userData, setUserData] = useState('');
  const [selectFriend, setSelectFriend] = useState('');

  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) setCanvas(initCanvas());
    return () => {
      isMounted = false;
    };
  }, [trigger]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .get()
      .then((collection) => {
        const data = collection.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setUserData(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  let friendData = [];

  if (trigger) {
    const currentUser = userData.find(({ uid }) => uid === currentUserId);
    const friendList = currentUser.follow.filter((element) =>
      currentUser.followBy.includes(element)
    );
    friendList.map((item) => {
      const data = userData.find(({ uid }) => uid === item);
      friendData.push(data);
      return data;
    });
  }

  const initCanvas = () =>
    new fabric.Canvas('canvas', {
      width: 580,
      height: 450,
    });

  function backchange(e) {
    if (canvas !== '' && addOverlay) {
      let overlayRect = new fabric.Rect({
        width: canvas?.get('width'),
        height: canvas?.get('height'),
        selectable: false,
        fill: 'rgb(255, 255, 255, 0.5)',
      });

      canvas.add(overlayRect);
      setAddOverlay(false);
    }
    const imgURL = e.target.src;
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

  function addText() {
    const editText = new fabric.IText('點我編輯', {
      top: 200,
      left: 300,
      fontSize: 50,
    });
    canvas.add(editText);
  }

  function toggleBoldText() {
    const obj = canvas.getActiveObject();
    if (trigger && obj !== null) {
      canvas.getActiveObject().set('fontWeight', 'bold');
      canvas.renderAll();
    }
  }

  const handleTextColor = (e) => {
    if (trigger && e.target !== null) {
      setColor(e.target.value);
      canvas.getActiveObject().set('fill', color);
      canvas.renderAll();
    }
  };

  const deleteText = () => {
    const obj = canvas.getActiveObject();
    if (trigger && obj !== null) {
      canvas.remove(obj);
    }
  };

  const sendCard = () => {
    const image = canvas.toDataURL();
    let name = currentUserId + '/' + new Date().getTime() + '.png';
    const uploadTask = firebase.storage().ref('cards/').child(name);
    const cardRef = firestore
      .collection('Users')
      .doc(selectFriend)
      .collection('Cards')
      .doc();
    const notificationRef = firestore
      .collection('Users')
      .doc(selectFriend)
      .collection('Notifications')
      .doc();
    uploadTask
      .putString(image.split(',')[1], 'base64', { contentType: 'image/png' })
      .then(() => {
        uploadTask.getDownloadURL().then((imageUrl) => {
          cardRef.set({
            cardId: cardRef.id,
            senderId: currentUserId,
            cardUrl: imageUrl,
            date: new Date(),
          });
        });
        notificationRef.set({
          senderId: currentUserId,
          type: 'card',
          read: false,
          date: new Date(),
        });
      });
    setTrigger(false);
  };

  return trigger ? (
    <PopupDiv>
      <CardDiv>
        <Close
          onClick={() => {
            setTrigger(false);
          }}
        >
          <CancelIcon />
        </Close>
        <EditDiv>
          <CanvasDiv id="canvas" />
          <TextFunction>
            <AddText onClick={addText} />
            <ColorInput
              type="color"
              value={color}
              onChange={(e) => {
                handleTextColor(e);
              }}
              id="text-color"
              size="10"
            />
            <BoldText onClick={toggleBoldText} />
            <DeleteText onClick={deleteText} />
          </TextFunction>
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
          <FriendDiv>
            {friendData?.map((item) => (
              <FollowDiv
                key={item.uid}
                onClick={() => {
                  setSelectFriend(item.uid);
                }}
                select={selectFriend === item.uid}
              >
                <FollowImg src={item.profileImg} alt="" />
                <FollowName>{item.userName}</FollowName>
              </FollowDiv>
            ))}
          </FriendDiv>
          <SendButton onClick={sendCard}>發送卡片</SendButton>
        </SendDiv>
      </CardDiv>
    </PopupDiv>
  ) : (
    ''
  );
}
