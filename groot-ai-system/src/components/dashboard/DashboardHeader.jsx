import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Cpu, HardDrive, Network, Settings, Sparkles, TreePine } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const DashboardHeader = ({ systemStats, agents }) => (
  <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <TreePine className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Nexus</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Multi-Agent Orchestration Platform</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <Cpu className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium">{systemStats.cpuUsage}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>CPU Utilization</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <HardDrive className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium">{systemStats.memoryUsage}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Memory Usage</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                <Network className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium">{systemStats.activeTasks}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Active Tasks</TooltipContent>
          </Tooltip>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex dark:bg-gray-700 dark:text-white">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  </header>
);

export default DashboardHeader; 