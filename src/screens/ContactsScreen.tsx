import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useContacts } from '../hooks/useContacts';
import { ContactRow } from '../components/contacts/ContactRow';
import ContactDetailsSheet from '../components/contacts/ContactDetailsSheet';
import { RequestCard } from '../components/contacts/RequestCard';
import { AddContactSheet } from '../components/contacts/AddContactSheet';

const tabs = ['contacts', 'requests', 'blocked'] as const;

type TabKey = (typeof tabs)[number];

interface ContactsScreenProps {
  initialTab?: TabKey;
}

export function ContactsScreen({ initialTab = 'contacts' }: ContactsScreenProps) {
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const {
    contacts,
    incomingRequests,
    outgoingRequests,
    blockedUsers,
    addContactByQvxId,
    acceptRequest,
    deleteRequest,
    blockUser,
    unblockUser,
  } = useContacts();

  const handleAddContact = (qvexId: string) => {
    addContactByQvxId(qvexId);
    toast.message('Request prepared. Contact request backend will be connected later.');
  };

  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return contacts;
    return contacts.filter((contact) =>
      [contact.displayName, contact.qvexId].some((field) => field?.toLowerCase().includes(query)),
    );
  }, [contacts, searchQuery]);

  const sections = useMemo(() => {
    const map: Record<string, typeof contacts> = {};
    const list = [...filteredContacts].sort((a, b) => {
      const aKey = (a.displayName || a.qvexId).toLowerCase();
      const bKey = (b.displayName || b.qvexId).toLowerCase();
      return aKey.localeCompare(bKey);
    });

    list.forEach((c) => {
      const key = (c.displayName || c.qvexId).charAt(0).toUpperCase();
      if (!/[A-Z]/.test(key)) {
        if (!map['#']) map['#'] = [] as any;
        map['#'].push(c);
      } else {
        if (!map[key]) map[key] = [] as any;
        map[key].push(c);
      }
    });

    return Object.keys(map)
      .sort()
      .map((k) => ({ letter: k, items: map[k] }));
  }, [filteredContacts]);

  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const selectedContact = selectedContactId ? contacts.find((c) => c.id === selectedContactId) ?? null : null;

  const emptyState = (title: string, description: string, showButton = false) => (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <h2 className="text-[18px] font-semibold text-text mb-2">{title}</h2>
      <p className="text-[14px] text-muted max-w-[320px] mb-6">{description}</p>
      {showButton && (
        <button
          onClick={() => setIsAddOpen(true)}
          className="h-12 px-6 rounded-full bg-accent text-bg-deep text-[15px] font-semibold"
        >
          Add contact
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="w-full max-w-[980px] mx-auto px-4 md:px-6 pt-6 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[20px] font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
            Contacts
          </h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="hidden md:inline-flex items-center gap-3 h-12 px-5 rounded-full bg-accent text-bg-deep text-[15px] font-semibold transition-colors hover:bg-accent-dark"
          >
            <Plus className="w-4 h-4" />
            Add contact
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="md:hidden h-12 w-12 inline-flex items-center justify-center rounded-full bg-surface-2 border border-border text-text"
            aria-label="Add contact"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {/* Search */}
        <div className="relative flex justify-center mb-3">
          <div className="w-full max-w-[720px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search contacts"
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface-2 border border-border text-sm text-text outline-none placeholder:text-muted/60 focus:border-accent/50"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 h-12 rounded-full text-sm font-medium transition-all ${activeTab === tab
                ? 'bg-accent-soft border border-accent-border text-accent'
                : 'text-muted hover:text-text'
                }`}
            >
              {tab === 'contacts' ? 'Contacts' : tab === 'requests' ? 'Requests' : 'Blocked'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="w-full max-w-[720px] mx-auto px-4 md:px-6 pb-10">
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              {filteredContacts.length === 0 ? (
                emptyState('No contacts yet', 'Add someone with their QVX ID.', true)
              ) : (
                sections.map((section) => (
                  <div key={section.letter}>
                    <div className="px-2 py-1 text-[12px] font-semibold text-muted">{section.letter}</div>
                    <div className="space-y-2">
                      {section.items.map((contact) => (
                        <ContactRow
                          key={contact.id}
                          id={contact.id}
                          displayName={contact.displayName}
                          qvexId={contact.qvexId}
                          onOpen={(id) => setSelectedContactId(id)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}

              <ContactDetailsSheet isOpen={!!selectedContact} onClose={() => setSelectedContactId(null)} contact={selectedContact} />
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {incomingRequests.length === 0 && outgoingRequests.length === 0
                ? emptyState('No requests', 'Incoming and outgoing requests will show up here.')
                : (
                  <>
                    {incomingRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        id={request.id}
                        displayName={request.displayName}
                        qvexId={request.qvexId}
                        direction="incoming"
                        onAccept={acceptRequest}
                        onDelete={deleteRequest}
                        onBlock={blockUser}
                      />
                    ))}
                    {outgoingRequests.map((request) => (
                      <RequestCard
                        key={request.id}
                        id={request.id}
                        displayName={request.displayName}
                        qvexId={request.qvexId}
                        direction="outgoing"
                        onCancel={deleteRequest}
                      />
                    ))}
                  </>
                )}
            </div>
          )}

          {activeTab === 'blocked' && (
            <div className="space-y-3">
              {blockedUsers.length === 0
                ? emptyState('No blocked users', 'Blocked profiles will appear here.')
                : blockedUsers.map((blocked) => (
                  <div
                    key={blocked.id}
                    className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-surface border border-border/60"
                  >
                    <div>
                      <p className="text-[15px] font-semibold text-text">
                        {blocked.displayName || blocked.qvexId}
                      </p>
                      <p className="text-[12px] text-muted">{blocked.qvexId}</p>
                    </div>
                    <button
                      onClick={() => unblockUser(blocked.id)}
                      className="h-12 px-4 rounded-lg bg-surface-2 border border-border text-[13px] text-text font-medium"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <AddContactSheet
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAddContact}
      />
    </div>
  );
}
