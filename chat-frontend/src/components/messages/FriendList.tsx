import { ChatBubbleOutline, Circle } from '@mui/icons-material';
import { Paper, Typography, List, ListItem, ListItemText, Divider, IconButton, Box } from '@mui/material';
import React from 'react';
import { MessageContext } from '../../store/context/MessageContext';
import API from '../../config/api';
import { setFriendList } from '../../store/actions/MessageAction';

const FriendList: React.FC = () => {
  const { state, dispatch } = React.useContext(MessageContext);
  const { friendList } = state;
  
  const loadFriendList = async () => {
    const friendList = (await API.get("/friend/list")).data;
    console.log(friendList);
    dispatch(setFriendList(friendList));
  }
  React.useEffect(() => {
    loadFriendList();
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        width: 250,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ px: 1, pb: 1 }}>
        Friends
      </Typography>
      <Divider />
      <List sx={{ overflowY: 'auto' }}>
        {friendList.map((friend) => (
          <ListItem key={friend.id} disablePadding>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText
                  primary={friend.name}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                {friend.online && (
                  <Circle sx={{ color: 'green', fontSize: 10, mr: 1 }} />
                )}
              </Box>
              <IconButton edge="end" aria-label="message" size="small">
                <ChatBubbleOutline />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FriendList;