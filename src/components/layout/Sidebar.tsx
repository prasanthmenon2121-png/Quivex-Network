import { MessageSquare, Users, UsersRound, Phone, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigation, type NavItem } from '../../store/navigation';

interface SidebarProps {
  displayName: string | null;
  qvexId: string;
  isCompact?: boolean;
  isMobile?: boolean;
}

const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
  { id: 'chats', label: 'Conversations', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'contacts', label: 'Contacts', icon: <Users className="w-5 h-5" /> },
  { id: 'communities', label: 'Communities', icon: <UsersRound className="w-5 h-5" /> },
  { id: 'calls', label: 'Calls', icon: <Phone className="w-5 h-5" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

const navRoutes: Record<NavItem, string> = {
  chats: '/',
  contacts: '/contacts',
  communities: '/communities',
  calls: '/calls',
  settings: '/settings',
};

const activeItemFromPath = (pathname: string): NavItem => {
  if (pathname.startsWith('/contacts') || pathname.startsWith('/requests')) return 'contacts';
  if (pathname.startsWith('/communities')) return 'communities';
  if (pathname.startsWith('/calls')) return 'calls';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'chats';
};

export function Sidebar({ displayName, qvexId, isCompact = false, isMobile = false }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setActiveItem, setIsMobileDrawerOpen } = useNavigation();
  const activeItem = activeItemFromPath(location.pathname);
  const displayId = qvexId || 'QVX ID not ready';
  const displayNameText = displayName || 'User';

  const sidebarWidth = isMobile ? 'w-[56px]' : isCompact ? 'w-[76px]' : 'w-[260px]';
  const headerHeight = isCompact || isMobile ? 'h-14' : 'h-20';

  return (
    <aside
      className={`flex flex-col bg-surface border-r border-border ${sidebarWidth}`}
      style={{ height: isMobile ? '100dvh' : 'auto' }}
    >
      {/* Sidebar Header / Logo Section */}
      <div className={`${headerHeight} flex items-center justify-center border-b border-border shrink-0 px-3`}>
        {!isCompact && !isMobile ? (
          <img src="/logo-transparent.png" alt="QUIVEX" className="h-[60px] w-auto" />
        ) : (
          <img src="/logo-transparent.png" alt="QUIVEX" className="h-8 w-auto" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 space-y-1 overflow-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveItem(item.id);
              setIsMobileDrawerOpen(false);
              navigate(navRoutes[item.id]);
            }}
            className={`w-full h-12 flex items-center rounded-xl transition-all duration-200 ${activeItem === item.id
                ? 'bg-accent/12 text-accent border-l-2 border-accent'
                : 'text-muted hover:text-text hover:bg-surface-2 border-l-2 border-transparent'
              } ${isCompact || isMobile ? 'justify-center px-2' : 'px-3 gap-3'}`}
            title={isCompact || isMobile ? item.label : undefined}
          >
            {item.icon}
            {!isCompact && !isMobile && <span className="text-sm font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* User Profile - Only show on desktop/tablet */}
      {!isMobile && (
        <div className="px-2 py-3 border-t border-border shrink-0">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-2 transition-colors text-left"
            title={isCompact ? 'Profile' : undefined}
          >
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-sm font-semibold shrink-0 flex-center">
              {displayNameText[0]?.toUpperCase() || 'U'}
            </div>
            {!isCompact && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{displayNameText}</p>
                <p className="text-[11px] text-muted font-mono truncate">{displayId.slice(0, 16)}...</p>
              </div>
            )}
          </button>
        </div>
      )}
    </aside>
  );
}
