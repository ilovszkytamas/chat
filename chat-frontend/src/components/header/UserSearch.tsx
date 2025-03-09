import * as React from 'react';
import { ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
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
    <div style={{position: 'relative', marginTop: '10px', backgroundColor: 'inherit'}}>
      <TextField
        type='text'
        placeholder='Search for users'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {
        searchResult.map((user) => {
          return (
            <ListItem style={{backgroundColor: '#1976d2'}} key={user.id}>
              <ListItemButton onClick={() => handleUserOnClick(user.id!)}>
                <ListItemText primary={`${user.firstName} ${user.lastName}`}/>
              </ListItemButton>
            </ListItem>
          )
        })
      }
    </div>
  );
}

export default UserSearch;