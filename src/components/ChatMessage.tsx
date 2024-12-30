import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
  currentUser: string;
}

export const ChatMessage = ({ message, currentUser }: ChatMessageProps) => {
  const isOwnMessage = message.sender === currentUser;

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isOwnMessage ? 'bg-[#d9fdd3] text-black' : 'bg-gray-200 text-black'
      }`}>
        <div className="font-bold text-sm">{message.sender}</div>
        <div>{message.content}</div>
      </div>
    </div>
  );
};