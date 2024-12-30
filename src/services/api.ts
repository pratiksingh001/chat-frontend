import { Room } from '@/types/chat';

export const chatApi = {
  getRooms: async (): Promise<Room[]> => {
    const response = await fetch(`http://localhost:3001/chat/rooms`);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  createRoom: async (name: string, participants: string[]): Promise<Room> => {
    const response = await fetch(`http://localhost:3001/chat/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, participants }),
    });
    if (!response.ok) throw new Error('Failed to create room');
    return response.json();
  },
};