import { useState } from "react";
import { Modal } from "./ui/Modal";
import { TextField } from "./ui/TextField";
import { Textarea } from "./ui/Textarea";
import { Dropdown } from "./ui/Dropdown";
import { Tab } from "./ui/Tabs";
import { Button } from "./ui/Button";
import closeIcon from "../assets/icons/close-small.svg";
import clockIcon from "../assets/icons/clock.svg";

const CATEGORIES = [
  { label: "Competitors", value: "competitors" },
  { label: "Market", value: "market" },
  { label: "Product", value: "product" },
  { label: "Performance", value: "performance" },
];

const FREQUENCIES = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const DELIVERY_TIMES = [
  { label: "8:00 AM", value: "08:00" },
  { label: "9:00 AM", value: "09:00" },
  { label: "12:00 PM", value: "12:00" },
  { label: "4:00 PM", value: "16:00" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type NewFeed = {
  name: string;
  prompt: string;
  category: string;
  frequency: string;
  days: string[];
  deliveryTime: string;
};

type CreateFeedModalProps = {
  open: boolean;
  dark?: boolean;
  onClose?: () => void;
  onCreate?: (feed: NewFeed) => void;
};

export function CreateFeedModal({ open, dark = false, onClose, onCreate }: CreateFeedModalProps) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("competitors");
  const [frequency, setFrequency] = useState("daily");
  const [days, setDays] = useState<string[]>(["Mon", "Tue", "Wed", "Fri"]);
  const [deliveryTime, setDeliveryTime] = useState("08:00");

  function toggleDay(day: string) {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  }

  function handleCreate() {
    onCreate?.({ name, prompt, category, frequency, days, deliveryTime });
  }

  return (
    <Modal open={open} onClose={onClose} dark={dark}>
      <div className="flex w-full items-center justify-between">
        <p className={`text-xl font-semibold leading-6 ${dark ? "text-white" : "text-text-primary"}`}>
          Create new feed
        </p>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex size-9 shrink-0 items-center justify-center gap-1 overflow-clip rounded-2xl"
        >
          <span className="flex size-6 shrink-0 items-center justify-center">
            <img src={closeIcon} alt="" className={`h-2.5 w-2.5 ${dark ? "brightness-0 invert" : ""}`} />
          </span>
        </button>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <TextField
          label="Feed name"
          required
          value={name}
          onChange={setName}
          placeholder="e.g. Competitor launches"
          dark={dark}
        />

        <Textarea
          label="Monitoring prompt"
          required
          value={prompt}
          onChange={setPrompt}
          placeholder="e.g. Track competitor product launches, pricing changes, and feature announcements in the AI sector"
          onAiAssist={() => {}}
          dark={dark}
        />

        <div className="flex w-full items-start gap-3">
          <Dropdown
            label="Category"
            options={CATEGORIES}
            value={category}
            onChange={setCategory}
            dark={dark}
            className="flex flex-1 flex-col items-start gap-2"
          />
          <Dropdown
            label="Frequency"
            options={FREQUENCIES}
            value={frequency}
            onChange={setFrequency}
            dark={dark}
            className="flex flex-1 flex-col items-start gap-2"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <p className={`text-xs font-bold leading-4 ${dark ? "text-white" : "text-[#1c1a16]"}`}>Delivery days</p>
          <div className="flex w-full flex-wrap items-start gap-2">
            {DAYS.map((day) => (
              <Tab
                key={day}
                selected={days.includes(day)}
                dark={dark}
                onClick={() => toggleDay(day)}
                className="flex-[0_0_auto] sm:flex-1"
              >
                <span className="w-full text-center">{day}</span>
              </Tab>
            ))}
          </div>
        </div>

        <Dropdown
          label="Delivery time"
          options={DELIVERY_TIMES}
          value={deliveryTime}
          onChange={setDeliveryTime}
          icon={clockIcon}
          dark={dark}
        />
      </div>

      <div className="flex w-full items-center justify-end gap-3">
        <Button variant="secondary" dark={dark} onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" dark={dark} onClick={handleCreate}>
          Create feed
        </Button>
      </div>
    </Modal>
  );
}
