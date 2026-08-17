import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./components/HomePage";
import { DailyNewsPanel } from "./components/DailyNewsPanel";
import { DailyNewsPage } from "./components/DailyNewsPage";
import { ChatConversation } from "./components/ChatConversation";
import { CreateFeedModal } from "./components/CreateFeedModal";
import type { NewFeed } from "./components/CreateFeedModal";

type View = "home" | "daily-news" | "chat";

type Chat = { id: string; title: string; query: string };

function deriveChatTitle(query: string): string {
  const trimmed = query.trim().replace(/\s+/g, " ");
  if (trimmed.length <= 42) return trimmed;
  return `${trimmed.slice(0, 42).trimEnd()}…`;
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [feedModalOpen, setFeedModalOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  function handleCreateFeed(feed: NewFeed) {
    console.log("Created feed", feed);
    setFeedModalOpen(false);
  }

  function handleSend(query: string) {
    const trimmed = query.trim();
    if (!trimmed) return;
    const id = `${Date.now()}`;
    setChats((prev) => [{ id, title: deriveChatTitle(trimmed), query: trimmed }, ...prev]);
    setActiveChatId(id);
    setView("chat");
  }

  function handleSelectChat(id: string) {
    setActiveChatId(id);
    setView("chat");
  }

  const activeChat = chats.find((c) => c.id === activeChatId) ?? null;

  return (
    <div className="h-screen bg-white">
      <div className="flex h-full items-stretch justify-between">
        <Sidebar
          activeView={view === "chat" ? "home" : view}
          extraChats={chats}
          activeChatId={view === "chat" ? activeChatId : null}
          onNavigateHome={() => setView("home")}
          onNavigateDailyNews={() => setView("daily-news")}
          onSelectChat={handleSelectChat}
        />
        {view === "home" ? (
          <>
            <HomePage onSend={handleSend} />
            <DailyNewsPanel
              onOpenFeed={() => setView("daily-news")}
              onViewAll={() => setView("daily-news")}
            />
          </>
        ) : view === "daily-news" ? (
          <DailyNewsPage onCreateFeed={() => setFeedModalOpen(true)} />
        ) : (
          activeChat && <ChatConversation query={activeChat.query} />
        )}
      </div>
      <CreateFeedModal open={feedModalOpen} onClose={() => setFeedModalOpen(false)} onCreate={handleCreateFeed} />
    </div>
  );
}
