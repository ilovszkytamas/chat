import { EventSourcePolyfill } from 'event-source-polyfill';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useGlobalContext } from '../../store/context/GlobalContext';
import { Notification } from '../../constants/types';
import { Badge, Divider, IconButton, List, ListItem, ListItemText, Popover, Typography } from '@mui/material';
import { NotificationStatus } from '../../constants/enums';
import { useNavigate } from 'react-router-dom';
import { BASE_API } from '../../config/api';

const Notifications: React.FC = () => {
  const { state } = useGlobalContext()
  const { signedInUser } = state;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isNotificationsOpen = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = React.useState<number>(0);
  const eventSourceRef = React.useRef<EventSourcePolyfill | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!signedInUser || eventSourceRef.current) return;
    async function fetchNotifications() {
      if (signedInUser) {
        const retreivedNotifications: Notification[] = (await BASE_API.get(`/notifications`)).data;
        console.log(retreivedNotifications)
        setNotifications(retreivedNotifications);
      }
    }
    fetchNotifications();
    let eventSource: EventSourcePolyfill | null = null;
    eventSource = new EventSourcePolyfill(`http://localhost:8084/notifications/${signedInUser.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    eventSource.onmessage = (event) => {
      console.log(event.data)
      const receivedNotification: Notification = JSON.parse(event.data);
      setNotifications(prev => [...prev, receivedNotification]);
    };
    eventSourceRef.current = eventSource;

    return () => {
      console.log('Closing EventSource');
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [signedInUser]);

  React.useEffect(() => {
    let unreadCount = 0;
    if (notifications.length > 0) {
      notifications.forEach(notification => {
        if (notification.notificationStatus === NotificationStatus.UNREAD) {
          unreadCount++;
        }
        setUnreadNotifications(unreadCount);
      })
    }
  }, [notifications])

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  const deleteNotification = (notificationId: number) => {
    BASE_API.delete(`/notifications/${notificationId}`);
    setNotifications(prev => prev.filter(current => current.id !== notificationId));
  }

  const readNotiticationAndNavigateToProfile = (notification: Notification) => {
    BASE_API.patch(`/notifications/${notification.id}`);
    setNotifications(prev => prev.map(current => current.id === notification.id ? {...current, notificationStatus: NotificationStatus.READ} : current));
    navigate(`/profile?id=${notification.senderId}`);
  }

  return (
    <div>
      <Badge badgeContent={unreadNotifications} onClick={handleNotificationsOpen} color="error" max={10}>
        <CircleNotificationsIcon />
      </Badge>

      <Popover
        open={isNotificationsOpen}
        anchorEl={anchorEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ width: 300, maxWidth: '100%', bgcolor: 'background.paper' }}>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem
                key={notification.id}
                onClick={() => readNotiticationAndNavigateToProfile(notification)}
                sx={{
                  backgroundColor: notification.notificationStatus === NotificationStatus.UNREAD
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'transparent',
                  borderRadius: 1,
                  marginBottom: 1,
                  padding: 2,
                  '&:hover': {
                    backgroundColor: notification.notificationStatus === NotificationStatus.UNREAD
                      ? 'rgba(0, 0, 0, 0.06)' : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: notification.notificationStatus === NotificationStatus.UNREAD ? 'bold' : 'normal', 
                        color: notification.notificationStatus === NotificationStatus.UNREAD ? 'text.primary' : 'text.secondary',
                      }}
                    >
                      {`${notification.senderFullName} ${notification.message}`}
                    </Typography>
                  }
                />
                <IconButton sx={{
                    padding: 0,
                    marginLeft: 'auto',
                    alignSelf: 'center',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={() => deleteNotification(notification.id)}
                >
                  <CloseIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Popover>
    </div>
  );
}

export default Notifications;