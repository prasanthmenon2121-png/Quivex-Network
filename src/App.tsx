import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Toaster } from 'sonner';
import { useIdentityStore } from './stores/identityStore';
import { AppShell } from './components/layout/AppShell';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DisplayNameScreen from './screens/DisplayNameScreen';
import RecoveryPhraseScreen from './screens/RecoveryPhraseScreen';
import AccountCreatedScreen from './screens/AccountCreatedScreen';
import { NewConversationScreen } from './screens/NewConversationScreen';
import { ConversationsScreen } from './screens/ConversationsScreen';
import { ContactsScreen } from './screens/ContactsScreen';
import { MessageRequestsScreen } from './screens/MessageRequestsScreen';
import SettingsScreen from './screens/SettingsScreen';

const PlaceholderScreen = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 animate-in fade-in duration-300">
    <h2 className="text-3xl font-black mb-3">{title}</h2>
    <p className="text-muted max-w-sm text-sm font-medium leading-relaxed">
      {description}
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
  const { isOnboarded, displayName, qvexId } = useIdentityStore();
  const location = useLocation();
  const navigate = useNavigate();
  const hideDesktopHeader = location.pathname === '/new-conversation';
  const showHeaderAction = location.pathname === '/';
  const headerRight = showHeaderAction ? (
    <button
      onClick={() => navigate('/new-conversation')}
      className="hidden md:inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-accent text-bg-deep text-[14px] font-semibold transition-colors hover:bg-accent-dark"
    >
      <Plus className="w-4 h-4" />
      New conversation
    </button>
  ) : undefined;

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!isOnboarded) {
    return <OnboardingRoutes />;
  }

  // App is onboarded, render AppShell with main pages
  return (
    <AppShell
      displayName={displayName}
      qvexId={qvexId}
      hideDesktopHeader={hideDesktopHeader}
      desktopHeaderRight={headerRight}
    >
      <Routes>
        <Route path="/" element={<ConversationsScreen />} />
        <Route
          path="/new-conversation"
          element={<NewConversationScreen onClose={() => navigate(-1)} />}
        />
        <Route path="/contacts" element={<ContactsScreen />} />
        <Route path="/requests" element={<MessageRequestsScreen />} />
        <Route
          path="/communities"
          element={<PlaceholderScreen title="Communities" description="Encrypted community spaces will appear here." />}
        />
        <Route
          path="/calls"
          element={<PlaceholderScreen title="Calls" description="Private voice and video call history will appear here." />}
        />
        <Route path="/settings" element={<SettingsScreen />} />
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
