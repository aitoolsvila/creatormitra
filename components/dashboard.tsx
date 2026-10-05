"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Clapperboard,
  ChartNoAxesCombined,
  Wallet,
  ArrowUpRight,
  Download,
  Check,
  Clock,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { DashboardPreview } from "./product-preview";
import { Portrait, Eyebrow, DemoNote } from "./ui";
import { creators, formatNumber } from "@/lib/data";
import { useLocalValue } from "@/lib/use-local";
import { writeLocal } from "@/lib/storage";
const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "creators", label: "Creators", icon: Users },
  { id: "content", label: "Content", icon: Clapperboard },
  { id: "analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { id: "payments", label: "Payments", icon: Wallet },
];
export default function Dashboard() {
  const params = useSearchParams();
  const initial = params.get("tab") || "overview";
  const [tab, setTab] = useState(
    tabs.some((t) => t.id === initial) ? initial : "overview",
  );
  const approvals = useLocalValue<string[]>("approvals", ["rohan-sharma"]);
  const shortlist = useLocalValue<string[]>("shortlist", []);
  const brief = useLocalValue<Record<string, string> | null>(
    "campaign-brief",
    null,
  );
  const profile = useLocalValue<Record<string, string> | null>(
    "creator-profile",
    null,
  );
  const [notice, setNotice] = useState("");

  function approve(id: string) {
    const next = [...new Set([...approvals, id])];
    if (writeLocal("approvals", next)) {
      setNotice(
        "Content approved in this local demo. No creator has been notified.",
      );
    } else
      setNotice(
        "Browser storage is unavailable. The approval could not be saved.",
      );
  }
  function reset() {
    if (writeLocal("approvals", ["rohan-sharma"])) {
      setNotice("Demo content approvals reset.");
    } else setNotice("Browser storage is unavailable.");
  }
  function exportReport() {
    const rows = [
      ["DEMO CAMPAIGN REPORT — SAMPLE DATA"],
      ["Creator", "Category", "Followers", "Engagement", "Content status"],
      ...creators
        .slice(0, 4)
        .map((c) => [
          c.name,
          c.category,
          c.followers,
          c.engagement + "%",
          approvals.includes(c.id) ? "Approved" : "In review",
        ]),
    ];
    const csv = rows
      .map((row) =>
        row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "creator-mitra-demo-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    setNotice("Sample campaign report downloaded.");
  }
  return (
    <section className="container workspace-section">
      <div className="workspace-heading">
        <div>
          <Eyebrow>THE CREATOR MITRA WORKSPACE · DEMO</Eyebrow>
          <h1>Good things, in progress.</h1>
          <p>
            {profile
              ? `Welcome, ${profile.name}. Your local demo profile is saved.`
              : "A clearer picture of your next creator campaign."}
          </p>
        </div>
        <Link href="/start-campaign" className="button button-primary">
          New Campaign
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="workspace-shell">
        <aside className="workspace-sidebar">
          <span className="workspace-label">THE EVERYDAY EDIT</span>
          <nav aria-label="Workspace sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                aria-label={t.label}
                className={tab === t.id ? "active" : ""}
                onClick={() => {
                  setTab(t.id);
                  setNotice("");
                }}
                aria-current={tab === t.id ? "page" : undefined}
              >
                <t.icon size={17} />
                {t.label}
                {t.id === "content" && <span>{4 - approvals.length}</span>}
              </button>
            ))}
          </nav>
          <div className="workspace-sidebar-help">
            <Sparkles size={19} />
            <h3>Room for your next idea.</h3>
            <p>Ready to move from demo to your own campaign?</p>
            <Link href="/start-campaign">
              Build a brief
              <ArrowRightIcon />
            </Link>
          </div>
        </aside>
        <div className="workspace-content">
          <div className="workspace-content-header">
            <div>
              <h2>{tabs.find((t) => t.id === tab)?.label}</h2>
              <span className="pill">Sample campaign</span>
            </div>
            <button
              className="button button-secondary small-button"
              onClick={exportReport}
            >
              <Download size={14} />
              Export Demo
            </button>
          </div>
          <div className="notice">
            All campaign figures, content, and payments below are sample data.
            This workspace does not send messages, process payments, or connect
            to social platforms.
          </div>
          {notice && (
            <p className="workspace-feedback" role="status">
              <Check size={14} />
              {notice}
            </p>
          )}
          {tab === "overview" && (
            <div className="overview-grid">
              <DashboardPreview />
              <div className="timeline-card">
                <h3>Small steps. Good progress.</h3>
                <span className="tiny-eyebrow">SAMPLE CAMPAIGN TIMELINE</span>
                {[
                  {
                    title: "Creator shortlist",
                    detail: "12 creators selected",
                    done: true,
                  },
                  {
                    title: "Brief shared",
                    detail: "Content direction aligned",
                    done: true,
                  },
                  {
                    title: "Content review",
                    detail: `${approvals.length} of 4 samples approved`,
                    done: false,
                  },
                  {
                    title: "Campaign goes live",
                    detail: "Publishing plan ready",
                    done: false,
                  },
                  {
                    title: "Report & reflect",
                    detail: "A little wiser for next time",
                    done: false,
                  },
                ].map((item, i) => (
                  <div
                    className={`timeline-item ${item.done ? "done" : ""}`}
                    key={item.title}
                  >
                    <span>{item.done ? <Check size={12} /> : i + 1}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "overview" && brief && (
            <article className="saved-brief-card">
              <div>
                <Eyebrow>YOUR LOCAL CAMPAIGN DRAFT</Eyebrow>
                <h3>{brief.campaignName || "Your next campaign"}</h3>
                <p>
                  {brief.need} · {brief.platform} · {brief.budget}
                </p>
                <p>{brief.details}</p>
                {brief.invitedCreator && (
                  <p>Creator invitation drafted: {brief.invitedCreator}</p>
                )}
              </div>
              <Link href="/start-campaign" className="text-link">
                Edit draft
                <ArrowUpRight size={15} />
              </Link>
            </article>
          )}
          {tab === "creators" && (
            <>
              <div className="workspace-subheading">
                <h3>
                  {shortlist.length
                    ? "Your shortlist"
                    : "Sample campaign creators"}
                </h3>
                <Link href="/creator-discovery" className="text-link">
                  Find More Creators
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              <div
                className="table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Campaign creators table"
              >
                <table>
                  <thead>
                    <tr>
                      <th>Creator</th>
                      <th>Category</th>
                      <th>Followers</th>
                      <th>Mitra Score</th>
                      <th>Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(shortlist.length
                      ? creators.filter((c) => shortlist.includes(c.id))
                      : creators.slice(0, 4)
                    ).map((c) => (
                      <tr key={c.id}>
                        <td>
                          <div className="table-person">
                            <Portrait index={c.portrait} />
                            <span>
                              <strong>{c.name}</strong>
                              <small>{c.city}</small>
                            </span>
                          </div>
                        </td>
                        <td>{c.category}</td>
                        <td>{formatNumber(c.followers)}</td>
                        <td>
                          <span className="score-pill">
                            <Sparkles size={12} />
                            {c.score}
                          </span>
                        </td>
                        <td>
                          <Link
                            href={`/creators/${c.id}`}
                            aria-label={`View ${c.name}`}
                          >
                            <ArrowUpRight size={17} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <DemoNote>
                {shortlist.length
                  ? "Showing your browser-saved shortlist."
                  : "Save creators in the directory to build your own shortlist."}
              </DemoNote>
            </>
          )}
          {tab === "content" && (
            <>
              <div className="workspace-subheading">
                <h3>Give good ideas the green light.</h3>
                <button className="subtle-button" onClick={reset}>
                  <RotateCcw size={13} />
                  Reset Demo
                </button>
              </div>
              <div className="approval-grid">
                {creators.slice(0, 4).map((c, i) => (
                  <article className="approval-card" key={c.id}>
                    <div className="approval-portrait">
                      <Portrait index={c.portrait} />
                      <span className="sample-tag">CONTENT CONCEPT</span>
                    </div>
                    <div className="approval-copy">
                      <span className="tiny-eyebrow">
                        {i % 2 ? "YOUTUBE SHORT" : "INSTAGRAM REEL"}
                      </span>
                      <h3>{c.name}</h3>
                      <p>
                        {
                          [
                            "An everyday routine, made simple.",
                            "A closer look at the details.",
                            "Something good, from scratch.",
                            "A little adventure for your feed.",
                          ][i]
                        }
                      </p>
                      {approvals.includes(c.id) ? (
                        <span className="status-pill">
                          <Check size={13} />
                          Approved in demo
                        </span>
                      ) : (
                        <button
                          onClick={() => approve(c.id)}
                          className="button button-secondary small-button"
                        >
                          <Check size={14} />
                          Approve Demo Content
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
          {tab === "analytics" && (
            <>
              <div className="analytics-grid">
                {[
                  {
                    label: "Total views",
                    value: "1.28M",
                    detail: "Across sample creator content",
                  },
                  {
                    label: "Engagement",
                    value: "6.2%",
                    detail: "Illustrative engagement rate",
                  },
                  {
                    label: "Content pieces",
                    value: "24",
                    detail: "Sample planned deliverables",
                  },
                ].map((m) => (
                  <article key={m.label}>
                    <span>{m.label}</span>
                    <strong>{m.value}</strong>
                    <small>{m.detail}</small>
                  </article>
                ))}
              </div>
              <DashboardPreview />
              <DemoNote>
                These figures are illustrative. No live analytics source is
                connected.
              </DemoNote>
            </>
          )}
          {tab === "payments" && (
            <>
              <div className="workspace-subheading">
                <h3>Clear terms. A clearer view.</h3>
                <span className="pill">No payment service connected</span>
              </div>
              <div
                className="table-scroll"
                tabIndex={0}
                role="region"
                aria-label="Sample creator payments table"
              >
                <table>
                  <thead>
                    <tr>
                      <th>Creator</th>
                      <th>Sample fee</th>
                      <th>Sample due date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {creators.slice(0, 4).map((c, i) => (
                      <tr key={c.id}>
                        <td>
                          <div className="table-person">
                            <Portrait index={c.portrait} />
                            <strong>{c.name}</strong>
                          </div>
                        </td>
                        <td>
                          {["₹25,000", "₹40,000", "₹18,000", "₹35,000"][i]}
                        </td>
                        <td>After content approval</td>
                        <td>
                          <span className="pill">
                            <Clock size={11} />
                            Demo pending
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="payment-note">
                This view shows the planned structure for tracking creator
                payments. No funds are held or transferred by this demo.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
function ArrowRightIcon() {
  return <ArrowUpRight size={13} />;
}
