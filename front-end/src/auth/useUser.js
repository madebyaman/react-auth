import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    if (!token) return;
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState(() => {
    if (!token) return null;
    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) setUser(null);
    setUser(getPayloadFromToken(token));
  }, [token]);

  return user;
};
