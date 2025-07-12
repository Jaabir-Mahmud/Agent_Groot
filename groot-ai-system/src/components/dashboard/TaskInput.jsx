import React, { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Terminal, Send, Loader2, Upload, Zap, FileText } from 'lucide-react';
import { toast } from 'sonner';

const TaskInput = ({ taskInput, setTaskInput, isProcessing, handleSubmitTask, agents, onPuterResult }) => {
  const [puterMode, setPuterMode] = useState('fast'); // 'fast' or 'file'
  const [isPuterProcessing, setIsPuterProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const API_BASE_URL = 'http://127.0.0.1:5000/api';

  const handlePuterFastMode = async () => {
    if (!taskInput.trim() || isPuterProcessing) return;
    
    setIsPuterProcessing(true);
    toast.info('Processing with Puter.js Fast Mode...');
    
    try {
      const response = await fetch(`${API_BASE_URL}/puter/fast-mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: taskInput,
          context: 'Fast analysis and response generation'
        })
      });
      
      if (!response.ok) throw new Error('Fast mode request failed');
      
      const data = await response.json();
      if (data.success) {
        onPuterResult(data.result, 'Puter.js Fast Mode');
        setTaskInput('');
        toast.success('Fast mode analysis completed!');
      } else {
        throw new Error(data.error || 'Fast mode failed');
      }
    } catch (error) {
      toast.error(`Fast mode error: ${error.message}`);
    } finally {
      setIsPuterProcessing(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsPuterProcessing(true);
    toast.info(`Processing file: ${file.name} with Puter.js...`);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('task', taskInput || `Analyze this ${file.name} file and provide insights`);
      
      const response = await fetch(`${API_BASE_URL}/puter/upload`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error('File upload failed');
      
      const data = await response.json();
      if (data.success) {
        onPuterResult(data.result, `Puter.js File Analysis: ${file.name}`);
        setTaskInput('');
        toast.success(`File analysis completed: ${file.name}`);
      } else {
        throw new Error(data.error || 'File processing failed');
      }
    } catch (error) {
      toast.error(`File processing error: ${error.message}`);
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

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <form onSubmit={handleSubmitTask} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Describe your task
            </label>
            <span className="text-xs text-gray-500">
              {taskInput.length} characters
            </span>
          </div>
          <div className="relative">
            <Textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="e.g., Research the latest advancements in quantum computing and summarize key findings..."
              className="min-h-[120px] max-h-[300px] overflow-y-auto resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600 pl-10"
              disabled={isProcessing || isPuterProcessing}
            />
            <div className="absolute left-3 top-3 text-gray-400 dark:text-gray-500">
              <Terminal className="h-5 w-5" />
            </div>
          </div>
        </div>
        
        {/* Puter.js Mode Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            <input
              type="radio"
              id="fast-mode"
              name="puter-mode"
              value="fast"
              checked={puterMode === 'fast'}
              onChange={(e) => setPuterMode(e.target.value)}
              className="w-4 h-4 text-emerald-600"
            />
            <label htmlFor="fast-mode" className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
              <Zap className="h-4 w-4 mr-1" />
              Fast Mode
            </label>
          </div>
          <div className="flex items-center space-x-1">
            <input
              type="radio"
              id="file-mode"
              name="puter-mode"
              value="file"
              checked={puterMode === 'file'}
              onChange={(e) => setPuterMode(e.target.value)}
              className="w-4 h-4 text-emerald-600"
            />
            <label htmlFor="file-mode" className="text-sm text-gray-700 dark:text-gray-300 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Attach File
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Regular Submit Button */}
            <Button 
              type="submit" 
              disabled={!taskInput.trim() || isProcessing || isPuterProcessing}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Task
                </>
              )}
            </Button>

            {/* Puter.js Fast Mode Button */}
            {puterMode === 'fast' && (
              <Button 
                type="button"
                onClick={handlePuterFastMode}
                disabled={!taskInput.trim() || isProcessing || isPuterProcessing}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md"
              >
                {isPuterProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Puter.js Processing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Puter.js Fast Mode
                  </>
                )}
              </Button>
            )}

            {/* Puter.js File Upload Button */}
            {puterMode === 'file' && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  accept=".txt,.md,.py,.js,.jsx,.ts,.tsx,.json,.xml,.html,.css,.csv,.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.svg"
                  className="hidden"
                />
                <Button 
                  type="button"
                  onClick={handleFileButtonClick}
                  disabled={isProcessing || isPuterProcessing}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md"
                >
                  {isPuterProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing File...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Attach File & Analyze
                    </>
                  )}
                </Button>
              </>
            )}
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <div className="flex -space-x-1 mr-2">
              {agents.slice(0, 3).map((agent, index) => (
                <div key={index} className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  {agent.icon ? agent.icon : agent.name[0]}
                </div>
              ))}
              {agents.length > 3 && (
                <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs">
                  +{agents.length - 3}
                </div>
              )}
            </div>
            {agents.filter(a => a.status === "active").length}/{agents.length} agents available
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput; 