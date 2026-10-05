"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Bookmark,
  Instagram,
  Youtube,
} from "lucide-react";
import { Portrait, Score } from "./ui";
import { type Creator, formatNumber } from "@/lib/data";
import { useLocalValue } from "@/lib/use-local";
import { readLocal, writeLocal } from "@/lib/storage";
export default function CreatorCard({ creator }: { creator: Creator }) {
  const shortlist = useLocalValue<string[]>("shortlist", []);
  const saved = shortlist.includes(creator.id);
  const [message, setMessage] = useState("");

  function toggle() {
    const current = readLocal<string[]>("shortlist", []);
    const next = saved
      ? current.filter((id) => id !== creator.id)
      : [...new Set([...current, creator.id])];
    if (writeLocal("shortlist", next)) {
      setMessage(saved ? "Removed from shortlist" : "Added to shortlist");
      window.dispatchEvent(new Event("mitra:shortlist"));
    } else
      setMessage(
        "Browser storage is unavailable. Your selection could not be saved.",
      );
  }
  return (
    <article className="creator-card">
      <div className="creator-photo">
        <Link
          href={`/creators/${creator.id}`}
          aria-label={`View ${creator.name}'s demo profile`}
        >
          <Portrait
            index={creator.portrait}
            label={`Fictional portrait for ${creator.name}`}
          />
        </Link>
        <span className="category-chip">{creator.category}</span>
        <button
          className={`bookmark-button ${saved ? "saved" : ""}`}
          onClick={toggle}
          aria-pressed={saved}
          aria-label={`${saved ? "Remove" : "Save"} ${creator.name} ${saved ? "from" : "to"} shortlist`}
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="platform-chip">
          {creator.platforms.includes("Instagram") && <Instagram size={13} />}
          {creator.platforms.includes("YouTube") && <Youtube size={14} />}
        </span>
      </div>
      <div className="creator-card-content">
        <div className="creator-title">
          <Link href={`/creators/${creator.id}`}>
            <h3>
              {creator.name}
              <span className="verified-demo" title="Sample verification badge">
                ✓
              </span>
            </h3>
          </Link>
          <Score score={creator.score} small />
        </div>
        <p className="creator-location">
          <MapPin size={11} />
          {creator.city}
          <span>·</span>
          {creator.handle}
        </p>
        <div className="creator-metrics">
          <div>
            <strong>{formatNumber(creator.followers)}</strong>
            <span>Followers</span>
          </div>
          <div>
            <strong>{creator.engagement}%</strong>
            <span>Engagement</span>
          </div>
          <div>
            <strong>{formatNumber(creator.views)}</strong>
            <span>Avg. views</span>
          </div>
        </div>
        <Link href={`/creators/${creator.id}`} className="creator-profile-link">
          View Profile
          <ArrowUpRight size={15} />
        </Link>
        <span className="sr-only" role="status">
          {message}
        </span>
      </div>
    </article>
  );
}
