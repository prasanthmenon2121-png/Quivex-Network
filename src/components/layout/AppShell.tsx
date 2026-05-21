import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { MobileDrawer } from './MobileDrawer';
import { WifiOff } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  displayName: string | null;
  qvexId: string;
  mobileTitle?: string;
  showMobileAction?: boolean;
  onMobileActionClick?: () => void;
  desktopHeaderTitle?: string;
  hideDesktopHeader?: boolean;
  desktopHeaderRight?: ReactNode;
}

export function AppShell({
  children,
  displayName,
  qvexId,
  mobileTitle = 'Conversations',
  showMobileAction = false,
  onMobileActionClick,
  desktopHeaderTitle = 'Conversations',
  hideDesktopHeader = false,
  desktopHeaderRight,
}: AppShellProps) {
  const headerRight = desktopHeaderRight ?? (
    <div className="flex items-center gap-1.5 text-muted/40">
      <WifiOff className="w-3 h-3" />
      <span className="text-[11px]">Offline</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-bg flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-screen">
        <Sidebar displayName={displayName} qvexId={qvexId} isCompact={false} />
      </div>

      {/* Compact Tablet Sidebar */}
      <div className="hidden md:flex lg:hidden flex-col h-screen">
        <Sidebar displayName={displayName} qvexId={qvexId} isCompact={true} />
      </div>

      {/* Mobile Mini Sidebar */}
      <div className="flex md:hidden flex-col h-screen">
        <Sidebar displayName={displayName} qvexId={qvexId} isMobile={true} />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer displayName={displayName} qvexId={qvexId} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Desktop & Tablet Header */}
        {!hideDesktopHeader && (
          <header className="hidden md:flex h-16 px-6 items-center justify-between border-b border-border bg-surface shrink-0">
            <h1 className="text-2xl font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
              {desktopHeaderTitle}
            </h1>
            {headerRight}
          </header>
        )}

        {/* Mobile Header - Hide on mobile since we have mini sidebar */}
        <div className="md:hidden hidden">
          <MobileHeader
            title={mobileTitle}
            showAction={showMobileAction}
            onActionClick={onMobileActionClick}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
