import React, { useState } from 'react';
import { Palette, Check, Sparkles, ChevronDown, ChevronUp, Eye, SlidersHorizontal } from 'lucide-react';
import { REGISTERED_THEMES, resolveTheme } from '../themes/themeResolver';
import { ThemeConfig } from '../types/commerce';

interface ThemePreviewToolbarProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ThemePreviewToolbar: React.FC<ThemePreviewToolbarProps> = ({
  currentThemeId,
  onSelectTheme,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTokens, setShowTokens] = useState(false);

  const activeTheme = resolveTheme(currentThemeId);

  return (
    <aside aria-label="Storefront Theme Resolver" className="fixed bottom-4 right-4 z-40 max-w-xs sm:max-w-sm">
      <div className="bg-[#15233B]/95 text-white backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all text-xs">
        {/* Toggle Bar */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 sm:p-3 px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3 cursor-pointer hover:bg-white/5 transition-colors select-none"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Palette className="w-4 h-4 text-[#D8AF62] shrink-0" />
            <div className="hidden sm:block">
              <span className="font-semibold text-white block text-[11px] uppercase tracking-wider">
                Storefront Theme Engine
              </span>
              <span className="text-[10px] text-[#D8AF62] font-mono">
                {activeTheme.name}
              </span>
            </div>
            <span className="sm:hidden text-[11px] font-semibold text-white">Theme</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="bg-[#073D2B] text-[#D8AF62] px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold font-mono border border-[#D8AF62]/30">
              ACTIVE
            </span>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-white/60" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white/60" />
            )}
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="p-4 pt-2 border-t border-white/10 space-y-3 bg-[#0B1526]">
            <p className="text-[11px] text-white/70 leading-relaxed">
              AitoBazar Multi-Theme Resolver. Test and preview registered storefront themes:
            </p>

            <div className="space-y-1.5">
              {REGISTERED_THEMES.map((theme) => {
                const isCurrent = theme.id === currentThemeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#073D2B] border-[#D8AF62]/50 text-white shadow-xs'
                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white">
                          {theme.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] bg-[#B51225] text-white px-1.5 py-0.2 rounded font-mono font-bold">
                            PREVIEWING
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5">
                        {theme.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.primaryColor }}
                        title="Primary Color"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: theme.accentColor }}
                        title="Accent Color"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Design Tokens Inspector */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setShowTokens(!showTokens)}
                className="text-[11px] text-[#D8AF62] hover:text-[#F4DBA3] font-medium flex items-center gap-1 cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>{showTokens ? 'Hide Design Tokens' : 'Inspect Design Tokens'}</span>
              </button>

              {showTokens && (
                <div className="mt-2 p-2.5 rounded-lg bg-black/40 border border-white/10 space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-white/60">Forest Green:</span>
                    <span className="text-white">#073D2B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Christmas Red:</span>
                    <span className="text-white">#B51225</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Warm Ivory:</span>
                    <span className="text-white">#FAF7F0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Champagne Gold:</span>
                    <span className="text-white">#D8AF62</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Deep Navy:</span>
                    <span className="text-white">#15233B</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
