import React, { useState } from "react";
import { FiPlus, FiSearch, FiMoreVertical } from "react-icons/fi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from '../../ThemeContext';

export default function Sidebar({ conversations, onNewConversation, onSelectConversation, onDeleteConversation, onRenameConversation, currentId }) {
  const [search, setSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const { theme, toggleTheme } = useTheme();

  // Filter conversations by search
  const q = search.trim().toLowerCase();
  const filteredConvs = conversations.filter(conv => {
    if (!q) return true;
    return (
      conv.title.toLowerCase().includes(q) ||
      (conv.messages[conv.messages.length - 1]?.text || "").toLowerCase().includes(q)
    );
  });

  // Share button handler
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/groot');
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 1500);
    } catch {
      setShareMsg("Failed to copy");
      setTimeout(() => setShareMsg(""), 1500);
    }
  };

  return (
    <aside className="w-64 sm:w-80 min-w-[12rem] sm:min-w-[16rem] max-w-xs bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full">
      <div className="p-4 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-800 justify-between">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-700 dark:text-neutral-100 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition text-sm"
          onClick={onNewConversation}
        >
          <FiPlus />
          <span className="hidden sm:inline">New chat</span>
          <span className="sm:hidden">New</span>
        </button>
        <button
          className="ml-auto p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition text-neutral-500 dark:text-neutral-300"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
      <div className="px-3 sm:px-4 py-2 border-b border-neutral-100">
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 text-neutral-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 sm:pl-10 pr-3 py-2 rounded-lg bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-green-100 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConvs.map((conv) => (
          <div
            key={conv.id}
            className={`px-3 sm:px-4 py-3 cursor-pointer border-b border-neutral-100 flex items-center justify-between gap-2 transition-all ${
              conv.id === currentId ? "bg-neutral-100 border-l-4 border-green-500" : "hover:bg-neutral-50"
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="flex-1 min-w-0">
              {renamingId === conv.id ? (
                <input
                  className="text-sm font-medium text-neutral-900 bg-white border border-green-300 rounded px-1 py-0.5 w-32 focus:outline-none focus:ring-2 focus:ring-green-200"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => { onRenameConversation(conv.id, editValue); setRenamingId(null); setEditValue(""); }}
                  autoFocus
                />
              ) : (
                <span className="font-medium text-sm text-neutral-900 truncate w-24 sm:w-36">{conv.title}</span>
              )}
              <div className="text-xs text-neutral-400 truncate">
                {conv.messages[conv.messages.length - 1]?.text}
              </div>
            </div>
            <button
              className="text-neutral-400 hover:text-green-600 p-1"
              title="Menu"
              onClick={e => { e.stopPropagation(); setMenuOpenId(menuOpenId === conv.id ? null : conv.id); }}
            >
              <FiMoreVertical size={18} />
            </button>
            {menuOpenId === conv.id && (
              <div className="absolute right-8 top-10 z-20 bg-white border border-neutral-200 rounded shadow-md w-32 py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-100"
                  onClick={e => { e.stopPropagation(); setRenamingId(conv.id); setEditValue(conv.title); setMenuOpenId(null); }}
                >
                  Rename
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  onClick={e => { e.stopPropagation(); onDeleteConversation(conv.id); setMenuOpenId(null); }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {filteredConvs.length === 0 && (
          <div className="px-4 py-8 text-center text-neutral-400">No conversations found</div>
        )}
      </div>
      <div className="p-3 sm:p-4 border-t border-neutral-100">
        <button className="w-full text-sm text-green-600 hover:underline" onClick={handleShare}>
          <span className="hidden sm:inline">Share Groot with a friend</span>
          <span className="sm:hidden">Share Groot</span>
        </button>
        {shareMsg && <div className="text-green-600 text-xs mt-1 text-center">{shareMsg}</div>}
      </div>
    </aside>
  );
} 