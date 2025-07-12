import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiMic, FiCopy, FiZap } from "react-icons/fi";

// Avatar components instead of image files
const AIAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-medium text-sm border border-gray-200">
    xB
  </div>
);

const UserAvatar = () => (
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-medium text-sm border border-gray-200">
    U
  </div>
);

export default function ChatMain({ conversation, onSendMessage, onAIMessage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterProcessing, setIsPuterProcessing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFastMode, setIsFastMode] = useState(false);
  const pollingRef = useRef(null);
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const fileInputRef = useRef(null);
  const API_BASE_URL = 'http://127.0.0.1:5000/api';

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation?.messages, isLoading]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const sendMessage = async (text) => {
    onSendMessage(text);
    
    // Use Puter.js if Fast Mode is enabled, otherwise use Mistral
    if (isFastMode) {
      setIsPuterProcessing(true);
      try {
        // Use Puter.js directly in the browser
        if (typeof puter !== 'undefined') {
          // Use Puter.js AI for fast analysis with correct API
          const result = await puter.ai.chat(text, { model: "gpt-4.1-nano" });
          
          // Extract text content from the response object
          const responseText = result?.message || result?.text || result?.toString() || 'No response received';
          onAIMessage(responseText);
        } else {
          throw new Error('Puter.js not loaded');
        }
      } catch (error) {
        onAIMessage(`Puter.js Error: ${error.message}`);
      } finally {
        setIsPuterProcessing(false);
      }
    } else {
      // Use regular Mistral processing
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task: text })
        });
        const data = await res.json();
        if (data.success && data.task_id) {
          pollForResult(data.task_id);
        } else {
          onAIMessage(data.error || "Sorry, something went wrong.");
          setIsLoading(false);
        }
      } catch {
        onAIMessage("Network error. Please try again.");
        setIsLoading(false);
      }
    }
  };

  const pollForResult = (taskId) => {
    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/tasks/${taskId}`);
        const data = await res.json();
        if (data.success && data.task && (data.task.status === "completed" || data.task.status === "failed")) {
          clearInterval(pollingRef.current);
          onAIMessage(data.task.result || data.task.error || "No response.");
          setIsLoading(false);
        }
      } catch {
        // Silently handle polling errors
      }
    }, 1500);
  };

  // Removed title variable as header is no longer needed

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleFastMode = () => {
    setIsFastMode(!isFastMode);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsPuterProcessing(true);
    onSendMessage(`Uploading file: ${file.name}`);
    
    try {
      // Use Puter.js directly in the browser
      if (typeof puter !== 'undefined') {
        // Upload file to Puter.js cloud storage
        const uploadedFile = await puter.fs.upload(file);
        
        // Use Puter.js AI to analyze the file with correct API
        const task = inputValue || `Analyze this ${file.name} file and provide insights`;
        
        const result = await puter.ai.chat(task, uploadedFile.url, { model: "gpt-4o" });
        
        // Extract text content from the response object
        const responseText = result?.message || result?.text || result?.toString() || 'No response received';
        onAIMessage(responseText);
        setInputValue('');
      } else {
        throw new Error('Puter.js not loaded');
      }
    } catch (error) {
      onAIMessage(`File Processing Error: ${error.message}`);
    } finally {
      setIsPuterProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputSend = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading && !isPuterProcessing) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  // Find if there are any user messages in the conversation
  const hasUserMessage = conversation?.messages?.some(m => m.sender === "user");
  const hasAnyMessage = conversation?.messages && conversation.messages.length > 0;

  if (!hasAnyMessage) {
    // Welcome state: no messages yet
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-8 py-12">
          <form
            onSubmit={handleInputSend}
            className="flex items-center flex-nowrap gap-2 w-full bg-white rounded-2xl shadow-lg border border-gray-200 px-3 py-3"
          >
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              accept=".txt,.md,.py,.js,.jsx,.ts,.tsx,.json,.xml,.html,.css,.csv,.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.svg"
              className="hidden"
            />
            <button 
              type="button" 
              onClick={handleFileButtonClick}
              disabled={isPuterProcessing}
              className="text-gray-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 shrink-0" 
              tabIndex={-1} 
              title="Attach file with Puter.js"
            >
              <FiPaperclip size={16} />
            </button>
            <button type="button" className=" text-gray-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 shrink-0" tabIndex={-1} title="Agent mode">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 17v-2a4 4 0 0 1 4-4h2"/><path d="M9 7V5a4 4 0 0 1 4-4h2"/><path d="M17 7v2a4 4 0 0 1-4 4h-2"/><path d="M15 17v2a4 4 0 0 1-4 4h-2"/></svg>
            </button>
            <button 
              type="button" 
              onClick={toggleFastMode}
              className={`transition rounded-full shrink-0 ${
                isFastMode 
                  ? 'text-cyan-600 bg-cyan-100 hover:bg-cyan-200' 
                  : 'text-gray-400 hover:text-cyan-600 hover:bg-gray-100'
              }`}
              tabIndex={-1} 
              title="Fast Mode"
            >
              <FiZap size={16} />
            </button>
            <button type="button" className=" text-gray-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 shrink-0" tabIndex={-1} title="Prompt templates">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8v8H8z"/></svg>
            </button>
            <textarea
              ref={inputRef}
              rows={2}
              className="w-full flex-1 min-w-0 px-4 py-2 rounded-lg bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-cyan-100 text-base resize-none"
              placeholder="Assign a task or ask anything"
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.max(48, Math.min(e.target.scrollHeight, 72)) + 'px';
              }}
              style={{ lineHeight: '1.5', maxHeight: '72px', overflow: 'hidden' }}
              disabled={isLoading || isPuterProcessing}
            />
            <button type="button" className="p-2 text-gray-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 shrink-0" tabIndex={-1} title="Voice input">
              <FiMic size={20} />
            </button>
            <button
              type="submit"
              className={`p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white transition w-auto shrink-0`}
              title="Send"
            >
              <FiSend size={20} />
            </button>
          </form>
          <div className="flex gap-2 w-full justify-center flex-wrap mt-2">
            <button title="Create slides from your input" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 17h18M8 21h8"/></svg>Slides</button>
            <button title="Generate an image" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="4"/></svg>Image</button>
            <button title="Generate a video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 6V4a5 5 0 0 1 10 0v2"/></svg>Video</button>
            <button title="Generate audio" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 9l6 3-6 3V9z"/></svg>Audio</button>
            <button title="Summarize a webpage" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5V3h10v2"/></svg>Webpage</button>
            <button title="Playback your content" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-neutral-700 font-medium shadow-sm hover:bg-cyan-50 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8"/></svg>Playback</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-neutral-950">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 flex flex-col gap-4">
        {conversation?.messages?.map((msg) => (
          <div
            key={msg.id}
            className={`w-full flex ${msg.sender === "ai" ? "flex-row" : "flex-row-reverse"} items-end mb-3 group`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mb-1">
              {msg.sender === "ai" ? <AIAvatar /> : <UserAvatar />}
            </div>
            {/* Message bubble */}
            <div className="flex flex-col max-w-[70%]">
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed relative transition-all shadow-sm ${
                  msg.sender === "ai"
                    ? "bg-white dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 border border-gray-200 dark:border-neutral-700 text-left"
                    : "bg-blue-50 dark:bg-blue-900 text-black dark:text-blue-100 border border-blue-100 dark:border-blue-800 text-right"
                }`}
                style={{ wordBreak: 'break-word' }}
              >
                {msg.text}
                <button
                  className={`absolute -bottom-3 ${msg.sender === "ai" ? "-right-3" : "-left-3"} opacity-0 group-hover:opacity-100 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-full p-1.5 shadow-sm hover:text-cyan-500 transition z-10`}
                  title="Copy"
                  onClick={() => handleCopy(msg.text)}
                >
                  <FiCopy size={14} />
                </button>
              </div>
              <div className={`text-xs text-gray-400 dark:text-neutral-400 mt-1 px-1 ${msg.sender === "ai" ? "text-left" : "text-right"}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {(isLoading || isPuterProcessing) && (
          <div className="flex items-start gap-3 self-start">
            <div className="mt-1">
              <AIAvatar />
            </div>
            <div className="flex flex-col max-w-[90%] sm:max-w-[85%] items-start">
              <div className="bg-white dark:bg-neutral-800 text-gray-800 dark:text-neutral-100 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 sm:px-4 py-2.5 text-sm leading-relaxed">
                <div className="flex items-center gap-2">
                  <span className="text-green-900 dark:text-green-300 font-medium">
                    {isPuterProcessing ? "Puter.js AI" : "Mistral"}
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {isPuterProcessing ? "processing with AI" : "working on it"}
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-green-700 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 dark:text-neutral-400 mt-1 px-1">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area + Quick Actions */}
      <div className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-white/80 dark:from-neutral-900/90 to-transparent pt-2 pb-2 px-2 sm:px-4">
        <form
          onSubmit={handleInputSend}
          className="flex items-center flex-nowrap gap-2 w-full max-w-3xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-800 px-3 py-2 sm:py-3"
        >
          {/* Left icon buttons */}
          <button 
            type="button" 
            onClick={handleFileButtonClick}
            disabled={isPuterProcessing}
            className="p-2 text-gray-400 dark:text-neutral-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 shrink-0" 
            tabIndex={-1} 
            title="Attach file with Puter.js"
          >
            <FiPaperclip size={20} />
          </button>
          <button type="button" className="p-2 text-gray-400 dark:text-neutral-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 shrink-0" tabIndex={-1} title="Agent mode">
            {/* Language/translate icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 17v-2a4 4 0 0 1 4-4h2"/><path d="M9 7V5a4 4 0 0 1 4-4h2"/><path d="M17 7v2a4 4 0 0 1-4 4h-2"/><path d="M15 17v2a4 4 0 0 1-4 4h-2"/></svg>
          </button>
          <button 
            type="button" 
            onClick={toggleFastMode}
            className={`transition rounded-full shrink-0 ${
              isFastMode 
                ? 'text-cyan-600 bg-cyan-100 dark:bg-cyan-900 dark:text-cyan-400 hover:bg-cyan-200 dark:hover:bg-cyan-800' 
                : 'text-gray-400 dark:text-neutral-400 hover:text-cyan-600 hover:bg-gray-100 dark:hover:bg-neutral-800'
            }`}
            tabIndex={-1} 
            title="Fast Mode"
          >
            <FiZap size={20} />
          </button>
          <button type="button" className="text-gray-400 dark:text-neutral-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 shrink-0" tabIndex={-1} title="Prompt templates">
            {/* Prompt/template icon */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M8 8h8v8H8z"/></svg>
          </button>
          {/* Input */}
          <textarea
            ref={inputRef}
            rows={2}
            className="w-full flex-1 min-w-0 px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-cyan-100 dark:focus:ring-cyan-900 text-base resize-none text-black dark:text-neutral-100"
            placeholder="Assign a task or ask anything"
            value={inputValue}
            onChange={e => {
              setInputValue(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = Math.max(48, Math.min(e.target.scrollHeight, 72)) + 'px';
            }}
            style={{ lineHeight: '1.5', maxHeight: '72px', overflow: 'hidden' }}
            disabled={isLoading || isPuterProcessing}
          />
          {/* Mic button */}
          <button type="button" className="p-2 text-gray-400 dark:text-neutral-400 hover:text-cyan-600 transition rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 shrink-0" tabIndex={-1} title="Voice input">
            <FiMic size={20} />
          </button>
          {/* Send button (always enabled) */}
          <button
            type="submit"
            className={`p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white transition w-auto shrink-0`}
            title="Send"
          >
            <FiSend size={20} />
          </button>
        </form>
        {/* Quick Actions Row (only before first user message) */}
        {!hasUserMessage && (
          <div className="flex gap-2 mt-3 w-full max-w-3xl mx-auto overflow-x-auto pb-1">
            <button title="Create slides from your input" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M3 17h18M8 21h8"/></svg>Slides</button>
            <button title="Generate an image" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="4"/></svg>Image</button>
            <button title="Generate a video" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M7 6V4a5 5 0 0 1 10 0v2"/></svg>Video</button>
            <button title="Generate audio" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 9l6 3-6 3V9z"/></svg>Audio</button>
            <button title="Summarize a webpage" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 5V3h10v2"/></svg>Webpage</button>
            <button title="Playback your content" className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-100 font-medium shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900 transition text-sm"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8"/></svg>Playback</button>
          </div>
        )}
        <div className="text-xs text-center text-gray-400 dark:text-neutral-500 mt-2">
          AI may produce inaccurate information. Consider verifying important details.
        </div>
      </div>
    </div>
  );
}