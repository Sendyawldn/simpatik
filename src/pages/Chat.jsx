import React, { useState } from 'react';
import { messages as initialMessages, users } from '../data/dummyData';
import { Send } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const isGuru = currentUser.role === 'GURU';
  const otherRoleName = isGuru ? 'Orang Tua' : 'Guru';
  
  // Find chat partner based on role
  // In a real app, this would be a list of parents/teachers, but we simplify for simulation
  const chatPartnerId = isGuru ? 'U03' : 'U02';
  const chatPartner = users.find(u => u.id === chatPartnerId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: `M${Date.now()}`,
      pengirim: currentUser.id,
      penerima: chatPartnerId,
      tanggal: new Date().toISOString().split('T')[0],
      isi: newMessage
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center shadow-md z-10">
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
          {chatPartner?.nama?.charAt(0) || '?'}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-white">{chatPartner?.nama}</h3>
          <p className="text-sm text-blue-100">{otherRoleName}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col space-y-4">
        {messages.map((msg) => {
          const isMine = msg.pengirim === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-5 py-3 shadow-sm ${
                isMine 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
              }`}>
                <p className="text-sm md:text-base leading-relaxed">{msg.isi}</p>
                <span className={`text-[10px] mt-1 block ${isMine ? 'text-indigo-200 text-right' : 'text-gray-400 text-left'}`}>
                  {msg.tanggal}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="Tulis pesan Anda di sini..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
