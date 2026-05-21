import type { ReactNode } from 'react';

interface SettingsSectionProps {
    title: string;
    children: ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <section className="w-full">
            <h3 className="text-xs uppercase text-muted mb-2">{title}</h3>
            <div className="w-full bg-surface rounded-xl border border-border overflow-hidden">
                {children}
            </div>
        </section>
    );
}
