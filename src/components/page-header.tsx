'use client';

import React from 'react';
import { Download, Sparkles, Trash2, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PageHeaderProps {
  onDownload: () => void;
  onBeautify: () => void;
  onReset: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onDownload, onBeautify, onReset }) => {
  return (
    <header className="flex items-center justify-between p-2 border-b border-border shadow-sm flex-shrink-0 bg-card">
      <div className="flex items-center gap-3">
        <Code className="w-8 h-8 text-accent" />
        <h1 className="text-xl font-bold font-headline text-primary">Webpage Previewer</h1>
      </div>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onBeautify}>
                <Sparkles className="w-4 h-4 mr-2" />
                Beautify HTML
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Format the HTML code</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as index.html</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="sm" onClick={onReset}>
                <Trash2 className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear all code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default PageHeader;
