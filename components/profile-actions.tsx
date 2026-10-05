"use client";
import { useState } from "react";
import Link from "next/link";
import { Bookmark, ArrowUpRight } from "lucide-react";
import { useLocalValue } from "@/lib/use-local";
import { readLocal, writeLocal } from "@/lib/storage";
export default function ProfileActions({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const shortlist = useLocalValue<string[]>("shortlist", []);
  const saved = shortlist.includes(id);
  const [message, setMessage] = useState("");
  function toggle() {
    const list = readLocal<string[]>("shortlist", []);
    const success = writeLocal(
      "shortlist",
      saved ? list.filter((x) => x !== id) : [...new Set([...list, id])],
    );
    if (success) {
      setMessage(
        saved ? "Removed from your shortlist." : "Saved to your shortlist.",
      );
    } else setMessage("Browser storage is unavailable.");
  }
  return (
    <>
      <div className="button-row">
        <Link
          href={`/start-campaign?creator=${id}`}
          className="button button-primary"
        >
          Invite to Campaign
          <ArrowUpRight size={17} />
        </Link>
        <button
          className="button button-secondary"
          onClick={toggle}
          aria-pressed={saved}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Shortlisted" : "Save Creator"}
        </button>
      </div>
      <p className="action-feedback" role="status">
        {message}
      </p>
      <span className="sr-only">Invite {name} to a demo campaign.</span>
    </>
  );
}
