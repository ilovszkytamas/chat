import * as React from 'react';
import { Box, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { ProfileData } from '../../constants/types';
import API from '../../config/api';
import { useNavigate } from 'react-router-dom';

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [searchResult, setSearchResult] = React.useState<ProfileData[]>([]);
  const navigate = useNavigate();

  const sendSearchRequest = async (searchTerm: string) => {
    const response = await API.get(`/user/search/${searchTerm}`);
    setSearchResult(response.data);
  }

  const handleUserOnClick = (id: number) => {
    navigate(`/profile?id=${id}`);
  }

  React.useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (searchTerm) {
        sendSearchRequest(searchTerm);
      }
    }, 1500)

    return () => clearTimeout(delayTimer)
  }, [searchTerm])

  return (
    <Box sx={{ position: 'relative', mt: 1, width: 250 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search for users"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            fontSize: '0.9rem',
          },
        }}
      />

      {searchResult.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: 300,
            overflowY: 'auto',
            zIndex: 10,
            borderRadius: 2,
          }}
        >
          {searchResult.map((user) => (
            <ListItem
              key={user.id}
              disablePadding
              sx={{ backgroundColor: 'primary.main' }}
            >
              <ListItemButton onClick={() => handleUserOnClick(user.id!)}>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  primaryTypographyProps={{
                    color: 'common.white',
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Paper>
      )}
    </Box>
  );
}

export default UserSearch;