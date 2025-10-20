'use client';
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface IMessage {
  sender: string;
  receiver: string;
  text: string;
  createdAt: string;
}

export default function ChatCard({ userId, chatWith }: { userId: string, chatWith: string }) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    socketRef.current.emit('addUser', userId);

    socketRef.current.on('getMessage', (msg: IMessage) => {
      if ((msg.sender === chatWith && msg.receiver === userId) || (msg.sender === userId && msg.receiver === chatWith)) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, chatWith]);

    useEffect(() => {
      const fetchMessages = async () => {
        const res = await fetch('/api/getMessages', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, chatWith })
        });
        const data = await res.json();
        setMessages(data.messages || []); // data.messages array না থাকলে empty array
      };
      fetchMessages();
    }, [userId, chatWith]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage) return;
    const messageData = { sender: userId, receiver: chatWith, text: newMessage };
    socketRef.current?.emit('sendMessage', messageData);
    setMessages(prev => [...prev, { ...messageData, createdAt: new Date().toISOString() }]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md flex items-center">
        <div className="font-bold text-lg">Chat with {chatWith}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => {
          const isSender = m.sender === userId;
          return (
            <div key={i} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-900'}`}>
                {m.text}
                <div className="text-xs mt-1 text-gray-200">{new Date(m.createdAt).toLocaleTimeString()}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex items-center p-4 bg-white shadow-inner">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}