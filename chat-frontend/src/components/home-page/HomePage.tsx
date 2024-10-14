import React from 'react';
import api from '../../config/api';

const HomePage: React.FC = () => {

  const tryRequest = (): void => {
    api.get("/user/get-all");
  }

  return (
    <button type="button" onClick={tryRequest}>Request try</button>
  );
};

export default HomePage;
