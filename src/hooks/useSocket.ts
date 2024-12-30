import { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { SOCKET_SERVER_URL } from '@/config/constants';

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  return socket.current;
};