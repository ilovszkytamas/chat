import { Box } from '@mui/material';
import ConversationList from './ConversationList';
import CurrentConversation from './CurrentConversation';
import FriendList from './FriendList';
import { MessageContextProvider } from '../../store/context/MessageContext';

const MessagesPage: React.FC = () => {

  return (
    <MessageContextProvider>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <ConversationList />
        <CurrentConversation />
        <FriendList />
      </Box>
    </MessageContextProvider>
  );
};

export default MessagesPage;
