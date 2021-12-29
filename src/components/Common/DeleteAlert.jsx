import {
  removeListMovie,
  removeMoviePoster,
  updateMovielistField,
  removeMovieTag,
  removeDiaryTag,
} from '../../utils/firebase';
import ask from '../../images/ask.png';
import AOS from 'aos';
import { useEffect } from 'react';
import {
  PopupDiv,
  AlertWindow,
  AlertWord,
  AlertImg,
  BtnDiv,
  SendBtn,
  CancelBtn,
} from './Common.style';

const noScroll = (trigger) => {
  if (trigger) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }
};

export function RemoveArrayDataAlert({
  trigger,
  setTrigger,
  message,
  remove,
  docId,
  removeId,
}) {
  useEffect(() => {
    AOS.init({ duration: 250 });
  }, []);

  noScroll(trigger);

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={ask} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                remove(docId, removeId);
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}

export function RemoveDocAlert({
  trigger,
  setTrigger,
  message,
  remove,
  docId,
}) {
  useEffect(() => {
    AOS.init({ duration: 250 });
  }, []);

  noScroll(trigger);

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={ask} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                remove(docId);
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}

export function RemoveDiaryDataAlert({
  trigger,
  setTrigger,
  message,
  remove,
  collection,
  docId,
  removeId,
}) {
  useEffect(() => {
    AOS.init({ duration: 250 });
  }, []);

  noScroll(trigger);

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={ask} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                remove(docId, collection, removeId);
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}

export function RemoveListMovieAlert({
  trigger,
  setTrigger,
  message,
  listId,
  movieId,
  poster,
}) {
  useEffect(() => {
    AOS.init({ duration: 250 });
  }, []);

  noScroll(trigger);

  const handleDeleteMovie = () => {
    removeListMovie(listId, movieId);
    removeMoviePoster(listId, poster);
    updateMovielistField(movieId, listId);
  };

  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={ask} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                handleDeleteMovie();
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}

export function TagDeleteAlert({
  trigger,
  setTrigger,
  message,
  eachMovie,
  uid,
  diaryId,
  tag,
}) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  noScroll(trigger);

  const removeTag = () => {
    removeMovieTag(eachMovie, tag);
    removeDiaryTag(uid, diaryId, tag);
  };
  return (
    trigger && (
      <PopupDiv>
        <AlertWindow data-aos="zoom-in">
          <AlertImg src={ask} alt="" />
          <AlertWord>{message}</AlertWord>
          <BtnDiv>
            <CancelBtn onClick={() => setTrigger(false)}>取消</CancelBtn>
            <SendBtn
              onClick={() => {
                removeTag();
                setTrigger(false);
              }}
            >
              確認
            </SendBtn>
          </BtnDiv>
        </AlertWindow>
      </PopupDiv>
    )
  );
}
