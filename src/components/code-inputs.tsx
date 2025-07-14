'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface CodeInputsProps {
  html: string;
  css: string;
  js: string;
  setHtml: (value: string) => void;
  setCss: (value: string) => void;
  setJs: (value: string) => void;
}

const CodeInputs: React.FC<CodeInputsProps> = ({ html, css, js, setHtml, setCss, setJs }) => {
  return (
    <div className="flex flex-col h-full bg-card">
      <Tabs defaultValue="html" className="flex flex-col flex-grow h-full">
        <TabsList className="m-2">
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
        </TabsList>
        <div className="flex-grow overflow-hidden px-2 pb-2">
            <TabsContent value="html" className="h-full m-0">
                <Textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    placeholder="HTML code here..."
                    className="w-full h-full resize-none font-code text-sm leading-6 bg-background border rounded-md shadow-inner"
                />
            </TabsContent>
            <TabsContent value="css" className="h-full m-0">
                <Textarea
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                    placeholder="CSS code here..."
                    className="w-full h-full resize-none font-code text-sm leading-6 bg-background border rounded-md shadow-inner"
                />
            </TabsContent>
            <TabsContent value="javascript" className="h-full m-0">
                <Textarea
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                    placeholder="JavaScript code here..."
                    className="w-full h-full resize-none font-code text-sm leading-6 bg-background border rounded-md shadow-inner"
                />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CodeInputs;
