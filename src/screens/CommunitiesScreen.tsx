import { useMemo, useState } from 'react';
import { Plus, Search, Grid, List } from 'lucide-react';
import { toast } from 'sonner';
import { useCommunities } from '../hooks/useCommunities';
import CommunityCard from '../components/communities/CommunityCard';
import CreateCommunitySheet from '../components/communities/CreateCommunitySheet';

const tabs = ['joined', 'discover'] as const;
type TabKey = (typeof tabs)[number];

export function CommunitiesScreen() {
    const [activeTab, setActiveTab] = useState<TabKey>('joined');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [gridView, setGridView] = useState(false);

    const { joined, discover, createCommunity, joinCommunity } = useCommunities();

    const filteredJoined = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return joined;
        return joined.filter((c) => c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }, [joined, searchQuery]);

    const filteredDiscover = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return discover;
        return discover.filter((c) => c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
    }, [discover, searchQuery]);

    const handleCreate = (payload: { name: string; description?: string | null; isPublic: boolean; approvalRequired: boolean }) => {
        createCommunity(payload);
        toast.message('Community creation prepared. Backend integration will be connected next.');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="w-full max-w-[920px] mx-auto px-4 md:px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-[20px] font-semibold text-text">Communities</h1>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setGridView((s) => !s)} className="hidden md:inline-flex items-center gap-2 h-10 px-3 rounded-lg bg-surface-2 border border-border text-muted">
                            {gridView ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setIsCreateOpen(true)} className="h-12 px-5 rounded-full bg-accent text-bg-deep text-[15px] font-semibold hidden md:inline-flex">Create community</button>
                        <button onClick={() => setIsCreateOpen(true)} className="md:hidden h-12 w-12 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="relative flex justify-center mb-3">
                    <div className="w-full max-w-[720px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search communities" className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-2 border border-border text-sm text-text outline-none placeholder:text-muted/60 focus:border-accent/50" />
                    </div>
                </div>

                <div className="flex gap-3 mt-4 mb-4">
                    {tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 h-12 rounded-full text-sm font-medium ${activeTab === tab ? 'bg-accent-soft border border-accent-border text-accent' : 'text-muted hover:text-text'}`}>
                            {tab === 'joined' ? 'Joined' : 'Discover'}
                        </button>
                    ))}
                </div>

                <div>
                    {activeTab === 'joined' && (
                        <div className="space-y-4">
                            {filteredJoined.length === 0 ? (
                                <div className="flex flex-col items-center py-12">
                                    <div className="w-20 h-20 rounded-lg bg-surface-2 border border-border mb-4 flex items-center justify-center text-2xl text-muted">👥</div>
                                    <h3 className="text-lg font-semibold text-text mb-2">No communities yet</h3>
                                    <p className="text-[14px] text-muted mb-4">Join or create a community.</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setActiveTab('discover')} className="h-12 px-6 rounded-full bg-surface-2 text-muted">Discover communities</button>
                                        <button onClick={() => setIsCreateOpen(true)} className="h-12 px-6 rounded-full bg-accent text-bg-deep font-semibold">Create community</button>
                                    </div>
                                </div>
                            ) : (
                                <div className={gridView ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                                    {filteredJoined.map((c) => (
                                        <CommunityCard key={c.id} community={c} onOpen={() => toast.message('Open community placeholder')} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'discover' && (
                        <div className="space-y-4">
                            {filteredDiscover.length === 0 ? (
                                <div className="flex flex-col items-center py-12">
                                    <div className="w-20 h-20 rounded-lg bg-surface-2 border border-border mb-4 flex items-center justify-center text-2xl text-muted">🔎</div>
                                    <h3 className="text-lg font-semibold text-text mb-2">No public communities found</h3>
                                    <p className="text-[14px] text-muted mb-4">Create one or join by invite link.</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setIsCreateOpen(true)} className="h-12 px-6 rounded-full bg-accent text-bg-deep font-semibold">Create community</button>
                                    </div>
                                </div>
                            ) : (
                                <div className={gridView ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
                                    {filteredDiscover.map((c) => (
                                        <CommunityCard key={c.id} community={c} showJoin onJoin={() => joinCommunity(c.id)} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <CreateCommunitySheet isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} onCreate={handleCreate} />
        </div>
    );
}

export default CommunitiesScreen;
