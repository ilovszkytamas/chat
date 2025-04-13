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
import { setSelectedConversationId } from '../../store/actions/MessageAction';

const ConversationList: React.FC = () => {
  const { state, dispatch } = React.useContext(MessageContext);
  const { conversations, selectedConversationId } = state;

  const setSelectedConversation = (id: number) => {
    dispatch(setSelectedConversationId(id));
  }

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
              <ListItemText
                primary={conv.name}
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