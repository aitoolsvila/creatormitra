"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { writeLocal } from "@/lib/storage";
export default function ContactForm() {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "Campaign enquiry",
    message: "",
  });
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (writeLocal("contact-draft", values)) {
      setSaved(true);
      setError("");
    } else
      setError(
        "Browser storage is unavailable. You can copy your message before leaving.",
      );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob(
        [
          Object.entries(values)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n"),
        ],
        { type: "text/plain" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "creator-mitra-message.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return saved ? (
    <div className="contact-success">
      <div className="success-icon">
        <Check size={28} />
      </div>
      <h2>Your message draft is ready.</h2>
      <p>
        Saved on this browser. No message has been sent; a contact delivery
        service hasn’t been connected yet.
      </p>
      <button onClick={download} className="button button-primary">
        <Download size={16} />
        Download Message
      </button>
      <button className="subtle-button" onClick={() => setSaved(false)}>
        Edit message
      </button>
    </div>
  ) : (
    <form className="contact-form" onSubmit={submit}>
      <h2>Let’s start a conversation.</h2>
      <div className="form-grid">
        <label className="field">
          <span>Your name *</span>
          <input
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            placeholder="Your full name"
            maxLength={150}
          />
        </label>
        <label className="field">
          <span>Email address *</span>
          <input
            required
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            placeholder="you@example.com"
            maxLength={150}
          />
        </label>
      </div>
      <label className="field">
        <span>What’s on your mind?</span>
        <select
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
        >
          {[
            "Campaign enquiry",
            "Creator collaboration",
            "UGC content",
            "Partnership",
            "Something else",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Your message *</span>
        <textarea
          required
          rows={5}
          maxLength={2000}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
          placeholder="Tell us a little about your idea."
        />
      </label>
      <label className="consent">
        <input required type="checkbox" />I understand this saves a local draft
        and does not send a message.
      </label>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <button className="button button-primary" type="submit">
        Save Message Draft
        <ArrowUpRight size={16} />
      </button>
      <p className="small-note">
        Contact delivery will be available when the production backend is
        connected.
      </p>
    </form>
  );
}
