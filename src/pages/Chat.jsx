import React, { useState, useEffect } from 'react';
import { messages as initialMessages, users, students } from '../data/dummyData';
import { Send, Search, UserCircle, MoreVertical, ArrowLeft } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const isGuru = currentUser.role === 'GURU';
  const otherRoleName = isGuru ? 'Orang Tua' : 'Guru';

  const myChildren = students.filter(s => s.id_orangtua === currentUser.id);
  const childName = myChildren.length > 0 ? myChildren.map(c => c.nama).join(', ') : 'Siswa';
  
  // Generate mock contacts to simulate WhatsApp Web feel
  const [contacts, setContacts] = useState([]);
  const [activeContactId, setActiveContactId] = useState(null); // start null for mobile view
  const [searchContact, setSearchContact] = useState('');

  useEffect(() => {
    // Generate 10 dummy contacts
    const dummyContacts = [];
    for (let i = 1; i <= 10; i++) {
      dummyContacts.push({
        id: `C${i}`,
        nama: isGuru ? `Bapak/Ibu Murid ${i}` : `Guru Mata Pelajaran ${i}`,
        role: isGuru ? 'ORANG_TUA' : 'GURU',
        lastMessage: `Pesan terakhir dari ${isGuru ? 'Orang Tua' : 'Guru'}...`,
        time: '10:00'
      });
    }
    
    // Add actual dummy users from data that match the opposite role
    const realContacts = users.filter(u => u.role === (isGuru ? 'ORANG_TUA' : 'GURU')).map(u => ({
      ...u,
      lastMessage: 'Ada pesan baru.',
      time: '08:30'
    }));

    const allContacts = [...realContacts, ...dummyContacts];
    setContacts(allContacts);
    
    // On desktop, auto select first contact
    if (window.innerWidth >= 768 && allContacts.length > 0) {
      setActiveContactId(allContacts[0].id);
    }
  }, [isGuru]);

  const activeContact = contacts.find(c => c.id === activeContactId);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContactId) return;

    const newMsg = {
      id: `M${Date.now()}`,
      pengirim: currentUser.id,
      penerima: activeContactId,
      tanggal: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isi: newMessage
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const filteredContacts = contacts.filter(c => c.nama.toLowerCase().includes(searchContact.toLowerCase()));

  // Filter messages for current chat session
  const currentChatMessages = messages.filter(msg => 
    (msg.pengirim === currentUser.id && msg.penerima === activeContactId) || 
    (msg.pengirim === activeContactId && msg.penerima === currentUser.id) ||
    // For simulation purpose, show dummy messages if it's a dummy contact
    (msg.penerima === 'U02' || msg.penerima === 'U03') // keep the original dummy messages visible
  );

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl flex h-[calc(100dvh-160px)] md:h-[calc(100vh-140px)] overflow-hidden">
      
      {/* LEFT PANE - Sidebar Contacts (Visible on mobile if NO contact selected, visible on desktop always) */}
      <div className={`${activeContactId ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-gray-200 flex-col bg-white`}>
        {/* Profile / Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {currentUser.nama ? currentUser.nama.charAt(0) : 'U'}
            </div>
            <span className="font-semibold text-gray-800 truncate">{currentUser.nama || 'User'}</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari chat..."
              className="block w-full pl-10 pr-3 py-2 border-none bg-gray-100 rounded-lg text-sm focus:ring-0 focus:outline-none"
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setActiveContactId(contact.id)}
              className={`flex items-center p-3 cursor-pointer border-b border-gray-100 transition-colors ${activeContactId === contact.id ? 'bg-indigo-50 hidden md:flex' : 'hover:bg-gray-50'}`}
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 flex items-center justify-center text-gray-600 font-semibold text-lg">
                {contact.nama.charAt(0)}
              </div>
              <div className="ml-3 flex-1 overflow-hidden">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{contact.nama}</h4>
                  <span className="text-xs text-gray-400 flex-shrink-0">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANE - Chat Area (Visible on mobile if contact selected, visible on desktop always) */}
      <div className={`${activeContactId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#efeae2]`}>
        {activeContactId ? (
          <>
            {/* Header */}
            <div className="bg-white p-3 flex items-center border-b border-gray-200 shadow-sm z-10">
              {/* Back Button (Mobile Only) */}
              <button 
                className="md:hidden mr-3 text-gray-600 hover:text-gray-900"
                onClick={() => setActiveContactId(null)}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                {activeContact?.nama?.charAt(0)}
              </div>
              <div className="ml-4 flex-1 overflow-hidden">
                <h3 className="text-md font-semibold text-gray-800 truncate">{activeContact?.nama}</h3>
                {currentUser.role === 'ORANG_TUA' ? (
                  <p className="text-xs text-gray-500 truncate">Re: {childName}</p>
                ) : (
                  <p className="text-xs text-gray-500 truncate">{otherRoleName}</p>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col space-y-3" style={{ backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')", backgroundSize: 'contain', opacity: 0.9 }}>
              {/* Simulation specific: show a welcome message for new contacts */}
              <div className="flex justify-center mb-4">
                <span className="bg-yellow-100 text-yellow-800 text-[10px] md:text-xs px-3 py-1 rounded-lg shadow-sm text-center">
                  Pesan terenkripsi end-to-end secara simulasi.
                </span>
              </div>

              {currentChatMessages.map((msg) => {
                const isMine = msg.pengirim === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[75%] px-3 py-2 shadow-sm relative ${
                      isMine 
                        ? 'bg-[#d9fdd3] text-gray-800 rounded-lg rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-lg rounded-tl-none'
                    }`}>
                      <p className="text-sm leading-relaxed pr-10">{msg.isi}</p>
                      <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                        {msg.tanggal.length > 5 ? '12:00' : msg.tanggal}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Messages */}
            {!isGuru && (
              <div className="bg-gray-100 px-3 pt-2">
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {[
                    "Anak saya hari ini tidak masuk karena sakit",
                    "Saya ingin menanyakan perkembangan belajar anak saya",
                    "Terima kasih atas informasinya, Pak/Bu Guru"
                  ].map((msg, i) => (
                    <button
                      key={i}
                      onClick={() => setNewMessage(msg)}
                      className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-50 whitespace-nowrap shadow-sm"
                    >
                      {msg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-2 md:p-3 bg-gray-100 flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border-none rounded-full md:rounded-lg px-4 py-2 md:py-3 text-sm shadow-sm focus:outline-none focus:ring-0"
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(e)}
              />
              <button
                onClick={handleSend}
                className="bg-teal-600 text-white rounded-full p-2 h-10 w-10 flex items-center justify-center flex-shrink-0 hover:bg-teal-700 transition-colors shadow-sm"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <div className="h-32 w-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <UserCircle className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700">Pilih kontak untuk mengobrol</h2>
            <p className="text-gray-500 mt-2 text-center max-w-md px-4">Kirim dan terima pesan dari guru atau orang tua siswa melalui sistem SIMPATIK.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
