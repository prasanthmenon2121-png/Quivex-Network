import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { useIdentityStore } from './stores/identityStore';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DisplayNameScreen from './screens/DisplayNameScreen';
import RecoveryPhraseScreen from './screens/RecoveryPhraseScreen';
import AccountCreatedScreen from './screens/AccountCreatedScreen';
import HomeScreen from './screens/HomeScreen';

type Screen = 'splash' | 'welcome' | 'display-name' | 'recovery-phrase' | 'account-created' | 'home';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const {
    isOnboarded,
    displayName,
    qvexId,
    recoveryPhrase,
    setIdentity,
    setRecoveryPhrase,
    confirmOnboarding
  } = useIdentityStore();

  useEffect(() => {
    if (isOnboarded) {
      setCurrentScreen('home');
    }
  }, [isOnboarded]);

  const handleSplashFinish = () => {
    setCurrentScreen(isOnboarded ? 'home' : 'welcome');
  };

  const safeAreaClass = "safe-area-pt safe-area-pb safe-area-px";

  return (
    <div className={`h-full w-full bg-bg text-text ${safeAreaClass} flex flex-col overflow-hidden`}>
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--card)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: '0.75rem'
          }
        }}
      />

      <AnimatePresence mode="wait">
        {currentScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <SplashScreen onFinish={handleSplashFinish} />
          </motion.div>
        )}

        {currentScreen === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full w-full"
          >
            <WelcomeScreen
              onCreate={() => setCurrentScreen('display-name')}
              onRestore={() => alert('Restore coming soon')}
            />
          </motion.div>
        )}

        {currentScreen === 'display-name' && (
          <motion.div
            key="display-name"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full w-full"
          >
            <DisplayNameScreen
              onContinue={(name, qvId, phrase) => {
                setIdentity({ displayName: name, qvexId: qvId });
                setRecoveryPhrase(phrase);
                setCurrentScreen('recovery-phrase');
              }}
              onBack={() => setCurrentScreen('welcome')}
            />
          </motion.div>
        )}

        {currentScreen === 'recovery-phrase' && recoveryPhrase && (
          <motion.div
            key="recovery-phrase"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full w-full"
          >
            <RecoveryPhraseScreen
              phrase={recoveryPhrase}
              onConfirm={() => setCurrentScreen('account-created')}
            />
          </motion.div>
        )}

        {currentScreen === 'account-created' && (
          <motion.div
            key="account-created"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="h-full w-full"
          >
            <AccountCreatedScreen
              qvexId={qvexId}
              onContinue={() => {
                confirmOnboarding();
                setCurrentScreen('home');
              }}
            />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="h-full w-full"
          >
            <HomeScreen
              displayName={displayName}
              qvexId={qvexId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
