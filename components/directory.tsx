"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Bookmark, X } from "lucide-react";
import CreatorCard from "./creator-card";
import { DemoNote } from "./ui";
import { creators, categories, cities, languages } from "@/lib/data";
import { useLocalValue } from "@/lib/use-local";
export default function Directory() {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [city, setCity] = useState(params.get("city") || "");
  const [language, setLanguage] = useState(params.get("language") || "");
  const [platform, setPlatform] = useState(params.get("platform") || "");
  const [followers, setFollowers] = useState("");
  const [engagement, setEngagement] = useState("");
  const [sort, setSort] = useState("match");
  const [savedOnly, setSavedOnly] = useState(false);
  const saved = useLocalValue<string[]>("shortlist", []);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeCount = [
    category,
    city,
    language,
    platform,
    followers,
    engagement,
  ].filter(Boolean).length;
  const filtered = creators
    .filter(
      (c) =>
        (!query ||
          `${c.name} ${c.category} ${c.city} ${c.handle}`
            .toLowerCase()
            .includes(query.toLowerCase())) &&
        (!category || c.category === category) &&
        (!city || c.city === city) &&
        (!language || c.languages.includes(language)) &&
        (!platform || c.platforms.includes(platform)) &&
        (!followers ||
          (followers === "micro"
            ? c.followers < 100000
            : c.followers >= 100000)) &&
        (!engagement || c.engagement >= Number(engagement)) &&
        (!savedOnly || saved.includes(c.id)),
    )
    .sort((a, b) =>
      sort === "followers"
        ? b.followers - a.followers
        : sort === "engagement"
          ? b.engagement - a.engagement
          : b.score - a.score,
    );
  function reset() {
    setQuery("");
    setCategory("");
    setCity("");
    setLanguage("");
    setPlatform("");
    setFollowers("");
    setEngagement("");
    setSavedOnly(false);
  }
  const filterSelects = [
    {
      label: "Platform",
      value: platform,
      set: setPlatform,
      options: ["Instagram", "YouTube"],
    },
    {
      label: "Category",
      value: category,
      set: setCategory,
      options: categories,
    },
    { label: "Location", value: city, set: setCity, options: cities },
    {
      label: "Language",
      value: language,
      set: setLanguage,
      options: languages,
    },
  ];
  return (
    <section className="container directory-section">
      <div className="directory-toolbar">
        <label className="directory-search">
          <Search size={18} />
          <span className="sr-only">Search creators</span>
          <input
            placeholder="Search by name, niche, or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="clear-search"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </label>
        <button
          className={`shortlist-toggle ${savedOnly ? "active" : ""}`}
          onClick={() => setSavedOnly(!savedOnly)}
          aria-pressed={savedOnly}
        >
          <Bookmark size={15} />
          Shortlist <span>{saved.length}</span>
        </button>
        <button
          className="filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
          aria-controls="creator-filters"
        >
          <SlidersHorizontal size={15} />
          Filters{activeCount > 0 && <span>{activeCount}</span>}
        </button>
      </div>
      <div className="directory-layout">
        <aside
          className={`directory-filters ${filtersOpen ? "filters-open" : ""}`}
          id="creator-filters"
        >
          <div className="filter-title">
            <h2>Find your fit</h2>
            <button onClick={reset}>Reset all</button>
          </div>
          {filterSelects.map((f) => (
            <label className="field" key={f.label}>
              <span>{f.label}</span>
              <select
                aria-label={f.label}
                value={f.value}
                onChange={(e) => f.set(e.target.value)}
              >
                <option value="">
                  {f.label === "Category"
                    ? "All categories"
                    : f.label === "Location"
                      ? "All cities"
                      : `All ${f.label.toLowerCase()}s`}
                </option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}
          <label className="field">
            <span>Follower range</span>
            <select
              value={followers}
              onChange={(e) => setFollowers(e.target.value)}
            >
              <option value="">Any audience size</option>
              <option value="micro">Under 100K</option>
              <option value="macro">100K and above</option>
            </select>
          </label>
          <label className="field">
            <span>Engagement rate</span>
            <select
              value={engagement}
              onChange={(e) => setEngagement(e.target.value)}
            >
              <option value="">Any engagement</option>
              <option value="5">5% and above</option>
              <option value="6">6% and above</option>
              <option value="7">7% and above</option>
            </select>
          </label>
          <div className="filter-tip">
            A good match is more than a number. Explore content, audience, and
            style together.
          </div>
        </aside>
        <div className="directory-results">
          <div className="results-heading">
            <p>
              <strong>{filtered.length}</strong>{" "}
              {savedOnly ? "shortlisted " : ""}creator
              {filtered.length === 1 ? "" : "s"}
              <span> · Demo directory</span>
            </p>
            <label>
              <span className="sr-only">Sort creators</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="match">Mitra Score</option>
                <option value="followers">Most followers</option>
                <option value="engagement">Highest engagement</option>
              </select>
            </label>
          </div>
          {filtered.length > 0 ? (
            <div className="creator-grid directory-creator-grid">
              {filtered.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={30} />
              <h3>No creators in this sample yet.</h3>
              <p>
                Try another filter or clear your selections to explore the demo
                directory.
              </p>
              <button className="button button-secondary" onClick={reset}>
                Clear Filters
              </button>
            </div>
          )}
          <DemoNote>
            Fictional profiles, generated portraits, and sample metrics.
            Shortlists are saved on this browser.
          </DemoNote>
        </div>
      </div>
    </section>
  );
}
