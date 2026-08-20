import { useRef, useState } from "react";
import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.png";
import rightPanelClose from "../assets/icons/right-panel-close.svg";
import rightPanelOpen from "../assets/icons/right-panel-open.svg";
import addAlt from "../assets/icons/add-alt.svg";
import search from "../assets/icons/search.svg";
import news from "../assets/icons/news.svg";
import history from "../assets/icons/history.svg";
import extension from "../assets/icons/extension.svg";
import arrowForward from "../assets/icons/arrow-forward.svg";
import addProject from "../assets/icons/add-project.svg";
import folder from "../assets/icons/folder.svg";
import chatBubble from "../assets/icons/chat-bubble.svg";
import chatBubbleAlt from "../assets/icons/chat-bubble-alt.svg";
import chevronDownStroke from "../assets/icons/chevron-down-stroke.svg";
import { Divider } from "./Divider";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { TopicHeader } from "./TopicHeader";
import { SearchDropdown } from "./ui/SearchDropdown";
import { ThemeToggle } from "./ui/ThemeToggle";

const tools = [
  { icon: extension, label: "Text" },
  { icon: extension, label: "Slides" },
  { icon: extension, label: "Drafting Tool" },
  { icon: extension, label: "Build Deck" },
];

const projects = [
  { icon: folder, label: "New Project" },
  { icon: folder, label: "Universal Integrated Management" },
];

const chats = [
  { icon: chatBubble, label: "Yahoo finance - industries - dataset" },
  { icon: chatBubble, label: "Knowledge base" },
  { icon: chatBubbleAlt, label: "Ask questions of documents & web and" },
  { icon: chatBubbleAlt, label: "Contributors" },
  { icon: chatBubbleAlt, label: "Checklist for conducting an audit" },
  { icon: chatBubbleAlt, label: "Knowledge base" },
];

const collapsedIconGroups: { icon: string; label: string }[][] = [
  [
    { icon: news, label: "Daily news" },
    { icon: history, label: "History" },
  ],
  tools,
  projects,
  chats,
];

type SidebarView = "home" | "daily-news";

type SidebarChat = { id: string; title: string };

type SidebarProps = {
  dark?: boolean;
  onToggleDark?: () => void;
  collapsed?: boolean;
  activeView?: SidebarView;
  extraChats?: SidebarChat[];
  activeChatId?: string | null;
  onNavigateHome?: () => void;
  onNavigateDailyNews?: () => void;
  onSelectChat?: (id: string) => void;
};

export function Sidebar({
  dark = false,
  onToggleDark,
  collapsed: initialCollapsed = false,
  activeView = "home",
  extraChats = [],
  activeChatId = null,
  onNavigateHome,
  onNavigateDailyNews,
  onSelectChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearchSelect(label: string) {
    setSearchValue(label);
    searchInputRef.current?.blur();
  }

  if (collapsed) {
    return (
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center py-3">
        <div
          className={`flex min-h-0 w-16 flex-1 flex-col items-center overflow-clip rounded-xl p-3 ${
            dark ? "bg-[#1f1730]" : "bg-brand-tint"
          }`}
        >
          <div className="scrollbar-thin flex min-h-0 w-full flex-1 flex-col items-center gap-3 overflow-y-auto">
            <button type="button" aria-label="Home" onClick={onNavigateHome} className="size-8 shrink-0">
              <img src={logo} alt="AI Agent logo" className="size-8 object-contain" />
            </button>
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() => setCollapsed(false)}
              className="flex size-6 shrink-0 items-center justify-center"
            >
              <img src={rightPanelOpen} alt="" className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`} />
            </button>
            <button
              type="button"
              aria-label="New chat"
              onClick={onNavigateHome}
              className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${
                dark ? "border-[#9747ff]" : "border-secondary-border"
              }`}
            >
              <span className="flex size-6 shrink-0 items-center justify-center">
                <img src={addAlt} alt="" className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`} />
              </span>
            </button>
            <button
              type="button"
              aria-label="Search chats"
              className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                dark ? "bg-[#2e2b33]" : "bg-white"
              }`}
            >
              <img src={search} alt="" className={`size-4 ${dark ? "brightness-0 invert" : ""} object-contain`} />
            </button>
            {collapsedIconGroups.map((group, i) => (
              <div key={i} className="flex w-full flex-col items-center gap-1 border-t border-white/20 pt-2">
                {group.map((item, j) => {
                  const isActive = item.label === "Daily news" && activeView === "daily-news";
                  return (
                    <button
                      key={`${item.label}-${j}`}
                      type="button"
                      aria-label={item.label}
                      onClick={item.label === "Daily news" ? onNavigateDailyNews : undefined}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                        isActive
                          ? dark
                            ? "border border-white/20 bg-white/10"
                            : "border border-[#d1c4e6] bg-[#edecff]"
                          : "hover:bg-black/[0.05]"
                      }`}
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center">
                        <img src={item.icon} alt="" className={`h-4 w-4 object-contain ${dark ? "brightness-0 invert" : ""}`} />
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="flex w-full shrink-0 flex-col items-center gap-2 border-t border-white/20 pt-2">
            {onToggleDark && <ThemeToggle dark={dark} onToggle={onToggleDark} />}
            <img src={avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full shrink-0 flex-col items-start overflow-clip rounded-xl py-3 pl-3">
      <div
        className={`flex min-h-0 flex-1 flex-col items-start gap-4 overflow-clip rounded-xl p-6 ${
          dark ? "bg-[#1f1730]" : "bg-brand-tint"
        }`}
      >
        <div className="flex w-[206px] items-center justify-between">
          <button type="button" onClick={onNavigateHome} className="flex items-center gap-2.5">
            <img src={logo} alt="AI Agent logo" className="size-8 object-contain" />
            <p
              className={`whitespace-nowrap text-base font-bold leading-6 ${
                dark ? "text-white" : "text-text-primary"
              }`}
            >
              AI Agent
            </p>
          </button>
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="flex size-6 shrink-0 items-center justify-center"
          >
            <img
              src={rightPanelClose}
              alt=""
              className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`}
            />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`flex w-full shrink-0 items-center justify-center gap-1 rounded-2xl border px-4 py-1.5 ${
              dark ? "border-[#9747ff]" : "border-secondary-border"
            }`}
          >
            <span className="flex size-6 shrink-0 items-center justify-center">
              <img src={addAlt} alt="" className={`h-4 w-4 ${dark ? "brightness-0 invert" : ""}`} />
            </span>
            <span
              className={`text-center text-sm font-semibold leading-6 ${
                dark ? "text-[#c4a1ff]" : "text-secondary-text"
              }`}
            >
              New chat
            </span>
          </button>
          <div className="group relative flex w-full flex-col items-start gap-2">
            <div
              className={`flex w-full shrink-0 items-center gap-1 rounded-3xl border py-1.5 pl-3 pr-2 ${
                dark ? "border-[#62606e] bg-[#2e2b33]" : "border-input-border bg-white"
              }`}
            >
              <img
                src={search}
                alt=""
                className={`size-4 shrink-0 object-contain ${dark ? "brightness-0 invert" : ""}`}
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search chats"
                className={`min-w-0 flex-1 bg-transparent text-sm font-normal leading-6 outline-none placeholder:text-current ${
                  dark ? "text-[#b0b2be]" : "text-input-placeholder"
                }`}
              />
            </div>
            <div className="absolute left-0 top-full z-20 mt-1 hidden group-focus-within:block">
              <SearchDropdown dark={dark} onSelect={handleSearchSelect} />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1">
          <SidebarMenuItem
            icon={news}
            label="Daily news"
            dark={dark}
            state={activeView === "daily-news" ? "selected" : "default"}
            onClick={onNavigateDailyNews}
          />
          <SidebarMenuItem icon={history} label="History" dark={dark} />
        </div>

        <Divider dark={dark} />

        <div className="scrollbar-thin flex min-h-0 w-full flex-1 flex-col items-start gap-2 overflow-y-auto overflow-x-clip">
          <div className="flex w-full shrink-0 flex-col items-start gap-1">
            <TopicHeader title="Tools" dark={dark} />
            <div className="flex w-full flex-col items-start">
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.label} icon={tool.icon} label={tool.label} dark={dark} />
              ))}
              <button
                type="button"
                className="flex shrink-0 items-center gap-1 overflow-clip rounded-3xl px-2 py-1"
              >
                <span
                  className={`text-center text-xs font-semibold leading-6 ${
                    dark ? "text-[#c4a1ff]" : "text-secondary-text"
                  }`}
                >
                  Explore all
                </span>
                <span className="flex size-6 shrink-0 items-center justify-center">
                  <img
                    src={arrowForward}
                    alt=""
                    className={`h-3.5 w-3.5 ${dark ? "brightness-0 invert" : ""}`}
                  />
                </span>
              </button>
            </div>
          </div>

          <Divider dark={dark} />

          <div className="flex w-[206px] shrink-0 flex-col items-start gap-1">
            <TopicHeader
              title="Projects"
              action={{ icon: addProject, label: "New project" }}
              dark={dark}
            />
            <div className="flex w-full flex-col items-start">
              {projects.map((project) => (
                <SidebarMenuItem key={project.label} icon={project.icon} label={project.label} dark={dark} />
              ))}
            </div>
          </div>

          <Divider dark={dark} />

          <div className="flex w-full shrink-0 flex-col items-start gap-1 overflow-clip">
            <TopicHeader title="Chats" dark={dark} />
            <div className="flex w-full flex-col items-start">
              {extraChats.map((chat) => (
                <SidebarMenuItem
                  key={chat.id}
                  icon={chatBubble}
                  label={chat.title}
                  dark={dark}
                  state={chat.id === activeChatId ? "selected" : "default"}
                  onClick={() => onSelectChat?.(chat.id)}
                />
              ))}
              {chats.map((chat, i) => (
                <SidebarMenuItem key={`${chat.label}-${i}`} icon={chat.icon} label={chat.label} dark={dark} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-[206px] shrink-0 flex-col items-start gap-1.5">
          <Divider dark={dark} />
          {onToggleDark && (
            <div className="flex w-full shrink-0 items-center justify-between rounded-xl px-2 py-1.5">
              <p className={`text-sm font-normal leading-6 ${dark ? "text-[#c4a1ff]" : "text-secondary-text"}`}>
                Dark mode
              </p>
              <ThemeToggle dark={dark} onToggle={onToggleDark} />
            </div>
          )}
          <div className="flex w-full shrink-0 flex-col items-start rounded-xl p-2">
            <div className="flex w-full shrink-0 items-center gap-2">
              <div className="flex shrink-0 items-center overflow-clip rounded-full">
                <img src={avatar} alt="" className="size-9 object-cover" />
              </div>
              <p
                className={`min-w-0 flex-1 text-sm font-normal leading-6 ${
                  dark ? "text-white" : "text-text-primary"
                }`}
              >
                Anastasiia Liuta
              </p>
              <span className="flex size-6 shrink-0 items-center justify-center">
                <img
                  src={chevronDownStroke}
                  alt=""
                  className={`h-[11.2px] w-[6.2px] -rotate-90 ${dark ? "brightness-0 invert" : ""}`}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
