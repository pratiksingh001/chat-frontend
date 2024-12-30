export interface Message {
    id: string;
    sender: string;
    content: string;
    roomId?: string;
    createdAt: Date;
  }
  
  export interface Room {
    id: string;
    name: string;
    participants: string[];
  }