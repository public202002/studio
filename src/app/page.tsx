'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import PageHeader from '@/components/page-header';
import CodeInputs from '@/components/code-inputs';
import LivePreview from '@/components/live-preview';

const initialHtml = `<!-- Welcome to the live editor! -->
<h1>Hello, World!</h1>
<p>Start typing your HTML, CSS, and JavaScript to see the magic happen in real-time.</p>
<button onclick="showcase()">Click Me</button>
`;

const initialCss = `body {
  font-family: sans-serif;
  padding: 1.5rem;
  background: #fff;
  color: #333;
  transition: background-color 0.3s ease;
}

h1 {
  color: #2C3E50;
  font-size: 2.5rem;
}

p {
  font-size: 1.1rem;
  line-height: 1.6;
}

button {
  background-color: #1ABC9C;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0,0,0,0.15);
  background-color: #16a085;
}
`;

const initialJs = `function showcase() {
  alert('Hello from your custom JavaScript!');
}

console.log("JavaScript loaded successfully!");
`;

function isSelfClosing(tag: string): boolean {
  return /<area|<base|<br|<col|<embed|<hr|<img|<input|<link|<meta|<param|<source|<track|<wbr/i.test(tag);
}

function beautifyHtml(htmlString: string): string {
  const tab = '  ';
  let indentCount = 0;
  let result = '';

  const processedString = htmlString.replace(/(>)(<)(\/*)/g, '$1\n$2$3');

  processedString.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    if (trimmedLine.match(/^<\//)) {
      indentCount--;
    }
    
    if (indentCount < 0) {
      indentCount = 0;
    }

    result += tab.repeat(indentCount) + trimmedLine + '\n';

    if (trimmedLine.match(/^<[^\/]/) && !trimmedLine.endsWith('/>') && !isSelfClosing(trimmedLine)) {
      indentCount++;
    }
  });

  return result.trim();
}

export default function Home() {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [panelWidth, setPanelWidth] = useState(50);
  const isDragging = useRef(false);

  const srcDoc = useMemo(() => {
    return `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
  }, [html, css, js]);

  const handleReset = useCallback(() => {
    setHtml('');
    setCss('');
    setJs('');
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([srcDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [srcDoc]);

  const handleBeautify = useCallback(() => {
    setHtml(beautifyHtml(html));
  }, [html]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    e.preventDefault();
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);
  
  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setPanelWidth(newWidth);
    }
  }, []);

  useEffect(() => {
    if(isDragging.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [handleMouseMove, handleMouseUp]);


  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <PageHeader onDownload={handleDownload} onBeautify={handleBeautify} onReset={handleReset} />
      <div className="flex flex-grow" onMouseUp={handleMouseUp}>
        <div style={{ width: `${panelWidth}%` }} className="min-w-[20%] max-w-[80%] h-full">
          <CodeInputs html={html} css={css} js={js} setHtml={setHtml} setCss={setCss} setJs={setJs} />
        </div>
        <div
          className="w-2 cursor-col-resize bg-border hover:bg-accent transition-colors duration-200 h-full"
          onMouseDown={handleMouseDown}
        />
        <div style={{ width: `${100 - panelWidth}%` }} className="min-w-[20%] max-w-[80%] h-full">
          <LivePreview srcDoc={srcDoc} />
        </div>
      </div>
    </div>
  );
}
