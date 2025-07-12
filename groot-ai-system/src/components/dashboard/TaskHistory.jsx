import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { CheckCircle, AlertCircle, History } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const TaskHistory = ({ taskHistory }) => (
  <Card className="h-full flex flex-col dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
      <CardTitle className="dark:text-white">Task History</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Review previously completed tasks and their results
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 overflow-hidden p-0">
      <ScrollArea className="h-full max-h-[500px]">
        {taskHistory.length > 0 ? (
          taskHistory.map((task) => (
            <div 
              key={task.id} 
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {task.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.task.substring(0, 50)}{task.task.length > 50 ? '...' : ''}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(task.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {task.result.substring(0, 150)}{task.result.length > 150 ? '...' : ''}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-xs h-6 p-0 mt-1 text-emerald-600 dark:text-emerald-400"
                  >
                    View full details
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[600px] max-h-[400px] overflow-auto p-0">
                  <div className="space-y-2">
                    <div className="p-4 border-b">
                      <h4 className="font-bold text-sm">{task.task}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(task.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 max-h-[300px] overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap text-gray-700 dark:text-gray-300 max-h-[280px] overflow-auto">{task.result}</pre>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <History className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>No completed tasks yet</p>
          </div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default TaskHistory; 