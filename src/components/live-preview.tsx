'use client';

import React from 'react';

interface LivePreviewProps {
  srcDoc: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ srcDoc }) => {
  return (
    <div className="h-full bg-white flex flex-col">
      <iframe
        srcDoc={srcDoc}
        title="Live Preview"
        sandbox="allow-scripts allow-modals"
        frameBorder="0"
        width="100%"
        height="100%"
        className="flex-grow transition-all duration-300"
      />
    </div>
  );
};

export default LivePreview;
