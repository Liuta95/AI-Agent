import logo from "../assets/images/logo.svg";
import avatar from "../assets/images/avatar.png";
import rightPanelClose from "../assets/icons/right-panel-close.svg";
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

export function Sidebar() {
  return (
    <div className="flex h-full shrink-0 flex-col items-start overflow-clip rounded-xl py-3 pl-3">
      <div className="flex min-h-0 flex-1 flex-col items-start gap-4 overflow-clip rounded-xl bg-brand-tint p-6">
        <div className="flex w-[206px] items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="AI Agent logo" className="size-8" />
            <p className="whitespace-nowrap text-base font-bold leading-6 text-text-primary">
              AI Agent
            </p>
          </div>
          <button type="button" aria-label="Collapse sidebar" className="size-6 shrink-0">
            <img src={rightPanelClose} alt="" className="size-6" />
          </button>
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <button
            type="button"
            className="flex w-full shrink-0 items-center justify-center gap-1 rounded-2xl border border-secondary-border px-4 py-1.5"
          >
            <img src={addAlt} alt="" className="size-6" />
            <span className="text-center text-sm font-semibold leading-6 text-secondary-text">
              New chat
            </span>
          </button>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full shrink-0 items-center gap-1 rounded-3xl border border-input-border bg-white py-1.5 pl-3 pr-2">
              <img src={search} alt="" className="size-4 shrink-0" />
              <span className="min-w-0 flex-1 text-sm font-normal leading-6 text-input-placeholder">
                Search chats
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-1">
          <SidebarMenuItem icon={news} label="Daily news" />
          <SidebarMenuItem icon={history} label="History" />
        </div>

        <Divider />

        <div className="flex min-h-0 w-full flex-1 flex-col items-start gap-2 overflow-y-auto overflow-x-clip">
          <div className="flex w-full shrink-0 flex-col items-start gap-1">
            <TopicHeader title="Tools" />
            <div className="flex w-full flex-col items-start">
              {tools.map((tool) => (
                <SidebarMenuItem key={tool.label} icon={tool.icon} label={tool.label} />
              ))}
              <button
                type="button"
                className="flex shrink-0 items-center gap-1 overflow-clip rounded-3xl px-2 py-1"
              >
                <span className="text-center text-xs font-semibold leading-6 text-secondary-text">
                  Explore all
                </span>
                <img src={arrowForward} alt="" className="size-6" />
              </button>
            </div>
          </div>

          <Divider />

          <div className="flex w-[206px] shrink-0 flex-col items-start gap-1">
            <TopicHeader title="Projects" action={{ icon: addProject, label: "New project" }} />
            <div className="flex w-full flex-col items-start">
              {projects.map((project) => (
                <SidebarMenuItem key={project.label} icon={project.icon} label={project.label} />
              ))}
            </div>
          </div>

          <Divider />

          <div className="flex w-full shrink-0 flex-col items-start gap-1 overflow-clip">
            <TopicHeader title="Chats" />
            <div className="flex w-full flex-col items-start">
              {chats.map((chat, i) => (
                <SidebarMenuItem key={`${chat.label}-${i}`} icon={chat.icon} label={chat.label} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex w-[206px] shrink-0 flex-col items-start gap-1.5">
          <Divider />
          <div className="flex w-full shrink-0 flex-col items-start rounded-xl p-2">
            <div className="flex w-full shrink-0 items-center gap-2">
              <div className="flex shrink-0 items-center overflow-clip rounded-full">
                <img src={avatar} alt="" className="size-9 object-cover" />
              </div>
              <p className="min-w-0 flex-1 text-sm font-normal leading-6 text-text-primary">
                Anastasiia Liuta
              </p>
              <img src={chevronDownStroke} alt="" className="size-6 shrink-0 -rotate-90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
