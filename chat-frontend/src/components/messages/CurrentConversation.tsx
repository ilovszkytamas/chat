import { Box, Divider, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { MessageContext } from '../../store/context/MessageContext';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { getWebSocketService } from '../../config/webSocketService';
import { useGlobalContext } from '../../store/context/GlobalContext';
import { useRefreshSignedInUser } from '../../hooks/useRefreshSignedInUser';
import { Message } from '../../constants/types';
import { BASE_API } from '../../config/api';

const CurrentConversation: React.FC = () => {
  const globalState = useGlobalContext();
  const { state } = useContext(MessageContext);
  const { conversations, selectedConversationId } = state;
  const previousConversationId = useRef<number | null>(null);
  const webSocketService = useRef(getWebSocketService()).current;
  const refreshSignedInUser = useRefreshSignedInUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const conversation = conversations.find(c => c.id === selectedConversationId);
  const partnerName = conversation?.partnerName;

  const loadMessages = async (conversationId: number, page: number = 0) => {
    const response = await BASE_API.get(`/messages/conversations/${conversationId}?page=${page}&size=20`);
    return response.data;
  };

  const loadMore = async () => {
    if (!selectedConversationId || !hasMore || loading) return;

    setLoading(true);
    const container = scrollRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    const nextPage = page + 1;
    const data = await loadMessages(selectedConversationId, nextPage);

    setMessages((prev) => [...data.content.reverse(), ...prev]);
    setPage(nextPage);
    setHasMore(!data.last);
    setLoading(false);

    if (container) {
      requestAnimationFrame(() => {
        const newScrollHeight = container.scrollHeight;
        container.scrollTop = newScrollHeight - prevScrollHeight + container.scrollTop;
      });
    }
  };

  useEffect(() => {
    refreshSignedInUser();
    const webSocketService = getWebSocketService();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!selectedConversationId) return;

    if (previousConversationId.current !== null && previousConversationId.current !== selectedConversationId) {
      webSocketService.unsubscribeFromConversation(previousConversationId.current);
    }

    setMessages([]);
    setPage(0);
    setHasMore(true);

    loadMessages(selectedConversationId, 0).then((data) => {
      setMessages(data.content.reverse());
      setHasMore(!data.last);

      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    });

    webSocketService.subscribeToConversation(selectedConversationId, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    });

    previousConversationId.current = selectedConversationId;

    return () => {
      webSocketService.unsubscribeFromConversation(selectedConversationId);
    };
  }, [selectedConversationId]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !selectedConversationId) return;

    const handleScroll = () => {
      if (container.scrollTop < 50 && hasMore && !loading) {
        loadMore();
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading, selectedConversationId]);

  const handleSendMessage = () => {
    if (message.trim() && selectedConversationId) {
      webSocketService.sendMessage(selectedConversationId, message);
      setMessage('');
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        maxHeight: 900,
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          {partnerName}
        </Typography>
        <Divider sx={{ mt: 1 }} />
      </Box>

      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          minHeight: 0,
        }}
      >
        {messages.map((msg, index) => {
          const isMe = msg.senderId === globalState.state.signedInUser.id;
          return (
            <Box
              key={index}
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
                  bgcolor: isMe ? 'primary.light' : 'grey.300',
                  color: isMe ? 'white' : 'text.primary',
                  boxShadow: 1,
                }}
              >
                <Typography variant="body2">{msg.content}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, px: 1 }}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CurrentConversation;
