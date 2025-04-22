import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { MessageContext } from '../../store/context/MessageContext';
import { setConversations, setSelectedConversationId } from '../../store/actions/MessageAction';
import API from '../../config/api';
import ProfileAvatar from '../common/ProfileAvatar';

const ConversationList: React.FC = () => {
  const { state, dispatch } = React.useContext(MessageContext);
  const { conversations, selectedConversationId } = state;

  const setSelectedConversation = (id: number) => {
    dispatch(setSelectedConversationId(id));
  }

  const loadConversationList = async () => {
    const conversationList = (await API.get("/conversation")).data;
    console.log(conversationList);
    dispatch(setConversations(conversationList));
  }

  React.useEffect(() => {
    loadConversationList();
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        width: 300,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" sx={{ px: 1, pb: 1 }}>
        Chats
      </Typography>
      <Divider />
      <List sx={{ overflowY: 'auto' }}>
        {conversations.map((conv) => (
          <ListItem
            key={conv.id}
            disablePadding
            selected={conv.id === selectedConversationId}
            onClick={() => setSelectedConversation(conv.id)}
          >
            <ListItemButton>
              <ProfileAvatar userId={conv.partnerId} size={40} />
              <ListItemText
                primary={conv.partnerName}
                secondary={conv.lastMessage}
                primaryTypographyProps={{ fontWeight: 500 }}
                secondaryTypographyProps={{
                  noWrap: true,
                  fontSize: '0.875rem',
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default ConversationList;