import { useState, useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { Message, Room } from '@/types/chat';

export const useChat = (socket: Socket | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('newMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket]);

  const sendMessage = useCallback(
    (content: string, sender: string) => {
      if (!socket) return;

      const messageData = {
        sender,
        content,
        roomId: currentRoom,
      };

      socket.emit('sendMessage', messageData);
    },
    [socket, currentRoom]
  );

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;
      
      socket.emit('joinRoom', roomId);
      setCurrentRoom(roomId);
    },
    [socket]
  );

  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;
      
      socket.emit('leaveRoom', roomId);
      setCurrentRoom(null);
    },
    [socket]
  );

  return {
    messages,
    currentRoom,
    sendMessage,
    joinRoom,
    leaveRoom,
  };
};