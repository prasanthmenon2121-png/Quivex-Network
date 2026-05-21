import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsRowProps {
    icon?: ReactNode;
    label: string;
    description?: string;
    onClick?: () => void;
    right?: ReactNode;
}

export default function SettingsRow({ icon, label, description, onClick, right }: SettingsRowProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 px-3 py-3 text-left hover:bg-surface-2 transition-colors rounded-none"
            style={{ minHeight: 52 }}
        >
            <div className="w-9 h-9 flex items-center justify-center text-muted">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-text truncate">{label}</p>
                </div>
                {description && <p className="text-[12px] text-muted truncate">{description}</p>}
            </div>
            <div className="flex items-center gap-2 text-muted">
                {right}
                <ChevronRight className="w-4 h-4" />
            </div>
        </button>
    );
}
