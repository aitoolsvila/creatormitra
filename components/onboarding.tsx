"use client";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Instagram,
  Youtube,
  Users,
  Rocket,
  Search,
  Clapperboard,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { categories, languages, cities, creators } from "@/lib/data";
import { useLocalValue } from "@/lib/use-local";
import { readLocal, writeLocal } from "@/lib/storage";
import { Eyebrow } from "./ui";
type Fields = Record<string, string>;
const campaignSteps = [
  "The idea",
  "Platform",
  "Budget",
  "Audience",
  "The details",
  "About you",
];
const creatorSteps = [
  "About you",
  "Social profiles",
  "Your niche",
  "Location & language",
  "Your profile",
];
export default function Onboarding({ mode }: { mode: "campaign" | "creator" }) {
  const creator = mode === "creator";
  const steps = creator ? creatorSteps : campaignSteps;
  const params = useSearchParams();
  const invited = creators.find((c) => c.id === params.get("creator"));
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Fields>({});
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [draftDismissed, setDraftDismissed] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storageKey = creator ? "creator-profile" : "campaign-brief";
  const savedDraft = useLocalValue<Fields | null>(storageKey, null);
  const savedExists = Boolean(savedDraft) && !draftDismissed;
  function field(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    setError("");
  }
  function choice(
    name: string,
    options: string[],
    icons?: React.ElementType[],
  ) {
    return (
      <div className="choice-grid">
        {options.map((o, i) => {
          const Icon = icons?.[i];
          return (
            <button
              type="button"
              key={o}
              onClick={() => field(name, o)}
              className={`choice-card ${values[name] === o ? "selected" : ""}`}
              aria-pressed={values[name] === o}
            >
              {Icon && <Icon size={22} />}
              <span>{o}</span>
              <span className="choice-check">
                {values[name] === o && <Check size={12} />}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
  function input(
    name: string,
    label: string,
    type = "text",
    placeholder = "",
    required = true,
  ) {
    return (
      <label className="field" key={name}>
        <span>
          {label}
          {required && <span className="required-mark"> *</span>}
        </span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={values[name] || ""}
          onChange={(e) => field(name, e.target.value)}
          required={required}
          maxLength={name === "phone" ? 22 : 150}
          pattern={type === "tel" ? "\\+?[0-9 ()-]{7,22}" : undefined}
          autoComplete={
            name === "name"
              ? "name"
              : name === "email"
                ? "email"
                : name === "phone"
                  ? "tel"
                  : name === "company"
                    ? "organization"
                    : "off"
          }
        />
      </label>
    );
  }
  function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const requirements = creator
      ? [[], [], ["category"], ["city"], []]
      : [["need"], ["platform"], ["budget"], [], [], []];
    if (requirements[step].some((k) => !values[k])) {
      setError("Choose an option to continue.");
      return;
    }
    if (
      creator &&
      step === 1 &&
      !values.instagram?.trim() &&
      !values.youtube?.trim()
    ) {
      setError("Add at least one social profile to continue.");
      return;
    }
    if (creator && step === 3 && !selectedLanguages.length) {
      setError("Choose at least one language.");
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      requestAnimationFrame(() => headingRef.current?.focus());
      return;
    }
    const record = {
      ...values,
      languages: selectedLanguages.join(", "),
      invitedCreator: invited?.name || "",
      savedAt: new Date().toISOString(),
    };
    if (!writeLocal(storageKey, record)) {
      setError(
        "Your browser storage is unavailable. Enable it to save a local draft.",
      );
      return;
    }
    setComplete(true);
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function download() {
    const text = Object.entries({
      ...values,
      languages: selectedLanguages.join(", "),
      ...(invited ? { invitedCreator: invited.name } : {}),
    })
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    const blob = new Blob(
      [
        `CREATOR MITRA — LOCAL DEMO DRAFT\n\n${text}\n\nNot submitted to Creator Mitra.`,
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = creator ? "creator-profile.txt" : "campaign-brief.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  function resume() {
    const saved = readLocal<Fields | null>(storageKey, null);
    if (saved) {
      setValues(saved);
      setSelectedLanguages(saved.languages ? saved.languages.split(", ") : []);
      setStep(0);
      setDraftDismissed(true);
    }
  }
  const titles = creator
    ? [
        "Let’s start with you.",
        "Where do you create?",
        "What’s your creative world?",
        "Where’s your community?",
        "Make your introduction.",
      ]
    : [
        "What are we creating?",
        "Where should your story live?",
        "Let’s talk possibilities.",
        "Who are your people?",
        "Tell us about your idea.",
        "Who’s behind the brand?",
      ];
  return (
    <section className="container onboarding-layout">
      <aside className="onboarding-sidebar">
        <Eyebrow>
          {creator ? "YOUR NEXT CHAPTER" : "LET’S MAKE SOMETHING GREAT"}
        </Eyebrow>
        <h1>
          {creator ? (
            <>
              Made to create.
              <br />
              <span>Built to connect.</span>
            </>
          ) : (
            <>
              A good campaign
              <br />
              starts with
              <br />
              <span>a conversation.</span>
            </>
          )}
        </h1>
        <p>
          {creator
            ? "Your voice deserves the right opportunities. Let’s get to know you."
            : "A few thoughtful details. A clearer starting point for your next creator campaign."}
        </p>
        <ol
          className="onboarding-step-list"
          tabIndex={0}
          aria-label="Onboarding progress"
        >
          {steps.map((s, i) => (
            <li
              key={s}
              className={i === step ? "current" : i < step ? "done" : ""}
            >
              <span>
                {i < step ? (
                  <Check size={12} />
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <div className="onboarding-sidebar-note">
          <Sparkles size={16} />
          <p>
            {creator
              ? "Your content. Your community. Your kind of brands."
              : "Good people. Clear goals. Room for great ideas."}
          </p>
        </div>
      </aside>
      <div className="wizard-card">
        {complete ? (
          <div className="wizard-success">
            <div className="success-icon">
              <Check size={30} />
            </div>
            <Eyebrow>
              {creator ? "YOUR NEXT CHAPTER STARTS HERE" : "ONE STEP CLOSER"}
            </Eyebrow>
            <h2 ref={headingRef} tabIndex={-1}>
              {creator
                ? "Welcome to Creator Mitra."
                : "Your campaign brief is ready."}
            </h2>
            <p>
              {creator
                ? `Nice to meet you, ${values.name.split(" ")[0]}. Your demo creator profile is ready.`
                : `Thanks, ${values.name.split(" ")[0]}. Your campaign details are saved on this browser.`}
            </p>
            <div className="notice">
              This is a local demo.{" "}
              {creator
                ? "Your profile has not been published and no account has been created."
                : "Nothing has been sent to a team or submitted to a server."}{" "}
              You can download your draft below.
            </div>
            <div className="wizard-summary">
              {Object.entries(values)
                .filter(([key]) => !["phone", "email"].includes(key))
                .map(([k, v]) => (
                  <div key={k}>
                    <span>{k.replace(/([A-Z])/g, " $1")}</span>
                    <strong>{v}</strong>
                  </div>
                ))}
            </div>
            <div className="button-row">
              <button className="button button-primary" onClick={download}>
                <Download size={16} />
                Download {creator ? "Profile" : "Brief"}
              </button>
              <Link className="button button-secondary" href="/dashboard">
                Explore Workspace
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <button
              className="subtle-button"
              onClick={() => {
                setComplete(false);
                setStep(0);
              }}
            >
              Edit my details
            </button>
          </div>
        ) : (
          <>
            <div className="wizard-topline">
              <span>{creator ? "CREATOR ONBOARDING" : "CAMPAIGN BUILDER"}</span>
              <span>
                0{step + 1} <span>/ 0{steps.length}</span>
              </span>
            </div>
            <div className="progress-track">
              <span
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
            {savedExists && (
              <div className="resume-draft">
                <span>You have a local draft.</span>
                <button onClick={resume}>
                  Use saved details
                  <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => setDraftDismissed(true)}
                  aria-label="Dismiss saved draft"
                >
                  ×
                </button>
              </div>
            )}
            {invited && (
              <div className="notice invitation-note">
                Planning a collaboration with <strong>{invited.name}</strong>.
                This demo will save the creator in your brief.
              </div>
            )}
            <form onSubmit={next}>
              <h2 ref={headingRef} tabIndex={-1}>
                {titles[step]}
              </h2>
              <p className="wizard-description">
                {creator
                  ? [
                      "A little introduction goes a long way.",
                      "Share a handle or full profile URL.",
                      "Choose the niche that feels most like you.",
                      "Tell us where you’re based and the languages you create in.",
                      "A few words that make your profile feel like you.",
                    ][step]
                  : [
                      "Pick the starting point for your next campaign.",
                      "Choose the channels that feel right for your audience.",
                      "Your budget helps shape the right creator mix.",
                      "Describe the community you’d like to connect with.",
                      "The goal, the product, and anything else we should know.",
                      "Add your details to complete your local campaign draft.",
                    ][step]}
              </p>
              {!creator &&
                step === 0 &&
                choice(
                  "need",
                  [
                    "Influencer Campaign",
                    "UGC Content",
                    "Product Launch",
                    "Creator Discovery",
                  ],
                  [Users, Clapperboard, Rocket, Search],
                )}
              {!creator &&
                step === 1 &&
                choice(
                  "platform",
                  ["Instagram", "YouTube", "Both"],
                  [Instagram, Youtube, Users],
                )}
              {!creator &&
                step === 2 &&
                choice("budget", ["Below ₹1L", "₹1L–₹5L", "₹5L–₹20L", "₹20L+"])}
              {!creator && step === 3 && (
                <div className="form-fields">
                  {input(
                    "audience",
                    "Who do you want to reach?",
                    "text",
                    "e.g. Women aged 18–30 interested in skincare",
                  )}
                  <label className="field">
                    <span>Target location</span>
                    <select
                      value={values.location || ""}
                      onChange={(e) => field("location", e.target.value)}
                    >
                      <option value="">Across India</option>
                      {cities.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  {input(
                    "audienceLanguage",
                    "Preferred languages",
                    "text",
                    "e.g. Hindi and English",
                    false,
                  )}
                </div>
              )}
              {!creator && step === 4 && (
                <div className="form-fields">
                  {input(
                    "campaignName",
                    "Campaign or product name",
                    "text",
                    "Give your idea a name",
                  )}
                  <label className="field">
                    <span>
                      Your goal and campaign details{" "}
                      <span className="required-mark">*</span>
                    </span>
                    <textarea
                      rows={5}
                      required
                      maxLength={2000}
                      value={values.details || ""}
                      onChange={(e) => field("details", e.target.value)}
                      placeholder="What are you launching? What would success look like?"
                    />
                  </label>
                  {input(
                    "timeline",
                    "Ideal launch timing",
                    "text",
                    "e.g. Next month",
                    false,
                  )}
                </div>
              )}
              {!creator && step === 5 && (
                <div className="form-fields">
                  {input("name", "Your name", "text", "Your full name")}
                  {input("company", "Company", "text", "Your brand or company")}
                  <div className="form-grid">
                    {input("email", "Work email", "email", "you@brand.com")}
                    {input("phone", "Phone", "tel", "+91 98765 43210")}
                  </div>
                  <label className="consent">
                    <input type="checkbox" required />I understand these details
                    are saved on this browser only.{" "}
                    <Link href="/privacy">Privacy details</Link>
                  </label>
                </div>
              )}
              {creator && step === 0 && (
                <div className="form-fields">
                  {input("name", "Full name", "text", "Your name")}
                  {input("email", "Email address", "email", "you@example.com")}
                  {input("phone", "Phone number", "tel", "+91 98765 43210")}
                </div>
              )}
              {creator && step === 1 && (
                <div className="form-fields">
                  {input(
                    "instagram",
                    "Instagram profile",
                    "text",
                    "@yourhandle or profile URL",
                    false,
                  )}
                  {input(
                    "youtube",
                    "YouTube channel",
                    "text",
                    "@yourchannel or channel URL",
                    false,
                  )}
                  <p className="small-note">
                    Add at least one profile. We don’t connect to your social
                    accounts in this demo.
                  </p>
                </div>
              )}
              {creator && step === 2 && choice("category", categories)}
              {creator && step === 3 && (
                <div className="form-fields">
                  <label className="field">
                    <span>
                      Your city <span className="required-mark">*</span>
                    </span>
                    <input
                      required
                      value={values.city || ""}
                      onChange={(e) => field("city", e.target.value)}
                      placeholder="Your city"
                      list="creator-cities"
                    />
                    <datalist id="creator-cities">
                      {cities.map((c) => (
                        <option key={c} value={c} />
                      ))}
                    </datalist>
                  </label>
                  <fieldset className="language-choices">
                    <legend>Languages you create in *</legend>
                    {languages.map((l) => (
                      <label key={l}>
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(l)}
                          onChange={() =>
                            setSelectedLanguages(
                              selectedLanguages.includes(l)
                                ? selectedLanguages.filter((x) => x !== l)
                                : [...selectedLanguages, l],
                            )
                          }
                        />
                        <span>{l}</span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              )}
              {creator && step === 4 && (
                <div className="form-fields">
                  {input(
                    "headline",
                    "Profile headline",
                    "text",
                    "e.g. Making everyday beauty feel simple",
                  )}
                  <label className="field">
                    <span>A little about you *</span>
                    <textarea
                      rows={4}
                      required
                      value={values.bio || ""}
                      onChange={(e) => field("bio", e.target.value)}
                      maxLength={1000}
                      placeholder="Your content, your community, your creative style."
                    />
                  </label>
                  <label className="consent">
                    <input type="checkbox" required />I understand this is a
                    local demo profile.{" "}
                    <Link href="/privacy">Privacy details</Link>
                  </label>
                </div>
              )}
              {error && (
                <p className="error-text" role="alert">
                  {error}
                </p>
              )}
              <div className="wizard-bottom">
                <button
                  type="button"
                  className="wizard-back"
                  disabled={step === 0}
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
                <button type="submit" className="button button-primary">
                  {step === steps.length - 1
                    ? creator
                      ? "Complete Profile"
                      : "Get Campaign Plan"
                    : "Continue"}
                  <ArrowRight size={16} />
                </button>
              </div>
              <p className="wizard-local-note">
                Demo experience · details stay on this browser
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
