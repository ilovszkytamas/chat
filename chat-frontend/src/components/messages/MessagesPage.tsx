import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';

const MessagesPage = () => {
  const conversations = [
    { id: 1, name: 'Alice', lastMessage: 'Hey, how’s it going?' },
    { id: 2, name: 'Bob', lastMessage: 'Got the files?' },
    { id: 3, name: 'Charlie', lastMessage: 'Let’s catch up soon.' },
  ];

  const selectedConversationId = 1; 

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
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

      <Box sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
        <Paper
          elevation={2}
          sx={{
            height: '100%',
            borderRadius: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Conversation with Alice goes here...
            </Typography>
          </Box>

        </Paper>
      </Box>
    </Box>
  );
};

export default MessagesPage;
