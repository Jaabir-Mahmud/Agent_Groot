import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  Bot,
  Brain,
  Search,
  FileText,
  Zap,
  Users,
  Settings,
  History,
  Play,
  Pause,
  Square,
  TreePine,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Terminal,
  BookOpen,
  Cpu,
  HardDrive,
  ChevronRight,
  Server,
  Network,
  Database,
  Layers,
  Code,
  BarChart2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import AgentSidebar from './dashboard/AgentSidebar';
import DashboardHeader from './dashboard/DashboardHeader';
import TaskInput from './dashboard/TaskInput';
import ResultsPanel from './dashboard/ResultsPanel';
import ActivityLog from './dashboard/ActivityLog';
import TaskHistory from './dashboard/TaskHistory';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const Dashboard = () => {
  const [taskInput, setTaskInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [currentResult, setCurrentResult] = useState('');
  const [agents, setAgents] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [expandedAgents, setExpandedAgents] = useState({});
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    activeTasks: 0
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle agent details
  const toggleAgentDetails = (agentId) => {
    setExpandedAgents(prev => ({
      ...prev,
      [agentId]: !prev[agentId]
    }));
  };

  // Memoized fetch functions
  const fetchAgents = useCallback(async () => {
    try {
      const [agentsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/agents`, { 
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          cache: 'no-store'
        }),
        fetch(`${API_BASE_URL}/status`, { 
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          cache: 'no-store'
        })
      ]);
      
      if (!agentsRes.ok || !statsRes.ok) throw new Error('Failed to fetch data');
      
      const [agentsData, statsData] = await Promise.all([
        agentsRes.json(),
        statsRes.json()
      ]);
      
      if (agentsData.success) setAgents(agentsData.agents);
      if (statsData.success) setSystemStats({
        cpuUsage: statsData.status.active_agents * 25,
        memoryUsage: Math.min(100, statsData.status.total_agents * 15),
        activeTasks: statsData.status.active_tasks
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch system data');
    }
  }, []);

  const fetchActivityLog = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/activity`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch activity log');
      const data = await response.json();
      if (data.success) setActivityLog(data.activities);
    } catch (error) {
      console.error('Error fetching activity log:', error);
      toast.error('Failed to fetch activity log');
    }
  }, []);

  const fetchTaskHistory = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/history`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch task history');
      const data = await response.json();
      if (data.success) setTaskHistory(data.history);
    } catch (error) {
      console.error('Error fetching task history:', error);
      toast.error('Failed to fetch task history');
    }
  }, []);

  const checkTaskStatus = useCallback(async () => {
    if (!currentTaskId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${currentTaskId}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to check task status');
      const data = await response.json();
      
      if (data.success) {
        const task = data.task;
        if (task.status === 'completed') {
          setCurrentResult(task.result);
          setIsProcessing(false);
          setCurrentTaskId(null);
          fetchTaskHistory();
          toast.success('Task completed successfully!');
        } else if (task.status === 'failed') {
          setCurrentResult(`Task failed: ${task.error || 'Unknown error'}`);
          setIsProcessing(false);
          setCurrentTaskId(null);
          toast.error(`Task failed: ${task.error || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Error checking task status:', error);
      toast.error('Failed to check task status');
    }
  }, [currentTaskId, fetchTaskHistory]);

  // Optimized polling with cleanup
  useEffect(() => {
    if (!isProcessing || !currentTaskId) return;

    const interval = setInterval(() => {
      Promise.all([
        checkTaskStatus(),
        fetchAgents(),
        fetchActivityLog()
      ]).catch(console.error);
    }, 1500);

    return () => clearInterval(interval);
  }, [isProcessing, currentTaskId, checkTaskStatus, fetchAgents, fetchActivityLog]);

  // Initial data fetch with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      Promise.all([
        fetchAgents(),
        fetchActivityLog(),
        fetchTaskHistory()
      ]).catch(console.error);
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchAgents, fetchActivityLog, fetchTaskHistory]);

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    if (!taskInput.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentResult('');
    toast.info('Task submitted to agents');
    
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskInput }),
        cache: 'no-store'
      });
      
      if (!response.ok) throw new Error('Task submission failed');
      
      const data = await response.json();
      if (data.success) {
        setCurrentTaskId(data.task_id);
        setTaskInput('');
        toast.success('Task processing started');
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      setIsProcessing(false);
      setCurrentResult(`Error: ${error.message}`);
      toast.error(`Submission failed: ${error.message}`);
    }
  };

  // Status and icon helpers
  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "busy": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "idle": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active": return <Activity className="h-3 w-3" />;
      case "busy": return <Loader2 className="h-3 w-3 animate-spin" />;
      case "idle": return <Pause className="h-3 w-3" />;
      default: return <Pause className="h-3 w-3" />;
    }
  };

  const getAgentIcon = (agentName) => {
    switch (agentName) {
      case "Research Agent": return <Search className="h-5 w-5" />;
      case "Content Agent": return <FileText className="h-5 w-5" />;
      case "Task Agent": return <Zap className="h-5 w-5" />;
      case "Coordinator Agent": return <Users className="h-5 w-5" />;
      case "Data Agent": return <Database className="h-5 w-5" />;
      case "Analysis Agent": return <BarChart2 className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Terminal className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <DashboardHeader systemStats={systemStats} agents={agents} />
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar - Agent Management */}
        <AgentSidebar
          agents={agents}
          expandedAgents={expandedAgents}
          toggleAgentDetails={toggleAgentDetails}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          getAgentIcon={getAgentIcon}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
          {/* Task Input */}
          <TaskInput
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            isProcessing={isProcessing}
            handleSubmitTask={handleSubmitTask}
            agents={agents}
          />
          <div className="flex-1 p-6 overflow-hidden">
            <Tabs defaultValue="workspace" className="h-full">
              <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <TabsTrigger value="workspace" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-emerald-400">
                  <Terminal className="h-4 w-4 mr-2" />
                  Workspace
                </TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-emerald-400">
                  <Activity className="h-4 w-4 mr-2" />
                  Activity Log
                </TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-emerald-400">
                  <History className="h-4 w-4 mr-2" />
                  Task History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="workspace" className="h-full mt-6">
                <div className="grid lg:grid-cols-2 gap-6 h-full">
                  {/* Activity Monitor */}
                  <ActivityLog activityLog={activityLog.slice(-10).reverse()} getActivityIcon={getActivityIcon} />
                  {/* Results Display */}
                  <ResultsPanel currentResult={currentResult} isProcessing={isProcessing} />
                </div>
              </TabsContent>
              <TabsContent value="activity" className="h-full mt-6">
                <ActivityLog activityLog={activityLog} getActivityIcon={getActivityIcon} />
              </TabsContent>
              <TabsContent value="history" className="h-full mt-6">
                <TaskHistory taskHistory={taskHistory} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;