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
  const eventSourceRef = React.useRef<EventSourcePolyfill | null>(null);

  /*React.useEffect(() => {
    if (!signedInUser || eventSourceRef.current) return;
    async function fetchNotifications() {
      if (signedInUser) {
        const retreivedNotifications: Notification[] = await API.get(`/notifications`);
        console.log(retreivedNotifications)
        setNotifications(retreivedNotifications);
      }
    }
    fetchNotifications();
    let eventSource: EventSourcePolyfill | null = null;
      eventSource = new EventSourcePolyfill(`http://localhost:8080/notifications/${signedInUser.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      eventSource.onmessage = (event) => {
        const receivedNotification: Notification = event.data;
        setNotifications(prev => [...prev, receivedNotification]);
      };
      eventSourceRef.current = eventSource;
      
      return () => {
        console.log('Closing EventSource');
        eventSourceRef.current?.close();
        eventSourceRef.current = null;
      };
  }, [signedInUser]);*/

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