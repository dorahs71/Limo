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
  width: 28vw;
  max-height: 40vw;
  position: absolute;
  justify-content: center;
  overflow: scroll;
  right: 3vw;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  top: 4vw;
  font-size: 1.2rem;
  @media (max-width: 1280px) {
    width: 33vw;
  }
  @media (max-width: 1024px) {
    width: 30vw;
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    top: 5vw;
    width: 35vw;
    font-size: 0.9rem;
    max-height: 45vw;
  }
  @media (max-width: 600px) {
    top: 10vw;
    width: 45vw;
    font-size: 0.5rem;
    max-height: 50vw;
  }
  @media (max-width: 375px) {
    width: 50vw;
  }
`;

const RemindDot = styled.div`
  background: red;
  border-radius: 50%;
  width: 0.8vw;
  height: 0.8vw;
  align-self: center;
  margin-right: 0.8vw;
  margin-top: -1vw;
  z-index: 5;
  @media (max-width: 768px) {
    width: 1.2vw;
    height: 1.2vw;
    margin-right: 0.2vw;
  }
  @media (max-width: 600px) {
    width: 1.5vw;
    height: 1.5vw;
  }
`;

const BellImg = styled.img`
  width: 1.8vw;
  height: 1.8vw;
  margin-right: 1.5vw;

  @media (max-width: 1280px) {
    width: 2vw;
    height: 2vw;
  }

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
  height: 6vw;
  padding: 1.5vw 2vw 2vw 0vmin;
  display: flex;
  background: #333;
  flex-direction: column;
  &:not(:last-of-type) {
    border-bottom: 1px rgba(255, 255, 255, 0.7) solid;
  }
  &:hover {
    background: #777;
  }
  @media (max-width: 768px) {
    height: 8vw;
  }
  @media (max-width: 600px) {
    height: 12vw;
  }
  @media (max-width: 375px) {
    height: 15vw;
  }
`;

const NoAlert = styled.div`
  height: 1.5vw;
  padding: 2vmin;
  display: flex;
  background: #333;
  text-align: center;
  align-items: center;
  @media (max-width: 600px) {
    height: 2vw;
  }
`;

const AlertDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AlertProfile = styled.img`
  width: 3vw;
  height: 3vw;
  margin-left: 1vw;
  @media (max-width: 768px) {
    width: 3.5vw;
    height: 3.5vw;
  }
  @media (max-width: 600px) {
    width: 5vw;
    height: 5vw;
  }
`;

const AlertMessage = styled.div`
  text-align: justify;
  font-weight: 400;
  margin-left: 1vw;
  color: rgba(255, 255, 255, 0.7);
`;

const AlertTime = styled.div`
  margin-top: 0.5vmin;
  font-weight: 400;
  display: flex;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.7);
`;

const MyLink = styled(Link)`
  text-decoration: none;
`;
