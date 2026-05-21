import type { ReactNode } from 'react';

interface SettingsSectionProps {
    title: string;
    children: ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
    return (
        <section className="mb-6">
            <h3 className="text-[11px] uppercase text-muted mb-2 px-1">{title}</h3>
            <div className="bg-surface rounded-xl border border-border overflow-hidden">{children}</div>
        </section>
    );
}
