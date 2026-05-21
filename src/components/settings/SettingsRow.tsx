import React from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsRowProps {
    icon?: React.ReactNode;
    label: string;
    description?: string;
    onClick?: () => void;
    children?: React.ReactNode;
}

export function SettingsRow({ icon, label, description, onClick, children }: SettingsRowProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between gap-3 px-4 h-14 text-left hover:bg-surface-2 transition-colors active:scale-[0.995]"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-surface-3 flex items-center justify-center text-muted text-sm">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-medium text-text truncate">{label}</p>
                    {description && <p className="text-[12px] text-muted truncate">{description}</p>}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {children}
                <ChevronRight className="w-4 h-4 text-muted" />
            </div>
        </button>
    );
}
