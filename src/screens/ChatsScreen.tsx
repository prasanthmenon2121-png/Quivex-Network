import { useState } from 'react';
import { Search, PenSquare, X } from 'lucide-react';

type TabType = 'all' | 'unread' | 'groups';

export function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div className="flex flex-col h-full">
      {/* Desktop Header */}
      <header className="hidden lg:flex h-14 px-4 items-center justify-between border-b border-border bg-surface shrink-0">
        <h1 className="text-[20px] font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
          Chats
        </h1>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg">
            <PenSquare className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-surface shrink-0">
        <h1 className="text-[20px] font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
          Chats
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg">
            <PenSquare className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Search Bar - Desktop always visible */}
      <div className="hidden lg:block px-4 py-3 bg-surface">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full h-10 pl-10 pr-10 bg-surface2 text-text text-sm rounded-lg border border-border outline-none transition-colors placeholder:text-muted/40 focus:border-accent/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Bar - Mobile expandable */}
      {isSearchExpanded && (
        <div className="lg:hidden px-4 py-3 bg-surface">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations"
              className="w-full h-10 pl-10 pr-10 bg-surface2 text-text text-sm rounded-lg border border-border outline-none transition-colors placeholder:text-muted/40 focus:border-accent/50"
              autoFocus
              onBlur={() => setIsSearchExpanded(false)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 py-2 bg-surface border-b border-border">
        <div className="flex gap-2">
          {(['all', 'unread', 'groups'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${activeTab === tab
                ? 'bg-accent/10 border border-accent/20 text-accent'
                : 'text-muted hover:text-text'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {/* TODO: Add actual conversations from hook */}
        <div className="flex items-center justify-center h-full text-muted">
          Chat list coming soon...
        </div>
      </div>
    </div>
  );
}
