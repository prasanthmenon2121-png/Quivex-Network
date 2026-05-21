import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Users, Settings } from 'lucide-react';
import { useIdentityStore } from '../../stores/identityStore';
import { QuivexLogo } from '../brand/QuivexLogo';
import { ConnectionStatus } from '../system/ConnectionStatus';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { displayName, qvexId } = useIdentityStore();

  const navItems = [
    { to: '/', label: 'Chats', icon: MessageSquare },
    { to: '/contacts', label: 'Contacts', icon: Users },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden bg-bg-deep text-text select-none">
      
      {/* SIDEBAR - DESKTOP (1024px+) & TABLET (768-1023px) */}
      <aside className="hidden md:flex flex-col bg-surface border-r border-border shrink-0 z-30 transition-all duration-300 w-20 lg:w-72">
        {/* Header Section */}
        <div className="h-16 flex items-center justify-center lg:justify-between px-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <QuivexLogo variant="icon" size={28} className="saturate-150" />
            <span className="hidden lg:block font-black text-sm tracking-widest text-text">QUIVEX</span>
          </div>
          <div className="hidden lg:block">
            <ConnectionStatus />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-4 px-4 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all border group ${
                    isActive
                      ? 'bg-accent-soft text-accent border-accent-border'
                      : 'text-muted hover:text-text hover:bg-surface-2 border-transparent'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="hidden lg:block truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User profile Section at bottom */}
        <div className="p-4 border-t border-border bg-surface/50">
          <div className="flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-xl hover:bg-surface-2/60 transition-all duration-200 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center border border-accent-border font-bold text-sm text-accent shrink-0">
              {displayName?.[0]?.toUpperCase() || 'Q'}
            </div>
            <div className="hidden lg:flex flex-col min-w-0 flex-1">
              <span className="font-bold text-sm truncate text-text">{displayName || 'Anonymous'}</span>
              <span className="text-[10px] text-muted font-mono truncate uppercase tracking-tighter opacity-60">
                {qvexId ? qvexId.slice(0, 10) + '...' : 'SECURE'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-surface border-b border-border z-20 shrink-0">
          <div className="flex items-center gap-3">
            <QuivexLogo variant="icon" size={24} className="saturate-150" />
            <span className="font-black text-sm tracking-widest text-text">QUIVEX</span>
          </div>
          <ConnectionStatus />
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto relative p-6 bg-bg-deep">
          {children}
        </main>

        {/* MOBILE BOTTOM NAVIGATION (<768px) */}
        <nav className="md:hidden flex items-center justify-around py-3 bg-surface border-t border-border shrink-0 z-20 safe-area-pb">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-1 px-4 rounded-lg transition-all ${
                    isActive ? 'text-accent' : 'text-muted'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
