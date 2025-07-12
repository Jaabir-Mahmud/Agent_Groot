import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { FileText, CheckCircle } from 'lucide-react';
import { Progress } from '../ui/progress';
import { ScrollArea } from '../ui/scroll-area';

const ResultsPanel = ({ currentResult, isProcessing }) => (
  <Card className="h-full flex flex-col dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
    <CardHeader className="border-b border-gray-200 dark:border-gray-700">
      <CardTitle className="flex items-center dark:text-white">
        <FileText className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
        Results
        {isProcessing && (
          <Progress value={50} className="ml-auto w-24 h-2 bg-gray-200 dark:bg-gray-700" />
        )}
      </CardTitle>
      <CardDescription className="dark:text-gray-400">
        View the output from your multi-agent collaboration
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-1 overflow-hidden p-0">
      <ScrollArea className="h-full max-h-[500px]">
        {currentResult ? (
          <div className="h-full">
            <div className="bg-gray-50 dark:bg-gray-600 rounded-lg p-4 h-full overflow-auto max-h-[450px]">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed max-h-[400px] overflow-auto">
                {currentResult}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>Results will appear here after task completion</p>
          </div>
        )}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default ResultsPanel; 