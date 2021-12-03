import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-tw';
import bell from '../../images/bell.png';
import {
  getNotification,
  updateNotificationReadStatus,
} from '../../utils/firebase';

export default function Notification({ currentUserId }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const unsubscribe = getNotification(currentUserId, setNotification);
    return () => {
      unsubscribe();
    };
  }, [currentUserId]);

  let notifyList = '';
  let newNotify = [];
  if (notification !== '') {
    notifyList = notification.filter((x) => x.read === false);
    notifyList.map((item) => {
      const data = item.notificationId;
      newNotify.push(data);
      return data;
    });
  }

  const toggleShowNotification = () => {
    if (showNotification) {
      setShowNotification(false);
    } else {
      setShowNotification(true);
      if (newNotify) {
        newNotify.map((item) => {
          updateNotificationReadStatus(currentUserId, item);
          return item;
        });
      }
    }
  };

  return (
    <>
      <BellDiv onClick={toggleShowNotification}>
        <BellImg src={bell} alt="" />
        {notifyList?.length > 0 && <RemindDot />}
      </BellDiv>
      {showNotification && (
        <NotificationDiv>
          {notification !== '' &&
            notification?.map((item) => (
              <AlertListBlock>
                <MyLink to={item.link}>
                  <AlertDiv>
                    <AlertProfile src={item.authorImg} alt="" />
                    <AlertMessage>{item.message}</AlertMessage>
                  </AlertDiv>
                  <AlertTime>{moment(item.date.toDate()).fromNow()}</AlertTime>
                </MyLink>
              </AlertListBlock>
            ))}
          {notification.length === 0 && <NoAlert>您尚未有新的通知呦！</NoAlert>}
        </NotificationDiv>
      )}
    </>
  );
}

const NotificationDiv = styled.div`
  width: 38vmin;
  max-height: 60vmin;
  position: absolute;
  justify-content: center;
  overflow: scroll;
  right: 30px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 64px;
`;

const RemindDot = styled.div`
  background: red;
  border-radius: 50%;
  width: 1vmin;
  height: 1vmin;
  align-self: center;
  margin-right: 1vmin;
  margin-top: -1vmin;
  z-index: 5;
  @media (max-width: 1280px) {
    width: 1.5vmin;
    height: 1.5vmin;
  }
`;

const BellImg = styled.img`
  width: 2vw;
  height: 2vw;
  margin-right: 1.5vw;

  @media (max-width: 768px) {
    width: 2.8vw;
    height: 2.8vw;
  }
  @media (max-width: 600px) {
    width: 4vw;
    height: 4vw;
  }
`;

const BellDiv = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const AlertListBlock = styled.div`
  width: 98%;
  height: 8vmin;
  padding: 2vmin 5vmin 3vmin 0vmin;
  display: flex;
  background: #333;
  flex-direction: column;
  &:not(:last-of-type) {
    border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  }
  &:hover {
    background: #777;
  }
`;

const NoAlert = styled.div`
  width: 80%;
  height: 2vmin;
  padding: 2vmin;
  display: flex;
  text-align: center;
`;

const AlertDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AlertProfile = styled.img`
  width: 5vmin;
  height: 5vmin;
  margin-left: 1vmin;
`;

const AlertMessage = styled.div`
  width: 80%;
  text-align: justify;
  font-weight: 400;
  margin-left: 1vmin;
  font-size: 2vmin;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 1280px) {
    font-size: 2.2vmin;
    font-weight: 500;
  }
`;

const AlertTime = styled.div`
  margin-top: 0.5vmin;
  font-size: 1.8vmin;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.7);
  @media (max-width: 1280px) {
    font-size: 2.2vmin;
    font-weight: 500;
  }
`;

const MyLink = styled(Link)`
  text-decoration: none;
`;
