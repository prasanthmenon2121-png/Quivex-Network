import { Menu, Plus } from 'lucide-react';
import { useNavigation } from '../../store/navigation';

interface MobileHeaderProps {
  title?: string;
  showAction?: boolean;
  onActionClick?: () => void;
}

export function MobileHeader({ title = 'Conversations', showAction = false, onActionClick }: MobileHeaderProps) {
  const { toggleMobileDrawer } = useNavigation();

  return (
    <header className="lg:hidden h-14 px-4 flex items-center justify-between bg-surface border-b border-border safe-area-pt">
      {/* Menu Button */}
      <button
        onClick={toggleMobileDrawer}
        className="w-10 h-10 flex items-center justify-center text-muted"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <h1 className="text-sm font-medium text-text">{title}</h1>

      {/* Action Button */}
      {showAction ? (
        <button
          onClick={onActionClick}
          className="w-10 h-10 flex items-center justify-center text-muted"
        >
          <Plus className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
}
