import React from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Terminal, Send, Loader2 } from 'lucide-react';

const TaskInput = ({ taskInput, setTaskInput, isProcessing, handleSubmitTask, agents }) => (
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
            disabled={isProcessing}
          />
          <div className="absolute left-3 top-3 text-gray-400 dark:text-gray-500">
            <Terminal className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button 
          type="submit" 
          disabled={!taskInput.trim() || isProcessing}
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
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <div className="flex -space-x-1 mr-2">
            {agents.slice(0, 3).map((agent, index) => (
              <div key={index} className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                {/* You may want to pass getAgentIcon as a prop if you want icons here */}
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

export default TaskInput; 