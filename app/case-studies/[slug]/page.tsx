export const dynamicParams = false;
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import {
  PageIntro,
  Portrait,
  DemoNote,
  TextLink,
  FinalCTA,
} from "@/components/ui";
export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      caseStudies.find((s) => s.slug === slug)?.name || "Case study not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = caseStudies.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <PageIntro
        eyebrow={`${s.category} · ILLUSTRATIVE CASE STUDY`}
        title={s.name}
        description={s.summary}
      />
      <div className="container">
        <div className="case-detail-photo">
          <Portrait index={s.portrait} />
        </div>
        <div className="case-detail-stats">
          {s.metrics.map((m) => (
            <strong key={m}>{m}</strong>
          ))}
        </div>
        <DemoNote>
          Example figures only. This campaign has not been represented as
          completed client work.
        </DemoNote>
      </div>
      <article className="prose">
        <h2>The challenge</h2>
        <p>{s.challenge}</p>
        <h2>The approach</h2>
        <p>{s.approach}</p>
        <h2>What we would measure</h2>
        <p>
          Views and engagement across agreed formats, audience relevance,
          content quality, and any tracked campaign traffic. Real results would
          need source analytics, a clear reporting window, and client approval
          before publication.
        </p>
        <h2>Room for your story</h2>
        <p>
          Replace this illustrative concept with a verified campaign, approved
          brand assets, creator content, and documented results when available.
        </p>
        <div style={{ marginTop: 30 }}>
          <TextLink href="/case-studies">
            Explore More Campaign Concepts
          </TextLink>
        </div>
      </article>
      <FinalCTA />
    </>
  );
}
