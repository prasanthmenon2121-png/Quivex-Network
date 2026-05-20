import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { DisplayNameScreen } from './pages/DisplayNameScreen';
import { RecoveryPhraseScreen } from './pages/RecoveryPhraseScreen';

type Screen = 'welcome' | 'displayName' | 'recoveryPhrase' | 'home';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [_displayName, setDisplayName] = useState('');

  const handleGetStarted = useCallback(() => {
    setCurrentScreen('displayName');
  }, []);

  const handleBack = useCallback(() => {
    if (currentScreen === 'displayName') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'recoveryPhrase') {
      setCurrentScreen('displayName');
    }
  }, [currentScreen]);

  const handleDisplayNameContinue = useCallback((name: string) => {
    setDisplayName(name);
    setCurrentScreen('recoveryPhrase');
  }, []);

  const handleClose = useCallback(() => {
    setCurrentScreen('welcome');
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#060A06', color: '#F0F7F0' }}>
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            onGetStarted={handleGetStarted}
          />
        )}
        {currentScreen === 'displayName' && (
          <DisplayNameScreen
            key="displayName"
            onBack={handleBack}
            onContinue={handleDisplayNameContinue}
          />
        )}
        {currentScreen === 'recoveryPhrase' && (
          <RecoveryPhraseScreen
            key="recoveryPhrase"
            onBack={handleBack}
            onClose={handleClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
