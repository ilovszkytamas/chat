import { Box } from '@mui/material';
import ConversationList from './ConversationList';
import CurrentConversation from './CurrentConversation';
import FriendList from './FriendList';
import { MessageContextProvider } from '../../store/context/MessageContext';

const MessagesPage: React.FC = () => {

  return (
    <MessageContextProvider>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <ConversationList />

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <CurrentConversation />
        </Box>

        <FriendList />
      </Box>
    </MessageContextProvider>
  );
};

export default MessagesPage;
