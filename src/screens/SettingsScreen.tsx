import { SettingsSection } from '../components/settings/SettingsSection';
import { SettingsRow } from '../components/settings/SettingsRow';
import { ProfileSettingsCard } from '../components/settings/ProfileSettingsCard';
import { Globe, Sun, Type, Layout, Power, Lock, Eye, Bell, MessageSquare, Phone, User, Key, Trash2, Camera, Mic, Volume, HardDrive, Database, Zap, Info, FileText, Bug, Heart, Users, Moon, Settings as SettingsIcon } from 'lucide-react';

export function SettingsScreen() {
    const safeClick = (label: string) => () => {
        // Placeholder navigation or behavior; no alerts spamming
        // Future: navigate to detail screens
        // eslint-disable-next-line no-console
        console.info('Open settings:', label);
    };

    const appVersion = (import.meta as any)?.env?.VITE_APP_VERSION || 'v1.0.0';

    return (
        <div className="flex flex-col h-full">
            <div className="px-6 py-5 border-b border-border bg-surface shrink-0">
                <h1 className="text-2xl font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>Settings</h1>
            </div>

            <main className="flex-1 overflow-auto px-4 md:px-6 py-6">
                <div className="mx-auto max-w-[760px] space-y-6">
                    <ProfileSettingsCard />

                    <SettingsSection title="General">
                        <SettingsRow icon={<Globe className="w-4 h-4" />} label="Language" description="App language" onClick={safeClick('Language')} />
                        <SettingsRow icon={<Sun className="w-4 h-4" />} label="Theme" description="Light / Dark / System" onClick={safeClick('Theme')} />
                        <SettingsRow icon={<Type className="w-4 h-4" />} label="Font size" description="Adjust UI font size" onClick={safeClick('Font size')} />
                        <SettingsRow icon={<Layout className="w-4 h-4" />} label="Compact mode" description="Reduce spacing in lists" onClick={safeClick('Compact mode')} />
                        <SettingsRow icon={<Power className="w-4 h-4" />} label="Auto-start on boot" description="Start QUIVEX on system boot" onClick={safeClick('Auto-start on boot')} />
                    </SettingsSection>

                    <SettingsSection title="Privacy & Security">
                        <SettingsRow icon={<Lock className="w-4 h-4" />} label="Screen lock" description="Require PIN or biometrics" onClick={safeClick('Screen lock')} />
                        <SettingsRow icon={<Eye className="w-4 h-4" />} label="Read receipts" description="Send read receipts" onClick={safeClick('Read receipts')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Typing indicators" description="Show when typing" onClick={safeClick('Typing indicators')} />
                        <SettingsRow icon={<FileText className="w-4 h-4" />} label="Link previews" description="Show link previews in chat" onClick={safeClick('Link previews')} />
                        <SettingsRow icon={<MessageSquare className="w-4 h-4" />} label="Disappearing messages" description="Auto-expire messages" onClick={safeClick('Disappearing messages')} />
                        <SettingsRow icon={<Phone className="w-4 h-4" />} label="Call privacy" description="Privacy for calls" onClick={safeClick('Call privacy')} />
                    </SettingsSection>

                    <SettingsSection title="Notifications">
                        <SettingsRow icon={<Bell className="w-4 h-4" />} label="Enable notifications" description="Allow system notifications" onClick={safeClick('Enable notifications')} />
                        <SettingsRow icon={<MessageSquare className="w-4 h-4" />} label="Message notifications" description="Messages from people" onClick={safeClick('Message notifications')} />
                        <SettingsRow icon={<Phone className="w-4 h-4" />} label="Call notifications" description="Incoming calls" onClick={safeClick('Call notifications')} />
                        <SettingsRow icon={<Users className="w-4 h-4" />} label="Group notifications" description="Group chat alerts" onClick={safeClick('Group notifications')} />
                        <SettingsRow icon={<Bell className="w-4 h-4" />} label="Notification badge" description="Show unread count on app icon" onClick={safeClick('Notification badge')} />
                        <SettingsRow icon={<Moon className="w-4 h-4" />} label="Do Not Disturb" description="Snooze notifications" onClick={safeClick('Do Not Disturb')} />
                    </SettingsSection>

                    <SettingsSection title="Account">
                        <SettingsRow icon={<User className="w-4 h-4" />} label="QVX ID" description="Your public QVX identifier" onClick={safeClick('QVX ID')} />
                        <SettingsRow icon={<User className="w-4 h-4" />} label="Display name" description="Your profile name" onClick={safeClick('Display name')} />
                        <SettingsRow icon={<Camera className="w-4 h-4" />} label="Profile picture" description="Update avatar" onClick={safeClick('Profile picture')} />
                        <SettingsRow icon={<Key className="w-4 h-4" />} label="Recovery phrase" description="Backup your keys" onClick={safeClick('Recovery phrase')} />
                        <SettingsRow icon={<Trash2 className="w-4 h-4" />} label="Delete account" description="Remove your account data" onClick={safeClick('Delete account')} />
                    </SettingsSection>

                    <SettingsSection title="Chats & Media">
                        <SettingsRow icon={<HardDrive className="w-4 h-4" />} label="Auto-download media" description="Wi-Fi only or always" onClick={safeClick('Auto-download media')} />
                        <SettingsRow icon={<HardDrive className="w-4 h-4" />} label="Save to gallery" description="Save received media" onClick={safeClick('Save to gallery')} />
                        <SettingsRow icon={<Database className="w-4 h-4" />} label="Data usage" description="Manage cellular data" onClick={safeClick('Data usage')} />
                        <SettingsRow icon={<Database className="w-4 h-4" />} label="Storage management" description="Clear caches and media" onClick={safeClick('Storage management')} />
                        <SettingsRow icon={<Layout className="w-4 h-4" />} label="Archive chats" description="Hide conversations" onClick={safeClick('Archive chats')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Backup" description="Backup settings and chats" onClick={safeClick('Backup')} />
                    </SettingsSection>

                    <SettingsSection title="Voice & Video">
                        <SettingsRow icon={<Camera className="w-4 h-4" />} label="Camera" description="Select camera device" onClick={safeClick('Camera')} />
                        <SettingsRow icon={<Mic className="w-4 h-4" />} label="Microphone" description="Select microphone device" onClick={safeClick('Microphone')} />
                        <SettingsRow icon={<Volume className="w-4 h-4" />} label="Speaker" description="Select speaker" onClick={safeClick('Speaker')} />
                        <SettingsRow icon={<SettingsIcon className="w-4 h-4" />} label="Call settings" description="Audio / video preferences" onClick={safeClick('Call settings')} />
                    </SettingsSection>

                    <SettingsSection title="Advanced">
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Network" description="Connection diagnostics" onClick={safeClick('Network')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Developer options" description="Experimental tools" onClick={safeClick('Developer options')} />
                        <SettingsRow icon={<Database className="w-4 h-4" />} label="Database" description="View local DB size" onClick={safeClick('Database')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Experimental features" description="Try unreleased features" onClick={safeClick('Experimental features')} />
                    </SettingsSection>

                    <SettingsSection title="About">
                        <SettingsRow icon={<Info className="w-4 h-4" />} label="App version" description={appVersion} onClick={safeClick('App version')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Check for updates" onClick={safeClick('Check for updates')} />
                        <SettingsRow icon={<FileText className="w-4 h-4" />} label="Release notes" onClick={safeClick('Release notes')} />
                        <SettingsRow icon={<FileText className="w-4 h-4" />} label="Privacy policy" onClick={safeClick('Privacy policy')} />
                        <SettingsRow icon={<FileText className="w-4 h-4" />} label="Terms of service" onClick={safeClick('Terms of service')} />
                        <SettingsRow icon={<Heart className="w-4 h-4" />} label="Support / Help" onClick={safeClick('Support / Help')} />
                        <SettingsRow icon={<Bug className="w-4 h-4" />} label="Report a bug" onClick={safeClick('Report a bug')} />
                        <SettingsRow icon={<Zap className="w-4 h-4" />} label="Feature request" onClick={safeClick('Feature request')} />
                        <SettingsRow icon={<Heart className="w-4 h-4" />} label="Donate / Support project" onClick={safeClick('Donate')} />
                    </SettingsSection>
                </div>
            </main>
        </div>
    );
}
