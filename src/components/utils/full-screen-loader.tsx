import React from 'react';
import { logo } from './logo';

export default function FullScreenLoader() {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-white">
      <div className="space-y-2">
        <p className="text-4xl">{logo}</p>
        <div className="progress-loader h-1 w-44 rounded-full bg-pink-500"></div>
        <p className="font-medium">Loading...</p>
      </div>
    </div>
  );
}
