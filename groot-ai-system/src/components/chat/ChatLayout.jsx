import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatMain from "./ChatMain";
import { FiMenu } from "react-icons/fi";

function getMainPoint(text) {
  const firstSentence = text.split(/[.!?\n]/)[0];
  return (firstSentence.length > 0 ? firstSentence : text).slice(0, 30) + (text.length > 30 ? '...' : '');
}

export default function ChatLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Welcome to Groot!",
      messages: [], // Start with no messages
      lastUpdated: Date.now()
    }
  ]);
  const [currentId, setCurrentId] = useState(conversations[0].id);

  const currentConv = conversations.find(c => c.id === currentId);

  // Send message handler
  const handleSendMessage = (text) => {
    setConversations(convs => convs.map(c => {
      if (c.id === currentId) {
        const isFirstUserMsg = !c.messages.some(m => m.sender === "user");
        return {
          ...c,
          messages: [...c.messages, {
            id: Date.now(),
            sender: "user",
            text,
            avatar: "/user-avatar.png",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }],
          lastUpdated: Date.now(),
          title: isFirstUserMsg ? getMainPoint(text) : c.title
        };
      }
      return c;
    }));
  };

  // Add AI message to current conversation
  const handleAIMessage = (text) => {
    setConversations(convs => convs.map(c =>
      c.id === currentId
        ? { ...c, messages: [...c.messages, {
            id: Date.now() + 1,
            sender: "ai",
            text,
            avatar: "/ai-avatar.png",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }], lastUpdated: Date.now() }
        : c
    ));
  };

  // Start a new conversation
  const handleNewConversation = () => {
    const newId = Date.now();
    const newConv = {
      id: newId,
      title: "New Conversation",
      messages: [], // Start with no messages
      lastUpdated: Date.now()
    };
    setConversations([newConv, ...conversations]);
    setCurrentId(newId);
  };

  // Select a conversation
  const handleSelectConversation = (id) => {
    setCurrentId(id);
  };

  // Delete a conversation
  const handleDeleteConversation = (id) => {
    setConversations(convs => {
      const filtered = convs.filter(c => c.id !== id);
      if (id === currentId && filtered.length > 0) {
        setCurrentId(filtered[0].id);
      }
      return filtered;
    });
  };

  // Rename a conversation
  const handleRenameConversation = (id, newTitle) => {
    setConversations(convs => convs.map(c =>
      c.id === id ? { ...c, title: newTitle } : c
    ));
  };

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed sm:relative z-50 h-full transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
      }`}>
        <Sidebar
          conversations={conversations}
          onNewConversation={handleNewConversation}
          onSelectConversation={(id) => {
            handleSelectConversation(id);
            setSidebarOpen(false);
          }}
          onDeleteConversation={handleDeleteConversation}
          onRenameConversation={handleRenameConversation}
          currentId={currentId}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header with Hamburger */}
        <div className="sm:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-800 transition"
          >
            <FiMenu size={20} />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-800">Groot</h1>
        </div>
        
        <ChatMain
          conversation={currentConv}
          onSendMessage={handleSendMessage}
          onAIMessage={handleAIMessage}
        />
      </div>
    </div>
  );
}