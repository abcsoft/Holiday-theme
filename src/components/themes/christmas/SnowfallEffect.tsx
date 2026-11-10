import React, { useState, useEffect } from 'react';
import { Snowflake } from 'lucide-react';

export const SnowfallEffect: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [isVisibleTab, setIsVisibleTab] = useState(true);

  // Check prefers-reduced-motion and tab visibility
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect user motion preferences
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setEnabled(false);
    }

    const handleVisibilityChange = () => {
      setIsVisibleTab(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 12 lightweight, restrained CSS animated flakes with subtle offsets
  const flakes = [
    { left: '6%', delay: '0s', duration: '12s', size: '10px' },
    { left: '16%', delay: '2.5s', duration: '14s', size: '8px' },
    { left: '28%', delay: '4s', duration: '11s', size: '11px' },
    { left: '38%', delay: '1s', duration: '15s', size: '9px' },
    { left: '50%', delay: '5s', duration: '13s', size: '10px' },
    { left: '62%', delay: '3s', duration: '12s', size: '7px' },
    { left: '74%', delay: '6.5s', duration: '16s', size: '10px' },
    { left: '85%', delay: '2s', duration: '13s', size: '8px' },
    { left: '95%', delay: '4.5s', duration: '14s', size: '11px' },
  ];

  return (
    <>
      {/* Discreet Snowfall Toggle in Bottom Left */}
      <button
        onClick={() => setEnabled(!enabled)}
        aria-label={enabled ? 'Pause holiday snowfall' : 'Enable holiday snowfall'}
        title={enabled ? 'Turn off snowfall animation' : 'Turn on snowfall animation'}
        className={`fixed bottom-4 left-4 z-40 p-2 rounded-full border text-xs flex items-center gap-1.5 shadow-sm backdrop-blur-md transition-all cursor-pointer ${
          enabled
            ? 'bg-white/80 hover:bg-white text-[#073D2B] border-[#073D2B]/15'
            : 'bg-white/50 hover:bg-white/80 text-[#15233B]/40 border-gray-200 line-through'
        }`}
      >
        <Snowflake className={`w-3.5 h-3.5 ${enabled ? 'text-[#073D2B] animate-spin-slow' : 'opacity-40'}`} />
        <span className="text-[10px] font-medium hidden md:inline">
          {enabled ? 'Snow: On' : 'Snow: Off'}
        </span>
      </button>

      {/* Render flakes only when enabled and current tab is active */}
      {enabled && isVisibleTab && (
        <div aria-hidden="true" className="pointer-events-none select-none">
          {flakes.map((f, i) => (
            <span
              key={i}
              className="snow-flake"
              style={{
                left: f.left,
                animationDelay: f.delay,
                animationDuration: f.duration,
                fontSize: f.size,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      )}
    </>
  );
};
