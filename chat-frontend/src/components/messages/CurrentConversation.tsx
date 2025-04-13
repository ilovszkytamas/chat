import { Box, Divider, Paper, Typography } from '@mui/material';

const partnerName = 'Alice';

const messages = [
  { id: 1, sender: 'Alice', text: 'Hey, how’s it going?' },
  { id: 2, sender: 'me', text: 'All good! Working on my thesis.' },
  { id: 3, sender: 'Alice', text: 'Nice, keep it up!' },
  { id: 4, sender: 'me', text: 'Thanks! You doing anything fun today?' },
  { id: 5, sender: 'Alice', text: 'Probably just relaxing. It’s the weekend.' },
];

const CurrentConversation: React.FC = () => (
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
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            textAlign: 'left',
            fontSize: '1.25rem',
            letterSpacing: 0.5,
            color: 'text.primary',
          }}
        >
          {partnerName}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          pr: 1,
        }}
      >
        {messages.map((msg) => {
          const isMe = msg.sender === 'me';
          return (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: isMe ? 'primary.main' : 'grey.200',
                  color: isMe ? 'white' : 'text.primary',
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Paper>
  </Box>
);

export default CurrentConversation;