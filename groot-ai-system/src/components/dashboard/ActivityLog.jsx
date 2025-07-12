import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Brain, Clock } from 'lucide-react';

const ActivityLog = ({ activityLog, getActivityIcon }) => (
  <Card className="h-full flex flex-col dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
      <CardTitle className="dark:text-white">Complete Activity Log</CardTitle>
      <CardDescription className="dark:text-gray-400">
        Detailed log of all agent activities and system events
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 overflow-hidden p-0">
      <ScrollArea className="h-full max-h-[500px]">
        {activityLog.length > 0 ? (
          activityLog.map((log) => (
            <div 
              key={log.id} 
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {getActivityIcon(log.type)}
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {log.agent}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {log.type || 'info'}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{log.action}</p>
              {log.task_id && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Task ID: {log.task_id}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>No activity logged yet</p>
          </div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default ActivityLog; 