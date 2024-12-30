import { useState, useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useChat } from '@/hooks/useChat';
import { chatApi } from '@/services/api';
import { Room } from '@/types/chat';
import { ChatLayout } from '@/components/ChatLayout';
import { RoomList } from '@/components/RoomList';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';

export default function Home() {
  const socket = useSocket();
  const { messages, currentRoom, sendMessage, joinRoom, leaveRoom } = useChat(socket);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const fetchedRooms = await chatApi.getRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomSelect = (roomId: string) => {
    if (currentRoom) {
      leaveRoom(currentRoom);
    }
    joinRoom(roomId);
  };

  const handleSendMessage = (content: string) => {
    if (username) {
      sendMessage(content, username);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Enter your username</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={() => setUsername(username.trim())}
            disabled={!username.trim()}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <ChatLayout
      sidebar={
        <RoomList
          rooms={rooms}
          currentRoom={currentRoom}
          onRoomSelect={handleRoomSelect}
        />
      }
      content={
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                currentUser={username}
              />
            ))}
          </div>
          <div className="p-4 border-t">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      }
    />
  );
}