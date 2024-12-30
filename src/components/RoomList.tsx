import { Room } from '@/types/chat';

interface RoomListProps {
  rooms: Room[];
  currentRoom: string | null;
  onRoomSelect: (roomId: string) => void;
}

export const RoomList = ({ rooms, currentRoom, onRoomSelect }: RoomListProps) => {
  return (
    <div className="w-64 border-r">
      <div className="p-4 border-b">
        <h2 className="font-bold">Rooms</h2>
      </div>
      <div className="overflow-y-auto">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={`w-full p-4 text-left hover:bg-gray-100 ${
              currentRoom === room.id ? 'bg-gray-100' : ''
            }`}
          >
            {room.name}
          </button>
        ))}
      </div>
    </div>
  );
};