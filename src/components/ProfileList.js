import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cancel } from '@material-ui/icons';
import { firestore, auth } from '../utils/firebase';

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  display: none;
  padding: 5px 5px;
  right: -30px;
  top: -7vmin;
  z-index: 300;
  @media (max-width: 1280px) {
    right: -30px;
    top: 20px;
  }
`;

const CancelIcon = styled(Cancel)`
  transform: scale(1.5);
  color: #75e799;
  background: #333;
  border-radius: 50%;
`;

const ListDiv = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    height: 45vmin;
    /* margin: 20px 30px; */
  }
  &:hover ${Close} {
    display: block;
  }
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 0px;
  z-index: 3;
  box-shadow: 1px 1px 10px 1px;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  @media (max-width: 1280px) {
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 50px;
  z-index: 4;
  box-shadow: 1px 1px 10px 1px;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 23vmin;
  height: 28vmin;
  right: 100px;
  z-index: 5;
  box-shadow: 1px 1px 10px 1px #333;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;

const ListTitle = styled.div`
  margin-top: 32vmin;
  font-size: 25px;
  @media (max-width: 1280px) {
    font-size: 20px;
    margin-left: 8vmin;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  width: 100%;
`;

export default function ProfileList({ title, posters, listId }) {
  const handleDeleteList = () => {
    const uid = auth.currentUser.uid;
    firestore
      .collection('Users')
      .doc(uid)
      .collection('Lists')
      .doc(listId)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <ListDiv>
      <MyLink to={`/list/${listId}`}>
        <ThemeList>
          <ListCh1 src={posters[2]} alt=""></ListCh1>
          <ListCh2 src={posters[1]} alt=""></ListCh2>
          <ListCh3 src={posters[0]} alt=""></ListCh3>
        </ThemeList>
        <ListTitle>{title}</ListTitle>
      </MyLink>
      <Close onClick={handleDeleteList}>
        <CancelIcon />
      </Close>
    </ListDiv>
  );
}
