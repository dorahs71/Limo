import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

const firestore = firebase.firestore();

export const addDiary = (currentUserId, movieId, poster, chTitle) => {
  const docRef = firestore
    .collection('Users')
    .doc(currentUserId)
    .collection('Diaries')
    .doc();
  docRef.set({
    diaryId: docRef.id,
    movieId,
    poster: poster,
    chTitle: chTitle,
    date: new Date(),
  });
};

export const getCurrentUserDiaries = (currentUserId, setDiaryList) => {
  return firestore
    .collection('Users')
    .doc(currentUserId)
    .collection('Diaries')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setDiaryList(data);
    });
};

export const getListIntro = (
  listId,
  isMounted,
  setUpdateList,
  setUpdateTitle,
  setUpdateIntro,
  history
) => {
  return firestore
    .collection('Lists')
    .doc(listId)
    .onSnapshot((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        if (isMounted) {
          setUpdateList(data);
          setUpdateTitle(data.listTitle);
          setUpdateIntro(data.listIntro);
        }
      } else {
        history.push('/404');
      }
    });
};

export const getListData = (listId, setListData) => {
  return firestore
    .collection('Lists')
    .doc(listId)
    .collection('ListData')
    .orderBy('date', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setListData(data);
    });
};

export const getOrderedData = (collection, field, requiredValue, setState) => {
  return firestore
    .collection(collection)
    .where(field, '==', requiredValue)
    .orderBy('date', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setState(data);
    });
};

export const getUserSubCollectionData = (userId, collection, setState) => {
  return firestore
    .collection('Users')
    .doc(userId)
    .collection(collection)
    .orderBy('date', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setState(data);
    });
};

export const getNotification = (currentUserId, setNotification) => {
  return firestore
    .collection('Users')
    .doc(currentUserId)
    .collection('Notifications')
    .orderBy('date', 'desc')
    .limit(10)
    .onSnapshot((collection) => {
      const data = collection.docs.map((doc) => {
        return doc.data();
      });
      setNotification(data);
    });
};

export const getAllUsers = (dispatch) => {
  return firestore.collection('Users').onSnapshot((collectionSnapshot) => {
    const data = collectionSnapshot.docs.map((doc) => {
      return doc.data();
    });
    dispatch({ type: 'getAllUsers', todo: data || '' });
  });
};

export const getAuthorData = (authorId, setState) => {
  return firestore
    .collection('Users')
    .doc(authorId)
    .onSnapshot((doc) => {
      const data = doc.data();
      setState(data);
    });
};

export const getPrimaryDocData = (primary, docId, setState) => {
  return firestore
    .collection(primary)
    .doc(docId)
    .onSnapshot((doc) => {
      const data = doc.data();
      setState(data);
    });
};

export const handleDeleteFollow = (docId, followId) => {
  firestore
    .collection('Users')
    .doc(docId)
    .update({
      follow: firebase.firestore.FieldValue.arrayRemove(followId),
    });
};

export const handleDeleteCollect = (docId, currentUserId) => {
  firestore
    .collection('Lists')
    .doc(docId)
    .update({
      collect: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
};

export const removeList = (docId) => {
  firestore.collection('Lists').doc(docId).delete();
};

export const removeDiary = (diaryId) => {
  const uid = auth.currentUser?.uid;
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .delete();
};

export const removeDiaryData = (docId, collection, removeId) => {
  const uid = auth.currentUser?.uid;
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(docId)
    .collection(collection)
    .doc(removeId)
    .delete();
};

export const removeListMovie = (listId, movieId) => {
  firestore
    .collection('Lists')
    .doc(listId)
    .collection('ListData')
    .doc(movieId)
    .delete();
};

export const removeMoviePoster = (listId, poster) => {
  firestore
    .collection('Lists')
    .doc(listId)
    .update({
      listPosters: firebase.firestore.FieldValue.arrayRemove(poster),
    });
};

export const updateMovielistField = (movieId, listId) => {
  firestore
    .collection('Movies')
    .doc(movieId)
    .update({
      list: firebase.firestore.FieldValue.arrayRemove(listId),
    });
};

export const updateListTitle = (listId, updateTitle) => {
  firestore.collection('Lists').doc(listId).update({
    listTitle: updateTitle,
  });
};

export const updateListIntro = (listId, updateIntro) => {
  firestore.collection('Lists').doc(listId).update({
    listIntro: updateIntro,
  });
};

export const removeCollectList = (listId, currentUserId) => {
  firestore
    .collection('Lists')
    .doc(listId)
    .update({
      collect: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
};

export const addCollectList = (listId, currentUserId) => {
  firestore
    .collection('Lists')
    .doc(listId)
    .update({
      collect: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
};

export const getVoteResult = (movieId, setVoteResult) => {
  return firestore
    .collection('Movies')
    .doc(movieId)
    .collection('Quotes')
    .orderBy('votes', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setVoteResult(data);
    });
};

export const getMainMovie = (movieId) => {
  return firestore.collection('Movies').doc(movieId).get();
};

export const getFirstComment = (field, fieldValue, lastPostRef, setComment) => {
  return firestore
    .collection('Comments')
    .where(field, '==', fieldValue)
    .orderBy('date', 'desc')
    .limit(5)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });

      lastPostRef.current =
        collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
      setComment(data);
    });
};

export const getMoreComment = (
  field,
  fieldValue,
  lastPostRef,
  comment,
  setComment
) => {
  return firestore
    .collection('Comments')
    .where(field, '==', fieldValue)
    .orderBy('date', 'desc')
    .startAfter(lastPostRef.current)
    .limit(5)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      lastPostRef.current =
        collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
      setComment([...comment, ...data]);
    });
};

export const setListShareStatus = (listId, status) => {
  firestore.collection('Lists').doc(listId).update({
    listShare: status,
  });
};

export const handleCoinNum = (authorId, value) => {
  firestore
    .collection('Users')
    .doc(authorId)
    .update({
      coin: firebase.firestore.FieldValue.increment(value),
    });
};

export const notifyList = (item, authorId, listId, currentUser, listTitle) => {
  const docRef = firestore
    .collection('Users')
    .doc(item)
    .collection('Notifications')
    .doc();

  docRef.set({
    notificationId: docRef.id,
    authorId,
    listId,
    authorName: currentUser.userName,
    authorImg: currentUser.profileImg,
    read: false,
    link: `/list/${listId}`,
    message: `${currentUser.userName}發表了新片單「${listTitle}」`,
    date: new Date(),
  });
};

export const removeSmile = (commentId, uid) => {
  firestore
    .collection('Comments')
    .doc(commentId)
    .update({
      smileBy: firebase.firestore.FieldValue.arrayRemove(uid),
    });
};

export const addSmile = (commentId, uid) => {
  firestore
    .collection('Comments')
    .doc(commentId)
    .update({
      smileBy: firebase.firestore.FieldValue.arrayUnion(uid),
    });
};

export const notifyComment = (item, authorId, currentUser, chTitle) => {
  const docRef = firestore
    .collection('Users')
    .doc(item)
    .collection('Notifications')
    .doc();

  docRef.set({
    notificationId: docRef.id,
    authorId,
    authorName: currentUser.userName,
    authorImg: currentUser.profileImg,
    read: false,
    date: new Date(),
    link: `/profile/${authorId}/comment`,
    message: `${currentUser.userName}在「${chTitle}」發表了新評論`,
  });
};

export const addNewComment = (
  movieId,
  poster,
  chTitle,
  selectedStar,
  authorId,
  comment
) => {
  const docRef = firestore.collection('Comments').doc();
  docRef.set({
    commentId: docRef.id,
    movieId,
    poster,
    chTitle,
    rate: selectedStar,
    date: new Date(),
    authorId,
    comment,
  });
};

export const addNewReview = (commentId, currentUser, newReview) => {
  firestore
    .collection('Comments')
    .doc(commentId)
    .update({
      reviews: firebase.firestore.FieldValue.arrayUnion({
        reviewDate: new Date(),
        reviewerId: currentUser.uid,
        reviewContent: newReview,
      }),
    });
};

export const adjustRate = (movieId, newRate, allComment) => {
  firestore
    .collection('Movies')
    .doc(movieId)
    .update({
      rate: newRate,
      rateNum: allComment.length + 501,
    });
};

export const getOneDiary = (uid, diaryId) => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId);
};

export const addMovieTag = (eachMovie, addTag) => {
  firestore
    .collection('Movies')
    .doc(eachMovie.movieId)
    .update({
      movieTag: firebase.firestore.FieldValue.arrayUnion(addTag),
    });
};

export const addDiaryTag = (uid, diaryId, addTag) => {
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .update({
      hashtag: firebase.firestore.FieldValue.arrayUnion(addTag),
    });
};

export const removeMovieTag = (eachMovie, tag) => {
  firestore
    .collection('Movies')
    .doc(eachMovie.movieId)
    .update({
      movieTag: firebase.firestore.FieldValue.arrayRemove(tag),
    });
};

export const removeDiaryTag = (uid, diaryId, tag) => {
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .update({
      hashtag: firebase.firestore.FieldValue.arrayRemove(tag),
    });
};

export const getDiaryQuotes = (uid, diaryId, setDiaryQuotes) => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryQuotes')
    .orderBy('date')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setDiaryQuotes(data);
    });
};

export const addDiaryQuote = (uid, diaryId) => {
  const docRef = firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryQuotes')
    .doc();
  docRef.set({
    diaryQuoteId: docRef.id,
    diaryQuote: '',
    date: new Date(),
  });
};

export const getDiaryBlock = (uid, diaryId, setDiaryBlock) => {
  return firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryData')
    .orderBy('date')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setDiaryBlock(data);
    });
};

export const addDiaryBlock = (uid, diaryId) => {
  const docRef = firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryData')
    .doc();
  docRef.set({
    diaryDataId: docRef.id,
    diaryNote: '',
    date: new Date(),
  });
};

export const updateDiaryQuote = (uid, diaryId, diaryQuoteId, editQuote) => {
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryQuotes')
    .doc(diaryQuoteId)
    .update({
      diaryQuote: editQuote,
    });
};

export const updateDiaryBlock = (uid, diaryId, diaryDataId, updateNote) => {
  firestore
    .collection('Users')
    .doc(uid)
    .collection('Diaries')
    .doc(diaryId)
    .collection('DiaryData')
    .doc(diaryDataId)
    .update({
      diaryNote: updateNote,
    });
};

export const addMovieQuote = (movieId, input) => {
  const docRef = firestore
    .collection('Movies')
    .doc(movieId)
    .collection('Quotes')
    .doc();
  docRef.set({
    movieQuoteId: docRef.id,
    option: input,
    date: new Date(),
    votes: 0,
  });
};

export const getMovieQuotes = (movieId, setGetQuote) => {
  return firestore
    .collection('Movies')
    .doc(movieId)
    .collection('Quotes')
    .orderBy('date', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setGetQuote(data);
    });
};

export const addVote = (movieId, movieQuoteId) => {
  firestore
    .collection('Movies')
    .doc(movieId)
    .collection('Quotes')
    .doc(movieQuoteId)
    .update({
      votes: firebase.firestore.FieldValue.increment(1),
    });
};

export const addListName = (uid, newList, setNewList) => {
  const docRef = firestore.collection('Lists').doc();
  docRef
    .set({
      authorId: uid,
      listId: docRef.id,
      listTitle: newList,
      date: new Date(),
      listShare: false,
      collect: [],
    })
    .then(setNewList(''));
};

export const checkListName = (id, setSelectListData) => {
  return firestore
    .collection('Lists')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data();
      return data;
    })
    .then((data) => {
      if (data.listPosters) {
        firestore
          .collection('Lists')
          .doc(id)
          .collection('ListData')
          .get()
          .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((doc) => {
              return doc.data();
            });
            setSelectListData(data);
          });
      } else {
        setSelectListData('');
      }
    });
};

export const addListPoster = (selectListId, movie) => {
  firestore
    .collection('Lists')
    .doc(selectListId)
    .update({
      listPosters: firebase.firestore.FieldValue.arrayUnion(movie.poster),
    });
};

export const addMovieListArr = (movieId, selectListId) => {
  firestore
    .collection('Movies')
    .doc(movieId)
    .update({
      list: firebase.firestore.FieldValue.arrayUnion(selectListId),
    });
};

export const addMovieListData = (selectListId, movieId, movie) => {
  firestore
    .collection('Lists')
    .doc(selectListId)
    .collection('ListData')
    .doc(movieId)
    .set({
      movieId,
      poster: movie.poster,
      chTitle: movie.chTitle,
      date: new Date(),
    });
};

export const handleSendCard = (name, selectFriend, image, currentUser) => {
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
          senderId: currentUser.uid,
          cardUrl: imageUrl,
          date: new Date(),
        });
      });
      notificationRef.set({
        notificationId: notificationRef.id,
        authorId: currentUser.uid,
        authorName: currentUser.userName,
        authorImg: currentUser.profileImg,
        link: `/profile/${selectFriend}/card`,
        message: `${currentUser.userName}送給你一張新小卡`,
        read: false,
        date: new Date(),
      });
    });
};

export const getSlickMovies = (setMovies) => {
  return firestore
    .collection('Movies')
    .where('rate', '>', '6.5')
    .orderBy('rate', 'desc')
    .limit(16)
    .get()
    .then((item) => {
      const movieList = item.docs.map((doc) => doc.data());
      setMovies(movieList);
    });
};

export const getRecentMovie = (setGetCardMovie) => {
  return firestore
    .collection('Movies')
    .where('date', '>', '2021/11/05')
    .orderBy('date')
    .limit(8)
    .get()
    .then((item) => {
      const movieData = item.docs.map((doc) => doc.data());
      setGetCardMovie(movieData);
    });
};

export const getUserProfile = (userId, setUserIntro, history) => {
  return firestore
    .collection('Users')
    .doc(userId)
    .onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setUserIntro(data);
      } else {
        history.push('/404');
      }
    });
};

export const removeFollow = (currentUserId, userId) => {
  firestore
    .collection('Users')
    .doc(currentUserId)
    .update({
      follow: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  firestore
    .collection('Users')
    .doc(userId)
    .update({
      followBy: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
};

export const addFollow = (currentUserId, userId) => {
  firestore
    .collection('Users')
    .doc(currentUserId)
    .update({
      follow: firebase.firestore.FieldValue.arrayUnion(userId),
    });
  firestore
    .collection('Users')
    .doc(userId)
    .update({
      followBy: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
};

export const getShareList = (userId, setShowShareList) => {
  return firestore
    .collection('Lists')
    .where('authorId', '==', userId)
    .where('listShare', '==', true)
    .orderBy('date', 'desc')
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setShowShareList(data);
    });
};

export const getCollectList = (userId, setShowCollect) => {
  return firestore
    .collection('Lists')
    .where('collect', 'array-contains', userId)
    .onSnapshot((collectionSnapshot) => {
      const data = collectionSnapshot.docs.map((doc) => {
        return doc.data();
      });
      setShowCollect(data);
    });
};

export const changeProfile = (currentUser, selectChangeImg) => {
  firestore.collection('Users').doc(currentUser.uid).update({
    profileImg: selectChangeImg,
  });
};

export const getChangeImages = (setChangeImg) => {
  return firestore
    .collection('ProfileImages')
    .doc('Change')
    .get()
    .then((doc) => {
      const data = doc.data();
      setChangeImg(data.images);
    });
};

export const handleChangeProfile = (currentUser, selectBuyImg, selectPrice) => {
  firestore
    .collection('Users')
    .doc(currentUser.uid)
    .update({
      changeImg: firebase.firestore.FieldValue.arrayUnion(selectBuyImg),
      coin: firebase.firestore.FieldValue.increment(-selectPrice),
    });
};

export const getCurrentUserData = (currentUserId, dispatch) => {
  return firestore
    .collection('Users')
    .doc(currentUserId)
    .onSnapshot((doc) => {
      const data = doc.data();
      dispatch({ type: 'getCurrentUser', todo: data || '' });
    });
};

export const updateNotificationReadStatus = (currentUserId, item) => {
  firestore
    .collection('Users')
    .doc(currentUserId)
    .collection('Notifications')
    .doc(item)
    .update({
      read: true,
    });
};

const googleCreateUserDoc = async (doc, imgUrl) => {
  if (doc.additionalUserInfo.isNewUser) {
    const userRef = firestore.doc(`Users/${doc.user.uid}`);
    const { email, uid, displayName } = doc.user;
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      try {
        userRef.set({
          email,
          uid,
          birthday: new Date(),
          profileImg: imgUrl,
          changeImg: [imgUrl],
          userName: displayName,
          coin: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
};

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const handleGoogleLogin = (imgUrl, setTrigger, history) => {
  auth.signInWithPopup(googleProvider).then((doc) => {
    googleCreateUserDoc(doc, imgUrl);
    history.push('/');
    setTrigger(false);
  });
};

export const checkLogin = (
  email,
  password,
  history,
  setTrigger,
  setShowError
) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      history.push('/');
      setTrigger(false);
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          setShowError('請輸入有效的email');
          break;
        case 'auth/user-not-found':
          setShowError('這個信箱還沒註冊過呦');
          break;
        case 'auth/wrong-password':
          setShowError('密碼錯誤，請再確認呦');
          break;
        default:
      }
    });
};

const createUserDoc = async (user, userName, imgUrl) => {
  if (!user) return;
  const userRef = firestore.doc(`Users/${user.uid}`);
  const { email, uid } = user;
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      userRef.set({
        email,
        uid,
        birthday: new Date(),
        profileImg: imgUrl,

        changeImg: [imgUrl],
        userName,
        coin: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

export const checkRegister = (
  email,
  password,
  userName,
  confirm,
  imgUrl,
  setShowError,
  history,
  setTrigger
) => {
  if (password === confirm) {
    setShowError('');
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        createUserDoc(user, userName, imgUrl);
        history.push('/');
        setTrigger(false);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setShowError('這個信箱已經註冊囉');
            break;
          case 'auth/invalid-email':
            setShowError('請輸入有效的email');
            break;
          case 'auth/weak-password':
            setShowError('密碼要輸入至少六位喔');
            break;
          default:
        }
      });
  } else {
    setShowError('您的密碼與確認密碼欄位不一致');
  }
};

export const getProfileImg = (setProfileArr) => {
  return firestore
    .collection('ProfileImages')
    .doc('Change')
    .get()
    .then((doc) => {
      setProfileArr(doc.data().images);
    });
};
