import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquarePlus, Search, Settings, Users, Hash, LayoutGrid, Shield, Zap, Menu } from 'lucide-react';
import { QuivexLogo } from '../components/brand/QuivexLogo';
import { ConnectionStatus } from '../components/system/ConnectionStatus';

interface HomeScreenProps {
  displayName: string | null;
  qvexId: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ displayName, qvexId }) => {
  return (
    <div className="app-screen bg-bg flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar - Desktop only */}
      <aside className="hidden md:flex w-72 lg:w-80 flex-col bg-surface border-r border-border z-30">
        <header className="p-6 lg:p-8 flex items-center justify-between border-b border-border/50">
          <QuivexLogo variant="icon" size={28} className="saturate-150" />
          <button className="p-2 -mr-2 text-muted hover:text-text transition-colors hover:bg-card/50 rounded-lg">
            <Settings className="w-5 h-5" />
          </button>
        </header>

        <div className="px-5 py-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-card border border-border rounded-lg pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-border-strong focus:ring-1 focus:ring-accent/15 transition-all placeholder:text-muted/20 font-medium"
            />
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          <SidebarItem icon={<MessageSquarePlus className="w-5 h-5" />} label="Conversations" active />
          <SidebarItem icon={<Users className="w-5 h-5" />} label="Contacts" />
          <SidebarItem icon={<Hash className="w-5 h-5" />} label="Communities" />
          <SidebarItem icon={<LayoutGrid className="w-5 h-5" />} label="Vault" />
        </nav>

        <div className="p-5 border-t border-border mt-auto">
          <div className="flex items-center gap-3 p-3.5 bg-card hover:bg-card/80 rounded-lg border border-border hover:border-border-strong transition-all group cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center border border-accent-border font-bold text-sm text-accent shrink-0">
              {displayName?.[0]?.toUpperCase() || 'Q'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm truncate text-text">{displayName || 'Anonymous'}</div>
              <div className="text-[10px] text-muted/60 font-mono truncate tracking-tight uppercase font-bold opacity-60">{qvexId}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative bg-bg">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-5 bg-surface border-b border-border z-20 safe-area-pt">
          <div className="flex items-center gap-3">
            <button className="p-2 -ml-2 text-muted hover:text-text transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <QuivexLogo variant="icon" size={24} className="saturate-150" />
          </div>
          <ConnectionStatus />
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-end p-6 border-b border-border/50 bg-surface/30">
          <ConnectionStatus />
        </header>

        {/* Empty State / Dashboard Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000">
          <motion.div
            className="relative mb-12 group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 bg-card rounded-3xl flex items-center justify-center border border-border/50 shadow-lg relative overflow-hidden group-hover:border-border transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-soft to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <QuivexLogo variant="wordmark" size={72} className="opacity-30 grayscale" />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-12 h-12 bg-accent-soft rounded-xl flex items-center justify-center border border-accent-border"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="w-6 h-6 text-accent" />
            </motion.div>
          </motion.div>

          <h3 className="text-3xl font-black mb-3 tracking-tight text-text">No conversations yet</h3>
          <p className="text-muted max-w-md mx-auto mb-10 leading-relaxed font-medium text-base">
            Start a private conversation with a Quivex ID to begin secure messaging.
          </p>

          <button className="btn-primary max-w-xs">
            <MessageSquarePlus className="w-5 h-5" />
            <span>Start a conversation</span>
          </button>

          <div className="mt-16 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted/40 font-bold select-none">
            <Shield className="w-3 h-3" />
            <span>Encrypted & Secure</span>
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden flex items-center justify-around p-3 bg-surface border-t border-border safe-area-pb z-20">
          <MobileNavItem icon={<MessageSquarePlus className="w-6 h-6" />} active />
          <MobileNavItem icon={<Users className="w-6 h-6" />} />
          <MobileNavItem icon={<Hash className="w-6 h-6" />} />
          <MobileNavItem icon={<LayoutGrid className="w-6 h-6" />} />
        </nav>
      </main>
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  active = false
}: {
  icon: React.ReactNode,
  label: string,
  active?: boolean
}) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all group ${active
    ? 'bg-accent-soft text-accent border border-accent-border'
    : 'text-muted hover:text-text hover:bg-card/50 border border-transparent'
    }`}>
    <div className={active ? 'text-accent' : 'text-muted group-hover:text-text'}>
      {icon}
    </div>
    <span className="truncate">{label}</span>
  </button>
);

const MobileNavItem = ({
  icon,
  active = false
}: {
  icon: React.ReactNode,
  active?: boolean
}) => (
  <button className={`p-3 rounded-lg transition-all ${active
    ? 'bg-accent-soft text-accent'
    : 'text-muted hover:text-text hover:bg-card/50'
    }`}>
    {icon}
  </button>
);

export { HomeScreen };
export default HomeScreen;


