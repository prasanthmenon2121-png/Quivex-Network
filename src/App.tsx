import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { DisplayNameScreen } from './pages/DisplayNameScreen';

type Screen = 'welcome' | 'displayName' | 'home';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [_displayName, setDisplayName] = useState('');

  const handleGetStarted = useCallback(() => {
    setCurrentScreen('displayName');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentScreen('welcome');
  }, []);

  const handleDisplayNameContinue = useCallback((name: string) => {
    setDisplayName(name);
    console.log('Display name set:', name);
    // TODO: Navigate to next screen (account creation or home)
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary selection:bg-accent/30">
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
      </AnimatePresence>
    </div>
  );
}

export default App;
