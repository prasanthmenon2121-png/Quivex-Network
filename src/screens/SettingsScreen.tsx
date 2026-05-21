import { Globe, Moon, Type, Layout, RefreshCw, Shield, MessageCircle, Link, Clock, PhoneOff, Bell, Tag, Database, Cpu, Info, FileText, LifeBuoy, Bug, Gift, Heart, Camera, Mic, Volume2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileSettingsCard from '../components/settings/ProfileSettingsCard';
import SettingsSection from '../components/settings/SettingsSection';
import SettingsRow from '../components/settings/SettingsRow';
import { useIdentityStore } from '../stores/identityStore';

export default function SettingsScreen() {
    const navigate = useNavigate();
    const { displayName, qvexId } = useIdentityStore();

    const appVersion = ((import.meta as any)?.env?.VITE_APP_VERSION) || 'v1.0.0';

    return (
        <div className="flex flex-col h-full overflow-auto p-4 md:p-6">
            <div className="w-full max-w-[760px] mx-auto space-y-4">
                <div className="pt-2">
                    <h1 className="text-2xl font-semibold text-text mb-2">Settings</h1>
                </div>

                <ProfileSettingsCard />

                <SettingsSection title="General">
                    <SettingsRow icon={<Globe className="w-4 h-4" />} label="Language" description="App language" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Moon className="w-4 h-4" />} label="Theme" description="Light / Dark / System" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Type className="w-4 h-4" />} label="Font size" description="Adjust font scale" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Layout className="w-4 h-4" />} label="Compact mode" description="Reduce spacing in lists" onClick={() => navigate('#')} />
                    <SettingsRow icon={<RefreshCw className="w-4 h-4" />} label="Auto-start on boot" description="Launch app on system start" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Privacy & Security">
                    <SettingsRow icon={<Shield className="w-4 h-4" />} label="Screen lock" description="Require passcode or biometrics" onClick={() => navigate('#')} />
                    <SettingsRow icon={<MessageCircle className="w-4 h-4" />} label="Read receipts" description="Send read receipts" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Type className="w-4 h-4" />} label="Typing indicators" description="Show when you're typing" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Link className="w-4 h-4" />} label="Link previews" description="Show previews for links" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Clock className="w-4 h-4" />} label="Disappearing messages" description="Message timers" onClick={() => navigate('#')} />
                    <SettingsRow icon={<PhoneOff className="w-4 h-4" />} label="Call privacy" description="Hide call presence" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Notifications">
                    <SettingsRow icon={<Bell className="w-4 h-4" />} label="Enable notifications" onClick={() => navigate('#')} />
                    <SettingsRow icon={<MessageCircle className="w-4 h-4" />} label="Message notifications" onClick={() => navigate('#')} />
                    <SettingsRow icon={<PhoneOff className="w-4 h-4" />} label="Call notifications" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Tag className="w-4 h-4" />} label="Group notifications" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Moon className="w-4 h-4" />} label="Do Not Disturb" description="Silence notifications" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Account">
                    <SettingsRow icon={<Info className="w-4 h-4" />} label="QVX ID" description={qvexId ? qvexId.slice(0, 18) + '...' : 'QVX ID not ready'} onClick={() => navigate('#')} />
                    <SettingsRow icon={<Type className="w-4 h-4" />} label="Display name" description={displayName || 'User'} onClick={() => navigate('#')} />
                    <SettingsRow icon={<Camera className="w-4 h-4" />} label="Profile picture" onClick={() => navigate('#')} />
                    <SettingsRow icon={<FileText className="w-4 h-4" />} label="Recovery phrase" onClick={() => navigate('#')} />
                    <SettingsRow icon={<TrashIconPlaceholder />} label="Delete account" description="Remove your account and data" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Chats & Media">
                    <SettingsRow icon={<Camera className="w-4 h-4" />} label="Auto-download media" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Gift className="w-4 h-4" />} label="Save to gallery" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Heart className="w-4 h-4" />} label="Data usage" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Database className="w-4 h-4" />} label="Storage management" onClick={() => navigate('#')} />
                    <SettingsRow icon={<ArchivePlaceholder />} label="Archive chats" onClick={() => navigate('#')} />
                    <SettingsRow icon={<FileText className="w-4 h-4" />} label="Backup" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Voice & Video">
                    <SettingsRow icon={<Camera className="w-4 h-4" />} label="Camera" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Mic className="w-4 h-4" />} label="Microphone" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Volume2 className="w-4 h-4" />} label="Speaker" onClick={() => navigate('#')} />
                    <SettingsRow icon={<PhoneOff className="w-4 h-4" />} label="Call settings" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="Advanced">
                    <SettingsRow icon={<Cpu className="w-4 h-4" />} label="Network" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Zap className="w-4 h-4" />} label="Developer options" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Database className="w-4 h-4" />} label="Database" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Zap className="w-4 h-4" />} label="Experimental features" onClick={() => navigate('#')} />
                </SettingsSection>

                <SettingsSection title="About">
                    <SettingsRow icon={<Info className="w-4 h-4" />} label="App version" description={appVersion} onClick={() => navigate('#')} />
                    <SettingsRow icon={<FileText className="w-4 h-4" />} label="Release notes" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Link className="w-4 h-4" />} label="Privacy policy" onClick={() => navigate('#')} />
                    <SettingsRow icon={<FileText className="w-4 h-4" />} label="Open source licenses" onClick={() => navigate('#')} />
                    <SettingsRow icon={<LifeBuoy className="w-4 h-4" />} label="Support / Help" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Bug className="w-4 h-4" />} label="Report a bug" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Zap className="w-4 h-4" />} label="Feature request" onClick={() => navigate('#')} />
                    <SettingsRow icon={<Heart className="w-4 h-4" />} label="Donate / Support project" onClick={() => navigate('#')} />
                </SettingsSection>

            </div>
        </div>
    );
}

function TrashIconPlaceholder() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted">
            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ArchivePlaceholder() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted">
            <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
