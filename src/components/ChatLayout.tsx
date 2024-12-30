import { ReactNode } from 'react';

interface ChatLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export const ChatLayout = ({ sidebar, content }: ChatLayoutProps) => {
  return (
    <div className="flex h-screen bg-white">
      {sidebar}
      {content}
    </div>
  );
};