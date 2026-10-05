import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  ListChecks,
  MessageCircle,
  ChartNoAxesCombined,
  Sparkles,
  Instagram,
  Youtube,
  Clapperboard,
  Rocket,
  Users,
  Languages,
  ArrowRight,
  Play,
  Quote,
  ChevronRight,
  Globe2,
  Check,
  Target,
  ShieldCheck,
  Heart,
  Handshake,
} from "lucide-react";
import {
  ButtonLink,
  TextLink,
  Eyebrow,
  SectionHeading,
  Portrait,
  CheckList,
  DemoNote,
  FinalCTA,
} from "./ui";
import { ProductPreview, DashboardPreview } from "./product-preview";
import CreatorCard from "./creator-card";
import {
  creators,
  categories,
  languages,
  services,
  caseStudies,
} from "@/lib/data";
const serviceIcons = [
  Sparkles,
  Instagram,
  Youtube,
  Clapperboard,
  Rocket,
  Users,
  Languages,
  ChartNoAxesCombined,
];
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="live-dot" />A better way to work with creators
              <ArrowUpRight size={13} />
            </div>
            <h1>
              Find the right
              <br />
              creators.
              <br />
              <span>
                Create campaigns
                <br />
                that perform.
              </span>
            </h1>
            <p>
              Creator Mitra connects brands with the right creators.
              <br className="desktop-break" />
              Discover, collaborate, and launch better campaigns,
              <br className="desktop-break" /> all in one simple platform.
            </p>
            <div className="button-row">
              <ButtonLink href="/start-campaign">Start a Campaign</ButtonLink>
              <ButtonLink href="/creator-discovery" secondary>
                Explore Creators
              </ButtonLink>
            </div>
            <div className="hero-creator-link">
              <span className="avatar-stack">
                <Portrait index={0} />
                <Portrait index={2} />
                <Portrait index={3} />
              </span>
              <span>
                Here to create?{" "}
                <Link href="/creator-signup">
                  Meet your next opportunity <ArrowRight size={14} />
                </Link>
              </span>
            </div>
          </div>
          <ProductPreview />
        </div>
        <div className="container hero-footnote">
          <span>FOR BRANDS WITH A STORY. FOR CREATORS WITH A VOICE.</span>
          <span>
            Made for India. Built for connection.
            <Globe2 size={13} />
          </span>
        </div>
      </section>
      <section className="container trust-section">
        <p className="trust-heading">
          Built for ambitious brands. <span>And the people behind them.</span>
        </p>
        <div className="brand-strip">
          <span className="wordmark-alba">
            alba<span>®</span>
          </span>
          <span className="wordmark-sunday">sunday</span>
          <span className="wordmark-form">
            form<span>↗</span>
          </span>
          <span className="wordmark-mint">MINT</span>
          <span className="wordmark-nuve">nuvé</span>
        </div>
        <p className="placeholder-caption">
          Illustrative brand identities · replace with confirmed partners
        </p>
        <div className="vision-stats">
          <div>
            <strong>
              10,000<span>+</span>
            </strong>
            <span>Creator connections</span>
          </div>
          <div>
            <strong>
              500<span>+</span>
            </strong>
            <span>Campaign possibilities</span>
          </div>
          <div>
            <strong>
              100<span>+</span>
            </strong>
            <span>Ambitious brands</span>
          </div>
          <div>
            <strong>
              50<span>+</span>
            </strong>
            <span>Cities, one community</span>
          </div>
        </div>
        <p className="placeholder-caption">
          Our vision in numbers · illustrative targets, not verified platform
          results
        </p>
      </section>
      <section className="section workflow-section">
        <div className="container">
          <SectionHeading
            eyebrow="LESS FRICTION. MORE CREATION."
            title={
              <>
                From a good fit
                <br />
                to a great campaign.
              </>
            }
            description="All the moving parts. One thoughtful platform."
          >
            <TextLink href="/for-brands">Meet your new workflow</TextLink>
          </SectionHeading>
          <div className="workflow-grid">
            {[
              {
                title: "Discover",
                text: "Find creators who speak to your audience, in their own way.",
                icon: Search,
                detail: "Your people, found.",
              },
              {
                title: "Shortlist",
                text: "Compare the details. Choose the people who feel right.",
                icon: ListChecks,
                detail: "Good fit. Great potential.",
              },
              {
                title: "Collaborate",
                text: "Bring briefs, conversations, and content approvals together.",
                icon: MessageCircle,
                detail: "Less back-and-forth.",
              },
              {
                title: "Measure",
                text: "See what your campaign delivered. Learn for the next one.",
                icon: ChartNoAxesCombined,
                detail: "Clarity, from day one.",
              },
            ].map((step, i) => (
              <div className="workflow-step" key={step.title}>
                <div className="step-top">
                  <span className="step-number">0{i + 1}</span>
                  <step.icon size={22} />
                  {i < 3 && <ArrowRight className="step-arrow" size={16} />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <span className="step-detail">{step.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container section discover-section">
        <SectionHeading
          eyebrow="CREATOR DISCOVERY"
          title={
            <>
              Your brand has a type.
              <br />
              Let’s find it.
            </>
          }
          description="By niche, city, language, or that hard-to-define spark."
        >
          <ButtonLink href="/creator-discovery" secondary>
            Explore All Creators
          </ButtonLink>
        </SectionHeading>
        <div className="discovery-filter-preview">
          <div>
            <Search size={17} />
            <span>Find your next collaboration</span>
          </div>
          <Link href="/creator-discovery?category=Beauty">
            Beauty <ChevronRight size={13} />
          </Link>
          <Link href="/creator-discovery?city=Mumbai">
            Mumbai <ChevronRight size={13} />
          </Link>
          <Link href="/creator-discovery?platform=Instagram">
            Instagram <ChevronRight size={13} />
          </Link>
          <Link href="/creator-discovery" className="filter-button">
            <ListChecks size={15} />
            More filters
          </Link>
        </div>
        <div className="creator-grid home-creators">
          {creators.slice(0, 4).map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
        <DemoNote />
      </section>
      <section className="section score-section">
        <div className="container score-layout">
          <div className="score-copy">
            <Eyebrow>LOOK BEYOND THE FOLLOWER COUNT</Eyebrow>
            <h2>
              A little less guesswork.
              <br />
              Meet the <span>Mitra Score.</span>
            </h2>
            <p>
              A clearer way to look at creator quality. Because a big number
              doesn’t always mean the right connection.
            </p>
            <div className="score-factors">
              {[
                { icon: ShieldCheck, title: "Audience quality" },
                { icon: Heart, title: "Real engagement" },
                { icon: Sparkles, title: "Content quality" },
                { icon: Target, title: "Brand fit" },
                { icon: Handshake, title: "Creator reliability" },
              ].map((f) => (
                <span key={f.title}>
                  <f.icon size={15} />
                  {f.title}
                </span>
              ))}
            </div>
            <p className="small-note">
              Concept feature · scoring criteria and validation are under
              development.
            </p>
          </div>
          <div className="score-visual">
            <div className="score-orbit" />
            <div className="score-ring">
              <svg viewBox="0 0 220 220" aria-hidden="true">
                <circle
                  cx="110"
                  cy="110"
                  r="96"
                  fill="none"
                  stroke="#eeebf5"
                  strokeWidth="8"
                />
                <circle
                  cx="110"
                  cy="110"
                  r="96"
                  fill="none"
                  stroke="#8070cf"
                  strokeWidth="8"
                  strokeDasharray="550 604"
                  strokeLinecap="round"
                  transform="rotate(-90 110 110)"
                />
              </svg>
              <div>
                <span className="score-tiny">MITRA SCORE</span>
                <strong>
                  91<span>/100</span>
                </strong>
                <span className="score-excellent">
                  <Sparkles size={13} />
                  Excellent match
                </span>
              </div>
            </div>
            <div className="score-label score-label-one">
              <Check size={13} />A natural brand fit
            </div>
            <div className="score-label score-label-two">
              <Heart size={13} />
              An engaged community
            </div>
            <p className="score-sample-label">Illustrative score</p>
          </div>
        </div>
      </section>
      <section className="container section brand-section">
        <div className="brand-copy">
          <Eyebrow>FOR BRANDS</Eyebrow>
          <h2>
            Your campaign.
            <br />
            Minus the chaos.
          </h2>
          <p>
            From that first shortlist to the final report, keep your creator
            campaigns moving in one place.
          </p>
          <CheckList
            items={[
              "Discover creators who fit your brand",
              "Keep briefs and approvals together",
              "Track performance and creator payments",
            ]}
          />
          <ButtonLink href="/for-brands">See What’s Possible</ButtonLink>
        </div>
        <DashboardPreview />
      </section>
      <section className="container section creator-section">
        <div className="creator-editorial">
          <Portrait index={2} />
          <div className="creator-quote-overlay">
            <span>MADE TO CREATE.</span>
            <strong>
              Your voice.
              <br />
              Your next chapter.
            </strong>
          </div>
          <div className="opportunity-card">
            <span className="opportunity-icon">
              <Sparkles size={16} />
            </span>
            <div>
              <strong>A new possibility.</strong>
              <span>Your next brand collaboration</span>
            </div>
            <ArrowUpRight size={16} />
          </div>
        </div>
        <div className="for-creators-copy">
          <Eyebrow>FOR CREATORS</Eyebrow>
          <h2>
            More opportunities.
            <br />
            Less chasing brands.
          </h2>
          <p>
            You bring the ideas. We help you find the right brands. Build your
            profile, discover opportunities, and do more of what you love.
          </p>
          <CheckList
            items={[
              "Brand opportunities that fit your content",
              "One place for your collaborations",
              "Clear communication and payment tracking",
            ]}
          />
          <div className="button-row">
            <ButtonLink href="/creator-signup">Join as Creator</ButtonLink>
            <TextLink href="/live-campaigns">Explore Campaigns</TextLink>
          </div>
        </div>
      </section>
      <section className="services-section section">
        <div className="container">
          <SectionHeading
            eyebrow="A LITTLE OF EVERYTHING YOU NEED"
            title={
              <>
                Big ideas come
                <br />
                in all formats.
              </>
            }
            description="A launch, a reel, a whole new audience. Let’s make it happen."
          />
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = serviceIcons[i];
              return (
                <Link href={`/${s.slug}`} className="service-card" key={s.slug}>
                  <div className="service-icon">
                    <Icon size={21} />
                  </div>
                  <h3>{s.name}</h3>
                  <p>{s.description}</p>
                  <span>
                    Let’s explore
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="container section ugc-section">
        <SectionHeading
          eyebrow="REAL PEOPLE. REALLY GOOD CONTENT."
          title={
            <>
              Content that connects.
              <br />
              Beyond the campaign.
            </>
          }
          description="Authentic creator videos for your feed, your ads, and your next launch."
        >
          <ButtonLink href="/ugc" secondary>
            Create UGC Content
          </ButtonLink>
        </SectionHeading>
        <div className="ugc-grid">
          {[
            { name: "The everyday demo", type: "Product demo", index: 0 },
            {
              name: "A taste of something good",
              type: "Lifestyle video",
              index: 2,
            },
            { name: "Unbox the possibilities", type: "Unboxing", index: 1 },
          ].map((u) => (
            <Link
              href={`/ugc#${u.type === "Product demo" ? "product-demo" : u.type === "Unboxing" ? "unboxing" : "lifestyle"}`}
              className="ugc-card"
              key={u.name}
            >
              <Portrait index={u.index} />
              <span className="ugc-play">
                <Play size={17} fill="currentColor" />
              </span>
              <div>
                <span>{u.type}</span>
                <h3>
                  {u.name}
                  <ArrowUpRight size={18} />
                </h3>
              </div>
              <span className="ugc-demo-tag">CONCEPT STORYBOARD</span>
            </Link>
          ))}
        </div>
        <DemoNote>
          Content concepts shown with illustrative portraits. No sample videos
          or client work are implied.
        </DemoNote>
      </section>
      <section className="container section dashboard-feature">
        <div>
          <Eyebrow>ONE WORKSPACE. A CLEARER PICTURE.</Eyebrow>
          <h2>
            Everything in one place.
            <br />
            Everyone on the same page.
          </h2>
          <p>
            Budgets, creators, approvals, payments, and the little details in
            between. Finally, a workspace that gets your workflow.
          </p>
          <div className="dashboard-feature-tags">
            {[
              "Campaign timelines",
              "Content approvals",
              "Performance analytics",
              "Creator payments",
            ].map((t) => (
              <span key={t}>
                <Check size={13} />
                {t}
              </span>
            ))}
          </div>
          <ButtonLink href="/dashboard" secondary>
            Explore the Demo Workspace
          </ButtonLink>
        </div>
        <DashboardPreview />
      </section>
      <section className="case-section section">
        <div className="container">
          <SectionHeading
            eyebrow="THE POSSIBILITIES ARE REAL"
            title={
              <>
                Good people.
                <br />
                Stories with impact.
              </>
            }
            description="A look at how thoughtful creator campaigns could come together."
          >
            <TextLink href="/case-studies">Explore Campaign Concepts</TextLink>
          </SectionHeading>
          <div className="case-grid">
            {caseStudies.slice(0, 2).map((study) => (
              <Link
                className="case-card"
                href={`/case-studies/${study.slug}`}
                key={study.slug}
              >
                <div className="case-image">
                  <Portrait index={study.portrait} />
                  <span className="case-brand">{study.brand}</span>
                  <span className="sample-tag">ILLUSTRATIVE CASE STUDY</span>
                </div>
                <div className="case-copy">
                  <span className="tiny-eyebrow">{study.category}</span>
                  <h3>
                    {study.name}
                    <ArrowUpRight size={23} />
                  </h3>
                  <div className="case-metrics">
                    {study.metrics.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <DemoNote>
            Campaign concepts and metrics are placeholders, not verified client
            results.
          </DemoNote>
        </div>
      </section>
      <section className="container section testimonials-section">
        <SectionHeading
          eyebrow="ROOM FOR YOUR STORY"
          title="Better together. By design."
          description="The experiences we’re working towards. Replace these sample quotes with verified testimonials."
        />
        <div className="testimonials-grid">
          {[
            {
              quote:
                "A place to find creators who feel like a natural extension of our brand.",
              person: "Brand marketer",
              role: "Placeholder testimonial",
              index: 1,
            },
            {
              quote:
                "Less time in spreadsheets. More time building something people actually connect with.",
              person: "Startup founder",
              role: "Placeholder testimonial",
              index: 3,
            },
            {
              quote:
                "The right collaborations should feel like a creative partnership from day one.",
              person: "Lifestyle creator",
              role: "Placeholder testimonial",
              index: 2,
            },
          ].map((t) => (
            <article className="testimonial-card" key={t.person}>
              <Quote size={24} />
              <blockquote>“{t.quote}”</blockquote>
              <div>
                <Portrait index={t.index} />
                <p>
                  <strong>{t.person}</strong>
                  <span>{t.role}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="container section category-section">
        <SectionHeading
          eyebrow="A WORLD OF CREATIVE POSSIBILITIES"
          title="Every niche. Your kind of people."
        />
        <div className="category-grid">
          {categories.map((c, i) => (
            <Link
              href={`/creator-discovery?category=${encodeURIComponent(c)}`}
              key={c}
              className="category-tile"
            >
              <Portrait index={[0, 0, 1, 3, 2, 1, 2, 1, 3, 0][i]} />
              <span>
                {c}
                <ArrowUpRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section regional-section">
        <div className="regional-top">
          <div>
            <Eyebrow>ONE INDIA. MANY VOICES.</Eyebrow>
            <h2>
              A connection in
              <br />
              every language.
            </h2>
          </div>
          <div>
            <p>
              Some stories hit closer to home. Find creators who understand your
              audience, their language, and their everyday world.
            </p>
            <TextLink href="/regional-influencer-marketing">
              Explore Regional Creators
            </TextLink>
          </div>
        </div>
        <div className="language-grid">
          {languages.map((l, i) => (
            <Link key={l} href={`/creator-discovery?language=${l}`}>
              <span>
                {
                  [
                    "नमस्ते",
                    "Hello",
                    "வணக்கம்",
                    "నమస్కారం",
                    "नमस्कार",
                    "નમસ્તે",
                    "নমস্কার",
                    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
                    "നമസ്കാരം",
                    "ನಮಸ್ಕಾರ",
                  ][i]
                }
              </span>
              <small>{l}</small>
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
