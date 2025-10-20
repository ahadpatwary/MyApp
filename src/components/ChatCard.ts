// src/components/Chat.tsx
'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Node server URL

interface IMessage {
    sender: string;
    receiver: string;
    text: string;
    createdAt: string;
}

export default function ChatCard({ userId, chatWith }: { userId: string, chatWith: string }) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Add user online
        socket.emit('addUser', userId);

        // Receive message
        socket.on('getMessage', (msg: IMessage) => {
            if ((msg.sender === chatWith && msg.receiver === userId) || (msg.sender === userId && msg.receiver === chatWith)) {
                setMessages(prev => [...prev, msg]);
            }
        });

        // Cleanup
        return () => {
            socket.off('getMessage');
        };
    }, [userId, chatWith]);

    useEffect(() => {
        // Load old messages from MongoDB
        const fetchMessages = async () => {
        const res = await fetch('/api/getMessages',{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:{ userId, chatWith }
        });
        setMessages(res.data);
    };
        fetchMessages();
    }, [userId, chatWith]);

    const handleSend = () => {
        if (!newMessage) return;

        const messageData = { sender: userId, receiver: chatWith, text: newMessage };
        socket.emit('sendMessage', messageData);
        setMessages(prev => [...prev, { ...messageData, createdAt: new Date().toISOString() }]);
        setNewMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((m, i) => (
                    <div key={i} className={m.sender === userId ? 'my-message' : 'other-message'}>
                        {m.text}
                    </div>
                ))}
            </div>

            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button onClick={handleSend}>Send</button>
        </div>
    );
}