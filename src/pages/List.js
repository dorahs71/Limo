import styled from 'styled-components';
import ToggleBtn from '../components/Toggle';
import {
  Save,
  CancelOutlined,
  LocalOffer,
  AddCircle,
} from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase';
import firebase from '../utils/firebase';
import { useParams } from 'react-router-dom';
import ListBlock from '../components/ListBlock';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const ListSection = styled.div`
  display: flex;
  width: 100%;
  padding: 15vmin 0 5vmin 0;
  justify-content: center;
`;

const ListHead = styled.div`
  display: flex;
  align-items: center;
`;
const ListContainer = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
`;

const ProfileImgDiv = styled.div`
  width: 20vmin;
  height: 20vmin;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ProfileImg = styled.img`
  width: 20vmin;
  height: 15vmin;
  @media (max-width: 1280px) {
  }
`;

const ProfileName = styled.div`
  font-size: 24px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListIntroDiv = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: center;
  margin-left: 8vmin;
  @media (max-width: 1280px) {
  }
`;

const SaveIcon = styled(Save)`
  transform: scale(1.5);
  color: #555;
  cursor: pointer;
  &:hover {
    color: #00cca3;
  }
`;

const TitleSaveDiv = styled.div`
  width: 5vmin;
  height: 5vmin;
  margin-top: 3vmin;
  margin-left: 2vmin;
  color: #555;
  cursor: pointer;
  display: block;
  &:hover {
    color: #00cca3;
  }
`;

const EditTitle = styled.div`
  display: flex;
  align-items: center;
  /* &:focus-within ${TitleSaveDiv} {
    display: block;
  } */
`;

const ListTitle = styled.input`
  background: transparent;
  color: #ffaf1a;
  width: 100%;
  text-align: center;
  font-size: 35px;
  font-weight: 700;
  border: 0;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
    border-bottom: 3px solid #ffaf1a;
  }
`;

const IntroSaveDiv = styled.div`
  width: 4vmin;
  height: 4vmin;
  margin-top: 22vmin;
  margin-left: 2vmin;
  color: #555;
  cursor: pointer;
  display: block;
  &:hover {
    color: #00cca3;
  }
`;

const ListIntro = styled.textarea`
  margin-top: 5vmin;
  background: transparent;
  width: 100%;
  color: #fffaf0;
  height: 20vmin;
  overflow: scroll;
  border-radius: 5px;
  font-size: 23px;
  border: 2px #222 inset;
  resize: none;
  ::placeholder {
    color: #555;
  }
  &:focus {
    outline: 0;
    border: 2px inset #ffaf1a;
  }
`;

const EditIntro = styled.div`
  display: flex;
  width: 100%;
  &:focus-within ${IntroSaveDiv} {
    display: block;
  }
`;

const ToggleStatusDiv = styled.div`
  margin-top: 3vmin;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #555;
  border-radius: 20px;
`;

const Status = styled.div`
  font-size: 20px;
`;

const ThemeListDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HashtagSection = styled.div`
  padding: 10vmin 5vmin 5vmin 5vmin;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const HashtagContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 5vmin 5vmin 5vmin 7vmin;
`;

const HashtagHead = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5vmin;
  justify-content: center;
  align-items: center;
`;

const AddHashtag = styled.input`
  width: 100%;
  height: 3vmin;
  font-size: 25px;
  padding: 10px;
  background: #444;
  border: 0;
  color: #fff8dc;
  border-bottom: 3px solid rgba(127, 255, 212, 0.7);
  &:focus {
    outline: 0;
  }
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 5px 5px;
  right: -34px;
  top: -3px;
  display: none;
`;

const CancelIcon = styled(CancelOutlined)`
  transform: scale(1.15);
  color: #f08080;
  border-radius: 50%;
`;

const HashtagDiv = styled.div`
  display: flex;
  margin: 2vmin 7vmin 0 0vmin;
  width: auto;
  position: relative;
  &:hover ${Close} {
    display: flex;
  }
`;

const Hashtag = styled.div`
  font-size: 23px;
  margin-left: 1vmin;
`;

const TagIcon = styled(LocalOffer)`
  transform: scale(1.5);
  color: #7fffd4;
`;

const AddBtn = styled(AddCircle)`
  transform: scale(1.6);
  margin-left: 3vmin;
  cursor: pointer;
  &:hover {
    color: #75e799;
  }
`;

const ArrangeListDiv = styled.div`
  width: 100%;
  height: auto;
  margin-top: 5vmin;
`;

export default function List() {
  const [addTag, setAddTag] = useState('');
  const [updateList, setUpdateList] = useState('');
  const { listId } = useParams();
  const [listData, setListData] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateIntro, setUpdateIntro] = useState('');
  // const [listOrder, setListOrder] = useState({ initialOrder });

  const uid = auth.currentUser?.uid;

  // const initialOrder = listData;

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (isMounted) setUpdateList(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid]);

  useEffect(() => {
    let isMounted = true;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .collection('ListData')
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        if (isMounted) setListData(data);
      });
    return () => {
      isMounted = false;
    };
  }, [uid, listId]);

  const handleUpdateListTitle = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .update({
        listTitle: updateTitle,
      });
  };

  const handleUpdateListIntro = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .update({
        listIntro: updateIntro,
      });
  };

  const handleAddTag = () => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .update({
        hashtag: firebase.firestore.FieldValue.arrayUnion(addTag),
      });
    setAddTag('');
  };

  const removeTag = (tag) => {
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .update({
        hashtag: firebase.firestore.FieldValue.arrayRemove(tag),
      });
  };

  // const reorder = (list, startIndex, endIndex) => {
  //   const result = Array.from(list);
  //   const [removed] = result.splice(startIndex, 1);
  //   result.splice(endIndex, 0, removed);

  //   return result;
  // };

  // const onDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   if (result.destination.index === result.source.index) {
  //     return;
  //   }
  //   const newOrder = reorder(
  //     listOrder,
  //     result.source.index,
  //     result.destination.index
  //   );

  //   setListOrder({ newOrder });
  // };

  return (
    <ListSection>
      <ListContainer>
        <ListHead>
          <ProfileContainer>
            <ProfileImgDiv>
              <ProfileImg
                src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fbaby.png?alt=media&token=7e617ed2-9a96-4192-8847-c07d8f642228"
                alt=""
              />
            </ProfileImgDiv>
            <ProfileName>愛的小貝比</ProfileName>
            <ToggleStatusDiv>
              <Status>私人</Status>
              <ToggleBtn />
              <Status>分享</Status>
            </ToggleStatusDiv>
          </ProfileContainer>

          <ListIntroDiv>
            <EditTitle>
              <ListTitle
                placeholder="請寫下片單名稱..."
                defaultValue={updateList?.listTitle || ''}
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />
              <TitleSaveDiv onClick={handleUpdateListTitle}>
                <SaveIcon />
              </TitleSaveDiv>
            </EditTitle>
            <EditIntro>
              <ListIntro
                placeholder="這個片單是關於..."
                defaultValue={updateList?.listIntro || ''}
                onChange={(e) => {
                  setUpdateIntro(e.target.value);
                }}
              />
              <IntroSaveDiv onClick={handleUpdateListIntro}>
                <SaveIcon />
              </IntroSaveDiv>
            </EditIntro>
          </ListIntroDiv>
        </ListHead>
        <ThemeListDiv>
          <HashtagSection>
            <HashtagHead>
              <AddHashtag
                placeholder="寫下我的電影標籤"
                value={addTag}
                onChange={(e) => setAddTag(e.target.value)}
              />
              <AddBtn onClick={handleAddTag} />
            </HashtagHead>
            <HashtagContainer>
              {updateList?.hashtag?.map((keyword) => {
                return (
                  <HashtagDiv key={keyword}>
                    <Close onClick={() => removeTag(keyword)}>
                      <CancelIcon />
                    </Close>
                    <TagIcon />
                    <Hashtag>{keyword}</Hashtag>
                  </HashtagDiv>
                );
              })}
            </HashtagContainer>
          </HashtagSection>
          {/* <DragDropContext onDragEnd={onDragEnd}> */}
          <DragDropContext>
            <Droppable droppableId="list">
              {(provided) => (
                <ArrangeListDiv
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {listData !== '' &&
                    listData.map((item, index) => (
                      <ListBlock
                        key={item.listDataId}
                        index={index}
                        listDataId={item.listDataId}
                        movieId={item.movieId}
                        chTitle={item.chTitle}
                        listNote={item.listNote}
                        poster={item.poster}
                      />
                    ))}
                  {provided.placeholder}
                </ArrangeListDiv>
              )}
            </Droppable>
          </DragDropContext>
        </ThemeListDiv>
      </ListContainer>
    </ListSection>
  );
}
