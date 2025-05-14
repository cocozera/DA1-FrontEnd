import api from './api';

export const getProfile = async () => {
  const { data } = await api.get('/users/me'); 
  return data;
};
