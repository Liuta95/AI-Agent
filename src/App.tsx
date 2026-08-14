import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./components/HomePage";
import { DailyNewsPanel } from "./components/DailyNewsPanel";
import { DailyNewsPage } from "./components/DailyNewsPage";
import { CreateFeedModal } from "./components/CreateFeedModal";
import type { NewFeed } from "./components/CreateFeedModal";

type View = "home" | "daily-news";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [feedModalOpen, setFeedModalOpen] = useState(false);

  function handleCreateFeed(feed: NewFeed) {
    console.log("Created feed", feed);
    setFeedModalOpen(false);
  }

  return (
    <div className="h-screen bg-white">
      <div className="flex h-full items-stretch justify-between">
        <Sidebar
          activeView={view}
          onNavigateHome={() => setView("home")}
          onNavigateDailyNews={() => setView("daily-news")}
        />
        {view === "home" ? (
          <>
            <HomePage />
            <DailyNewsPanel
              onOpenFeed={() => setView("daily-news")}
              onViewAll={() => setView("daily-news")}
            />
          </>
        ) : (
          <DailyNewsPage onCreateFeed={() => setFeedModalOpen(true)} />
        )}
      </div>
      <CreateFeedModal open={feedModalOpen} onClose={() => setFeedModalOpen(false)} onCreate={handleCreateFeed} />
    </div>
  );
}
