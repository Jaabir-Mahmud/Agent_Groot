import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { ChevronRight, ChevronDown, Server } from 'lucide-react';

const AgentSidebar = ({
  agents,
  expandedAgents,
  toggleAgentDetails,
  sidebarCollapsed,
  setSidebarCollapsed,
  getAgentIcon,
  getStatusColor,
  getStatusIcon
}) => (
  <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}>
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      {!sidebarCollapsed && (
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Server className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
          Agent Network
        </h2>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="h-8 w-8"
      >
        {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
    </div>
    <ScrollArea className="flex-1 p-2">
      {agents.map((agent) => (
        <Card 
          key={agent.id} 
          className={`hover:shadow-md transition-shadow dark:bg-gray-700 mb-2 ${sidebarCollapsed ? 'p-2' : 'p-3'}`}
        >
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`rounded-lg p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 ${sidebarCollapsed ? 'mx-auto' : ''}`}>{getAgentIcon(agent.name)}</div>
                {!sidebarCollapsed && (
                  <div className="truncate">
                    <h3 className="font-medium text-gray-900 dark:text-white truncate">{agent.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{agent.type}</p>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <Badge className={`text-xs ${getStatusColor(agent.status)}`}>
                  {getStatusIcon(agent.status)}
                  <span className="ml-1 capitalize">{agent.status}</span>
                </Badge>
              )}
            </div>
            {!sidebarCollapsed && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full mt-2 text-xs text-gray-500 dark:text-gray-400"
                  onClick={() => toggleAgentDetails(agent.id)}
                >
                  {expandedAgents[agent.id] ? (
                    <ChevronDown className="h-3 w-3 mr-1" />
                  ) : (
                    <ChevronRight className="h-3 w-3 mr-1" />
                  )}
                  Details
                </Button>
                {expandedAgents[agent.id] && (
                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{agent.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.capabilities.map((cap, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  </div>
);

export default AgentSidebar; 