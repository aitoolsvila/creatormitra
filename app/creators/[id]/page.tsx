export const dynamicParams = false;
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Languages,
  Instagram,
  Youtube,
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { creators, formatNumber } from "@/lib/data";
import {
  Portrait,
  Eyebrow,
  Score,
  DemoNote,
  CheckList,
  SectionHeading,
} from "@/components/ui";
import ProfileActions from "@/components/profile-actions";
import CreatorCard from "@/components/creator-card";
export function generateStaticParams() {
  return creators.map((c) => ({ id: c.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = creators.find((c) => c.id === id);
  return {
    title: c ? `${c.name} — Demo Creator Profile` : "Creator not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = creators.find((c) => c.id === id);
  if (!c) notFound();
  return (
    <>
      <div className="container breadcrumb">
        <Link href="/creator-discovery">
          <ArrowLeft size={13} /> Back to creators
        </Link>
      </div>
      <section className="container profile-hero">
        <div className="profile-portrait">
          <Portrait
            index={c.portrait}
            label={`Generated portrait for fictional creator ${c.name}`}
          />
          <span className="sample-tag">DEMO CREATOR PROFILE</span>
        </div>
        <div className="profile-info">
          <Eyebrow>{c.category} CREATOR</Eyebrow>
          <h1>
            {c.name}
            <span className="profile-verified" title="Sample verified badge">
              ✓
            </span>
          </h1>
          <p className="profile-handle">{c.handle}</p>
          <div className="profile-meta">
            <span>
              <MapPin size={14} />
              {c.city}, India
            </span>
            <span>
              <Languages size={14} />
              {c.languages.join(", ")}
            </span>
          </div>
          <p className="profile-bio">{c.bio}</p>
          <Score score={c.score} />
          <div className="profile-stats">
            <div>
              <Instagram size={16} />
              <strong>{formatNumber(c.followers)}</strong>
              <span>Instagram followers</span>
            </div>
            <div>
              <Youtube size={17} />
              <strong>{formatNumber(c.subscribers)}</strong>
              <span>YouTube subscribers</span>
            </div>
            <div>
              <strong>{formatNumber(c.views)}</strong>
              <span>Average views</span>
            </div>
            <div>
              <strong>{c.engagement}%</strong>
              <span>Engagement</span>
            </div>
          </div>
          <ProfileActions id={c.id} name={c.name} />
        </div>
      </section>
      <div className="container">
        <DemoNote>
          All profile details, verification, prices, collaborations, and metrics
          are fictional sample data.
        </DemoNote>
      </div>
      <section className="container section profile-detail-grid">
        <article className="detail-card">
          <Eyebrow>AUDIENCE SNAPSHOT</Eyebrow>
          <h2>A closer look at the community.</h2>
          <div className="demographic-row">
            <span>18–24 years</span>
            <div>
              <i style={{ width: "42%" }} />
            </div>
            <strong>42%</strong>
          </div>
          <div className="demographic-row">
            <span>25–34 years</span>
            <div>
              <i style={{ width: "38%" }} />
            </div>
            <strong>38%</strong>
          </div>
          <div className="demographic-row">
            <span>35+ years</span>
            <div>
              <i style={{ width: "20%" }} />
            </div>
            <strong>20%</strong>
          </div>
          <h3>Top cities</h3>
          <div className="tag-row">
            {[c.city, "Delhi", "Mumbai"]
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((v) => (
                <span className="pill" key={v}>
                  {v}
                </span>
              ))}
          </div>
          <DemoNote>Illustrative demographics only.</DemoNote>
        </article>
        <article className="detail-card">
          <Eyebrow>
            COLLABORATE WITH {c.name.split(" ")[0].toUpperCase()}
          </Eyebrow>
          <h2>Make something together.</h2>
          <CheckList
            items={[
              "Instagram Reels and stories",
              "Product demos and UGC",
              "Brand integrations and reviews",
            ]}
          />
          <div className="collaboration-range">
            <span>Estimated collaboration range</span>
            <strong>{c.rate}</strong>
            <small>
              Sample pricing · scope and usage rights affect final fees
            </small>
          </div>
          <Link href={`/start-campaign?creator=${c.id}`} className="text-link">
            Start a conversation
            <ArrowUpRight size={16} />
          </Link>
        </article>
        <article className="detail-card">
          <Eyebrow>COLLABORATION STYLE</Eyebrow>
          <h2>A natural voice for your story.</h2>
          <p>
            Thoughtful content, a clear brief, and room for creative ideas. An
            audience-first approach to brand work.
          </p>
          <h3>Past brand collaborations</h3>
          <p className="notice">
            Verified brand collaborations will appear here after a real creator
            profile is connected.
          </p>
        </article>
        <article className="detail-card">
          <Eyebrow>MITRA SCORE · CONCEPT FEATURE</Eyebrow>
          <h2>
            <Sparkles size={24} /> {c.score} / 100
          </h2>
          <p>
            An illustrative match score combining audience, engagement, content
            quality, brand fit, and reliability. It is not a verified
            assessment.
          </p>
          <div className="score-factors">
            <span>Audience quality</span>
            <span>Content quality</span>
            <span>Brand fit</span>
          </div>
        </article>
      </section>
      <section className="container section profile-recent">
        <SectionHeading
          eyebrow="CONTENT DIRECTION"
          title="A little creative inspiration."
          description="Example storyboard directions, ready to be replaced with real creator content."
        />
        <div
          className="ugc-grid"
          tabIndex={0}
          role="region"
          aria-label="Sample content storyboards"
        >
          {["A day in the life", "A product, a story", "A new perspective"].map(
            (name, i) => (
              <div className="ugc-card" key={name}>
                <Portrait index={(c.portrait + i) % 4} />
                <div>
                  <span>Sample content concept</span>
                  <h3>{name}</h3>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
      <section className="container section">
        <SectionHeading eyebrow="KEEP EXPLORING" title="More good company." />
        <div className="creator-grid">
          {creators
            .filter((x) => x.id !== c.id)
            .slice(0, 3)
            .map((x) => (
              <CreatorCard key={x.id} creator={x} />
            ))}
        </div>
      </section>
    </>
  );
}
