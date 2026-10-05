import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Portrait, FinalCTA } from "@/components/ui";
import { articles } from "@/lib/data";
export const metadata = {
  title: "The Creator Mitra Journal",
  description:
    "Practical ideas for creator discovery, campaign briefs, and measuring influencer campaigns.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="THE CREATOR MITRA JOURNAL"
        title={
          <>
            A little perspective.
            <br />A few good ideas.
          </>
        }
        description="Practical thoughts for brands and creators building something together."
      />
      <section className="container article-grid">
        {articles.map((a) => (
          <Link className="article-card" href={`/blog/${a.slug}`} key={a.slug}>
            <Portrait index={a.portrait} />
            <div>
              <span className="eyebrow">{a.tag}</span>
              <h2>{a.title}</h2>
              <p>{a.excerpt}</p>
              <footer>
                <span>{a.readTime}</span>
                <ArrowUpRight size={18} />
              </footer>
            </div>
          </Link>
        ))}
      </section>
      <section className="section">
        <FinalCTA />
      </section>
    </>
  );
}
