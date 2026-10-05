export const dynamicParams = false;
import { StructuredData } from "@/components/structured-data";
import { notFound } from "next/navigation";
import { articles } from "@/lib/data";
import { PageIntro, Portrait, TextLink } from "@/components/ui";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title || "Article not found", description: a?.excerpt };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  if (!a) notFound();
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: a.title,
          description: a.excerpt,
          author: { "@type": "Organization", name: "Creator Mitra editorial" },
          publisher: { "@type": "Organization", name: "Creator Mitra" },
          inLanguage: "en-IN",
        }}
      />
      <div className="article-header">
        <PageIntro
          eyebrow={`JOURNAL · ${a.tag}`}
          title={a.title}
          description={a.excerpt}
        >
          <div className="article-meta">
            <span>Creator Mitra editorial</span>
            {a.readTime}
          </div>
        </PageIntro>
      </div>
      <div className="container article-hero-image">
        <Portrait index={a.portrait} />
      </div>
      <article className="prose">
        {a.sections.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <div style={{ marginTop: 40 }}>
          <TextLink href="/blog">Back to the Journal</TextLink>
        </div>
      </article>
    </>
  );
}
