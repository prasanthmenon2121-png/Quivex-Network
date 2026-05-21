import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../../store/navigation';
import { Sidebar } from './Sidebar';

export function MobileDrawer({ displayName, qvexId }: { displayName: string | null; qvexId: string }) {
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useNavigation();
  const prefersReducedMotion = useReducedMotion();

  const handleBackdropClick = () => {
    setIsMobileDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      {isMobileDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleBackdropClick}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[280px] max-w-[80vw] bg-surface border-r border-border z-50 lg:hidden"
            initial={prefersReducedMotion ? { x: '-100%' } : { x: '-100%' }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? { x: '-100%' } : { x: '-100%' }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
          >
            <Sidebar displayName={displayName} qvexId={qvexId} isCompact={false} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
