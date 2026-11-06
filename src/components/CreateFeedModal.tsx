import { useEffect, useRef, useState, type FormEvent } from "react";
import { Modal } from "./ui/Modal";
import { TextField } from "./ui/TextField";
import { Textarea } from "./ui/Textarea";
import { Dropdown } from "./ui/Dropdown";
import { Tab } from "./ui/Tabs";
import { Button } from "./ui/Button";
import closeIcon from "../assets/icons/close-small.svg";
import clockIcon from "../assets/icons/clock.svg";
import {
  CATEGORIES,
  DAYS,
  DELIVERY_TIMES,
  FEED_NAME_MAX,
  FEED_PROMPT_MAX,
  FREQUENCIES,
  validateFeed,
  type FeedErrors,
  type NewFeed,
} from "../lib/feeds";

export type { NewFeed };

type CreateFeedModalProps = {
  open: boolean;
  dark?: boolean;
  onClose?: () => void;
  onCreate?: (feed: NewFeed) => void;
};

const INITIAL_DAYS = ["Mon", "Tue", "Wed", "Fri"];

export function CreateFeedModal({ open, dark = false, onClose, onCreate }: CreateFeedModalProps) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("competitors");
  const [frequency, setFrequency] = useState("daily");
  const [days, setDays] = useState<string[]>(INITIAL_DAYS);
  const [deliveryTime, setDeliveryTime] = useState("08:00");
  // Errors only appear after a submit attempt, then clear field-by-field as the user fixes them.
  const [errors, setErrors] = useState<FeedErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // A fresh modal every time: closing (Cancel, Esc, backdrop) or creating discards the draft.
  useEffect(() => {
    if (open) return;
    setName("");
    setPrompt("");
    setCategory("competitors");
    setFrequency("daily");
    setDays(INITIAL_DAYS);
    setDeliveryTime("08:00");
    setErrors({});
    setSubmitted(false);
  }, [open]);

  function current(overrides: Partial<NewFeed> = {}): NewFeed {
    return { name, prompt, category, frequency, days, deliveryTime, ...overrides };
  }

  // Once the user has tried to submit, re-validate on every change so errors vanish as they're fixed
  // (and reappear if they break a field again). Deriving it from state avoids stale-closure bugs.
  useEffect(() => {
    if (submitted) setErrors(validateFeed({ name, prompt, category, frequency, days, deliveryTime }));
  }, [submitted, name, prompt, category, frequency, days, deliveryTime]);

  function toggleDay(day: string) {
    setDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const feed = current();
    const found = validateFeed(feed);
    setSubmitted(true);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Keep everything the user typed; move focus to the first problem.
      requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }
    onCreate?.({ ...feed, name: feed.name.trim(), prompt: feed.prompt.trim() });
  }

  return (
    <Modal open={open} onClose={onClose} dark={dark}>
      <form ref={formRef} noValidate onSubmit={handleSubmit} className="contents">
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
          maxLength={FEED_NAME_MAX}
          error={errors.name}
          dark={dark}
        />

        <Textarea
          label="Monitoring prompt"
          required
          value={prompt}
          onChange={setPrompt}
          maxLength={FEED_PROMPT_MAX}
          error={errors.prompt}
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
          {errors.days && (
            <p role="alert" className={`text-xs font-normal leading-4 ${dark ? "text-[#ff8a84]" : "text-[#b3261e]"}`}>
              {errors.days}
            </p>
          )}
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
        <Button type="button" variant="secondary" dark={dark} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" dark={dark}>
          Create feed
        </Button>
      </div>
      </form>
    </Modal>
  );
}
