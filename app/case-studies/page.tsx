import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Portrait, DemoNote, FinalCTA } from "@/components/ui";
import { caseStudies } from "@/lib/data";
export const metadata = {
  title: "Campaign Concepts & Case Studies",
  description:
    "Illustrative creator campaign concepts for beauty, food, and technology brands.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="THOUGHTFUL CAMPAIGNS, MANY POSSIBILITIES"
        title={
          <>
            Good creators.
            <br />
            Stories with impact.
          </>
        }
        description="Campaign concepts that show what a thoughtful creator collaboration could look like. Replace these examples with verified client work."
      />
      <section className="container">
        <div className="case-grid listing-case-grid">
          {caseStudies.map((s) => (
            <Link
              href={`/case-studies/${s.slug}`}
              className="case-card"
              key={s.slug}
            >
              <div className="case-image">
                <Portrait index={s.portrait} />
                <span className="case-brand">{s.brand}</span>
                <span className="sample-tag">ILLUSTRATIVE CASE STUDY</span>
              </div>
              <div className="case-copy">
                <span className="tiny-eyebrow">{s.category}</span>
                <h3>
                  {s.name}
                  <ArrowUpRight size={19} />
                </h3>
                <div className="case-metrics">
                  {s.metrics.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <DemoNote>
          All brands, campaign metrics, and outcomes on this page are sample
          data.
        </DemoNote>
      </section>
      <section className="section">
        <FinalCTA />
      </section>
    </>
  );
}
