import { EventSourcePolyfill } from 'event-source-polyfill';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import React from 'react';
import { useGlobalContext } from '../../store/context/GlobalContext';
import { Notification } from '../../constants/types';
import API from '../../config/api';

const Notifications: React.FC = () => {
  const { state } = useGlobalContext()
  const { signedInUser } = state;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isNotificationsOpen = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    async function fetchNotifications() {
      if (signedInUser) {
        const retreivedNotifications: Notification[] = await API.get(`/notifications`);
        console.log(retreivedNotifications)
        setNotifications(retreivedNotifications);
      }
    }
    fetchNotifications();
    if (signedInUser) {
      const eventSource = new EventSourcePolyfill(`http://localhost:8080/notifications/${signedInUser.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(eventSource);
      eventSource.onmessage = (event) => {
        const receivedNotification: Notification = event.data;
        setNotifications([...notifications, receivedNotification]);
      };
      
      return () => eventSource.close();
    }
  }, [signedInUser]);

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <CircleNotificationsIcon />
    </div>
  );
}

export default Notifications;