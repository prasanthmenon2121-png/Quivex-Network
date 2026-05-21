import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useIdentityStore } from './stores/identityStore';
import { AppShell } from './components/layout/AppShell';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DisplayNameScreen from './screens/DisplayNameScreen';
import RecoveryPhraseScreen from './screens/RecoveryPhraseScreen';
import AccountCreatedScreen from './screens/AccountCreatedScreen';

// Placeholder Pages for main app
const ChatsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 animate-in fade-in duration-300">
    <h2 className="text-3xl font-black mb-3">Chats</h2>
    <p className="text-muted max-w-sm text-sm font-medium leading-relaxed">
      Private end-to-end encrypted messaging conversations will appear here.
    </p>
  </div>
);

const ContactsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 animate-in fade-in duration-300">
    <h2 className="text-3xl font-black mb-3">Contacts</h2>
    <p className="text-muted max-w-sm text-sm font-medium leading-relaxed">
      Manage your cryptographic contacts and keys securely.
    </p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 animate-in fade-in duration-300">
    <h2 className="text-3xl font-black mb-3">Settings</h2>
    <p className="text-muted max-w-sm text-sm font-medium leading-relaxed">
      Configure encryption keys, PWA storage options, and profile display.
    </p>
  </div>
);

// Helper component to handle onboarding navigation
const OnboardingRoutes = () => {
  const navigate = useNavigate();
  const { setIdentity, setRecoveryPhrase, qvexId, recoveryPhrase, confirmOnboarding } = useIdentityStore();

  return (
    <Routes>
      <Route
        path="/welcome"
        element={
          <WelcomeScreen
            onCreate={() => navigate('/display-name')}
            onRestore={() => alert('Restore coming soon')}
          />
        }
      />
      <Route
        path="/display-name"
        element={
          <DisplayNameScreen
            onContinue={(name, qvId, phrase) => {
              setIdentity({ displayName: name, qvexId: qvId });
              setRecoveryPhrase(phrase);
              navigate('/recovery-phrase');
            }}
            onBack={() => navigate('/welcome')}
          />
        }
      />
      <Route
        path="/recovery-phrase"
        element={
          recoveryPhrase ? (
            <RecoveryPhraseScreen
              phrase={recoveryPhrase}
              onConfirm={() => navigate('/account-created')}
            />
          ) : (
            <Navigate to="/welcome" replace />
          )
        }
      />
      <Route
        path="/account-created"
        element={
          <AccountCreatedScreen
            qvexId={qvexId}
            onContinue={() => {
              confirmOnboarding();
              // Navigate to chats
              navigate('/', { replace: true });
            }}
          />
        }
      />
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const { isOnboarded } = useIdentityStore();

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isOnboarded) {
    return <OnboardingRoutes />;
  }

  // App is onboarded, render AppShell with main pages
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<ChatsPlaceholder />} />
        <Route path="/contacts" element={<ContactsPlaceholder />} />
        <Route path="/settings" element={<SettingsPlaceholder />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

function App() {
  return (
    <Router>
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
      <AppContent />
    </Router>
  );
}

export default App;
