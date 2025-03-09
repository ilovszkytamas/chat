import { Icon } from '@mui/material';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import React from 'react';

const Notifications: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isNotificationsOpen = Boolean(anchorEl);

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