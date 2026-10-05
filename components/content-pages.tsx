import Link from "next/link";
import { StructuredData } from "./structured-data";
import {
  ArrowUpRight,
  Search,
  MessageCircle,
  ChartNoAxesCombined,
  Wallet,
  Users,
  Heart,
  BriefcaseBusiness,
  Globe2,
  Clapperboard,
} from "lucide-react";
import { services, creators, languages } from "@/lib/data";
import {
  PageIntro,
  ButtonLink,
  FinalCTA,
  SectionHeading,
  Eyebrow,
  Portrait,
  CheckList,
  DemoNote,
  TextLink,
} from "./ui";
import { DashboardPreview } from "./product-preview";
import CreatorCard from "./creator-card";
export function ServicePage({ slug }: { slug: string }) {
  const s = services.find((s) => s.slug === slug)!;
  const faqs = [
    {
      q: "How do we get started?",
      a: "Begin with a campaign brief: your goal, audience, platform, and budget. The demo builder saves these details locally. A production intake service will be connected before real enquiries can be submitted.",
    },
    {
      q: "How are creators selected?",
      a: "Creator selection should consider audience relevance, content style, location, language, engagement, and agreed deliverables. The sample directory demonstrates that workflow with fictional profiles.",
    },
    {
      q: "Can we use creator content in paid ads?",
      a: "Usage rights, platforms, duration, and paid distribution should be agreed with each creator before production. They are part of a clear campaign scope, not automatically included.",
    },
  ];
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <PageIntro
        eyebrow={s.eyebrow}
        title={s.title}
        description={s.description}
      >
        <div className="button-row">
          <ButtonLink href="/start-campaign">
            Let’s Build Your Campaign
          </ButtonLink>
          <ButtonLink href="/creator-discovery" secondary>
            Meet the Creators
          </ButtonLink>
        </div>
      </PageIntro>
      <section className="container content-split service-overview">
        <Portrait
          index={
            slug === "ugc"
              ? 2
              : slug.includes("youtube")
                ? 1
                : slug.includes("regional")
                  ? 3
                  : 0
          }
        />
        <div>
          <Eyebrow>THOUGHTFUL FROM START TO FINISH</Eyebrow>
          <h2>
            A clear plan.
            <br />
            Space for good ideas.
          </h2>
          <p>
            Bring your goal. Build a thoughtful creator mix. Keep the moving
            parts together with a brief everyone understands.
          </p>
          <CheckList items={s.includes} />
          <div className="notice">
            This is a service concept for Creator Mitra. Availability, pricing,
            and operational delivery need confirmation before launch.
          </div>
        </div>
      </section>
      {slug === "ugc" && (
        <section className="container section service-examples">
          <SectionHeading
            eyebrow="YOUR CONTENT, IN MANY FORMS"
            title="A little creative direction."
            description="Example formats and storyboards. Real content can replace these concept cards."
          />
          <div className="creator-grid">
            {[
              {
                id: "product-demo",
                title: "Product demo",
                text: "Open with a familiar problem. Show the product in use. Close with one clear benefit.",
                index: 0,
              },
              {
                id: "unboxing",
                title: "Unboxing",
                text: "Capture first impressions, explore the details, and share the experience in the creator’s voice.",
                index: 1,
              },
              {
                id: "lifestyle",
                title: "Lifestyle video",
                text: "Let the product become part of a real everyday moment, from a morning routine to a shared meal.",
                index: 2,
              },
              {
                id: "testimonials",
                title: "Creator reviews",
                text: "Honest experience, useful specifics, and agreed disclosures. Real feedback should never be scripted as a fake testimonial.",
                index: 3,
              },
              {
                id: "ad-creatives",
                title: "Ad creatives",
                text: "A strong opening, one product story, and a clear next step. Agree on paid usage rights before filming.",
                index: 0,
              },
              {
                id: "reviews",
                title: "Detailed reviews",
                text: "Explain the context, show the details, and help the audience decide whether the product fits their needs.",
                index: 1,
              },
            ].map((c) => (
              <article className="ugc-detail-card" id={c.id} key={c.id}>
                <Portrait index={c.index} />
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </article>
            ))}
          </div>
          <DemoNote>
            Storyboards only. No videos are being presented as completed client
            work.
          </DemoNote>
        </section>
      )}
      {slug.includes("regional") && (
        <section className="container section">
          <SectionHeading
            eyebrow="LOCAL VOICES, SHARED POSSIBILITIES"
            title="Find a connection in your language."
          />
          <div className="tag-row">
            {languages.map((l) => (
              <Link
                key={l}
                href={`/creator-discovery?language=${l}`}
                className="pill"
              >
                {l}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        </section>
      )}
      <section className="container section service-steps">
        <SectionHeading
          eyebrow="A THOUGHTFUL WAY TO WORK"
          title="From the first idea to the final report."
        />
        <div className="benefit-grid">
          {[
            {
              icon: Search,
              title: "Find the fit",
              text: "Start with audience, niche, and voice. Build your shortlist with context.",
            },
            {
              icon: MessageCircle,
              title: "Make it together",
              text: "Agree on the brief, deliverables, timelines, usage rights, and feedback.",
            },
            {
              icon: ChartNoAxesCombined,
              title: "Learn what worked",
              text: "Capture useful metrics and bring the learnings into the next campaign.",
            },
          ].map((f) => (
            <article key={f.title} className="benefit-card">
              <f.icon size={25} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="A LITTLE MORE CLARITY"
          title="Good questions. Clear answers."
        />
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function BrandsPage() {
  return (
    <>
      <PageIntro
        eyebrow="FOR AMBITIOUS BRANDS"
        title={
          <>
            Your next campaign.
            <br />
            <span className="accent-text">A little more connected.</span>
          </>
        }
        description="Discover creators who fit. Keep the details together. See what your campaign actually delivered."
      >
        <div className="button-row">
          <ButtonLink href="/start-campaign">Start Your Campaign</ButtonLink>
          <ButtonLink href="/dashboard" secondary>
            Explore the Workspace
          </ButtonLink>
        </div>
      </PageIntro>
      <section className="container section feature-page-top">
        <div className="benefit-grid">
          {[
            {
              icon: Search,
              title: "Find your people",
              text: "Discover creators by niche, city, platform, language, and audience.",
            },
            {
              icon: BriefcaseBusiness,
              title: "Keep things moving",
              text: "Bring briefs, conversations, approvals, and payment tracking into one workspace.",
            },
            {
              icon: ChartNoAxesCombined,
              title: "See the bigger picture",
              text: "Review views, engagement, content performance, and useful campaign learnings.",
            },
            {
              icon: Clapperboard,
              title: "Create content that fits",
              text: "Produce creator-led UGC for your social channels, ads, and product pages.",
            },
            {
              icon: Users,
              title: "Build a balanced creator mix",
              text: "From focused communities to wider audiences, select a mix that serves your goal.",
            },
            {
              icon: Wallet,
              title: "Plan clear terms",
              text: "Agree on scope, usage rights, fees, and payment milestones before work begins.",
            },
          ].map((f) => (
            <article key={f.title} className="benefit-card">
              <f.icon size={25} />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section brand-page-dashboard">
        <SectionHeading
          eyebrow="LESS SPREADSHEET. MORE HEADSPACE."
          title="The moving parts, together."
        />
        <DashboardPreview />
        <DemoNote>Illustrative workspace with sample campaign data.</DemoNote>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="THE RIGHT KIND OF COLLABORATION"
          title="A few people to get you thinking."
        />
        <div className="creator-grid">
          {creators.slice(0, 3).map((c) => (
            <CreatorCard key={c.id} creator={c} />
          ))}
        </div>
        <DemoNote />
      </section>
      <FinalCTA />
    </>
  );
}
export function CreatorsPage() {
  return (
    <>
      <PageIntro
        eyebrow="FOR PEOPLE WITH SOMETHING TO SAY"
        title={
          <>
            More creating.
            <br />
            <span className="accent-text">More possibilities.</span>
          </>
        }
        description="Your ideas deserve the right opportunities. Build your profile and explore brand collaborations that feel like you."
      >
        <div className="button-row">
          <ButtonLink href="/creator-signup">Join as Creator</ButtonLink>
          <ButtonLink href="/live-campaigns" secondary>
            Explore Campaigns
          </ButtonLink>
        </div>
      </PageIntro>
      <section className="container section content-split feature-page-top">
        <div className="creator-page-photo">
          <Portrait index={2} />
        </div>
        <div>
          <Eyebrow>YOUR VOICE IS THE STARTING POINT</Eyebrow>
          <h2>
            Brands that fit.
            <br />
            Work that feels like you.
          </h2>
          <p>
            From your first introduction to your next collaboration, a clearer
            way to work with brands.
          </p>
          <CheckList
            items={[
              "A profile that tells your creative story",
              "Relevant brand collaboration opportunities",
              "Briefs and content approvals in one place",
              "Transparent communication and payment tracking",
              "Performance insights for your next chapter",
            ]}
          />
          <ButtonLink href="/creator-signup">
            Build Your Creator Profile
          </ButtonLink>
        </div>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="A SIMPLE WAY TO START"
          title="Your next chapter, in three steps."
        />
        <div className="benefit-grid">
          {[
            {
              title: "Make your introduction",
              text: "Tell us about your content, social profiles, location, and languages.",
            },
            {
              title: "Explore the possibilities",
              text: "Look for brand campaigns that match your niche, style, and community.",
            },
            {
              title: "Create with clarity",
              text: "Work from a clear brief with agreed terms, timelines, and deliverables.",
            },
          ].map((f, i) => (
            <article key={f.title} className="benefit-card">
              <span className="step-number">0{i + 1}</span>
              <h3 style={{ marginTop: 20 }}>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
export function LiveCampaignsPage() {
  return (
    <>
      <PageIntro
        eyebrow="GOOD IDEAS NEED GOOD PEOPLE"
        title={
          <>
            Your next collaboration
            <br />
            could start here.
          </>
        }
        description="Explore sample opportunities to see how campaign discovery will work. These are illustrative briefs, not live brand offers."
      />
      <section className="container opportunities-grid">
        {[
          {
            title: "The everyday skincare edit",
            category: "Beauty & Lifestyle",
            format: "Instagram Reels + Stories",
            location: "Mumbai & Delhi",
            fee: "₹15,000–₹25,000",
            icon: Heart,
          },
          {
            title: "Something good, from scratch",
            category: "Food & Home",
            format: "Three UGC recipe videos",
            location: "Creators across India",
            fee: "₹12,000–₹20,000",
            icon: Clapperboard,
          },
          {
            title: "Everyday tech, explained",
            category: "Technology",
            format: "YouTube review + Short",
            location: "English & Hindi",
            fee: "₹25,000–₹45,000",
            icon: Globe2,
          },
        ].map((c) => (
          <article className="opportunity-detail" key={c.title}>
            <div className="service-icon">
              <c.icon size={23} />
            </div>
            <span className="pill">Sample opportunity</span>
            <h2>{c.title}</h2>
            <p>
              {c.category} creators with a natural, practical approach to
              storytelling.
            </p>
            <CheckList
              items={[c.format, c.location, `Illustrative fee: ${c.fee}`]}
            />
            <Link href="/creator-signup" className="button button-secondary">
              Create a Demo Profile
              <ArrowUpRight size={15} />
            </Link>
          </article>
        ))}
      </section>
      <div className="container">
        <DemoNote>
          No applications are submitted and no brand offers are available in
          this demo.
        </DemoNote>
      </div>
      <section className="container section">
        <div className="notice">
          Real campaigns will need a verified brand account, approved brief,
          creator eligibility criteria, and confirmed payment terms before going
          live.
        </div>
      </section>
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR MITRA IN THE CREATOR ECONOMY"
        title={
          <>
            Built around people.
            <br />
            <span className="accent-text">Made for connection.</span>
          </>
        }
        description="Creator Mitra is a platform concept bringing brands and creators together through clearer discovery, thoughtful collaboration, and a shared workspace."
      />
      <section className="container about-manifesto">
        <Eyebrow>A SIMPLE BELIEF</Eyebrow>
        <h2>
          The right connection
          <br />
          changes what’s possible.
        </h2>
        <p>
          Brands have stories to tell. Creators have communities that listen.
          Good collaborations bring the two together with purpose, trust, and
          room for creativity.
        </p>
        <p>
          We’re building Creator Mitra to make that process easier to understand
          and easier to manage. Less chasing details. More making something
          worthwhile.
        </p>
      </section>
      <section className="container section">
        <SectionHeading
          eyebrow="WHAT WE’RE BUILDING TOWARDS"
          title="Thoughtful, from the start."
        />
        <div className="benefit-grid">
          {[
            {
              icon: Users,
              title: "People before numbers",
              text: "A real fit means understanding content, communities, and the people behind the profiles.",
            },
            {
              icon: MessageCircle,
              title: "Clarity in collaboration",
              text: "Good work starts with shared expectations, honest communication, and clear terms.",
            },
            {
              icon: Globe2,
              title: "India, in all its voices",
              text: "A creator economy that makes room for local languages, everyday culture, and many points of view.",
            },
          ].map((v) => (
            <article key={v.title} className="benefit-card">
              <v.icon size={25} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="container notice">
        Company history, team profiles, and verified business information are
        awaiting confirmation and have not been invented.
      </div>
      <section className="section">
        <FinalCTA />
      </section>
    </>
  );
}
export function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="GOOD PEOPLE, GREAT POSSIBILITIES"
        title="Help build the next connection."
        description="Interested in the creator economy, thoughtful products, and making collaboration simpler?"
      />
      <section className="container">
        <div className="careers-note">
          <h2>Room for future talent.</h2>
          <p>
            No confirmed roles are published yet. Open positions, the hiring
            process, and a careers contact will be added when verified.
          </p>
          <TextLink href="/contact">Prepare an Introduction</TextLink>
        </div>
      </section>
    </>
  );
}
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  return (
    <>
      <PageIntro
        eyebrow="CLEAR EXPECTATIONS"
        title={
          privacy ? "Privacy, in plain language." : "A few terms for this demo."
        }
        description="This notice describes the current demo. It is not a final production policy and requires business and legal review before launch."
      />
      <article className="prose">
        <h2>{privacy ? "What this demo stores" : "Using this preview"}</h2>
        <p>
          {privacy
            ? "Creator Mitra’s demo saves creator shortlists, campaign briefs, creator profile drafts, contact drafts, and content approval choices in your browser’s local storage when you choose to save them. Form details can include names, email addresses, phone numbers, and campaign information."
            : "This website is a working product demonstration. Creator profiles, verification badges, performance metrics, campaign examples, opportunities, budgets, fees, and quotes are fictional or illustrative. They are not verified client results or available commercial offers."}
        </p>
        <h2>
          {privacy ? "Where your details go" : "Accounts and transactions"}
        </h2>
        <p>
          {privacy
            ? "There is no application backend connected to the forms. Form submissions are not sent to Creator Mitra, brands, or creators. Download buttons create files on your device. The hosting service may separately keep standard technical request logs under its own policies."
            : "This demo does not create authenticated accounts, send campaign invitations, publish profiles, or process payments. Completing a form saves a local browser draft. No campaign, employment, or payment agreement is formed through the demo."}
        </p>
        <h2>
          {privacy ? "Clearing your data" : "Before a real collaboration"}
        </h2>
        <p>
          {privacy
            ? "You can remove saved data by clearing site data in your browser settings. Clearing local storage removes your saved drafts and shortlist. Downloaded files remain on your device until you delete them. Avoid putting confidential information in demo forms, particularly on a shared device."
            : "Real collaborations need agreed deliverables, payment terms, disclosure requirements, usage rights, deadlines, and a verified counterpart. Estimated prices and sample opportunities on this site do not establish those terms."}
        </p>
        <h2>
          {privacy
            ? "Cookies and tracking"
            : "Content and intellectual property"}
        </h2>
        <p>
          {privacy
            ? "The application has no advertising trackers, analytics SDKs, or account cookies configured. Fonts and creator imagery are served locally. Any future production services will require an updated, reviewed privacy policy."
            : "The creator photographs are AI-generated fictional portraits. Content concepts and example campaign figures are placeholders. Before publishing real creator content, obtain the necessary rights and permissions and replace the relevant demo content."}
        </p>
        <h2>Production policy and contact</h2>
        <p>
          The legal business entity, jurisdiction, official contact details,
          retention practices, vendor list, and production terms are awaiting
          confirmation. A final reviewed policy must replace this demo notice
          before collecting real enquiries or enabling accounts.
        </p>
        <div style={{ marginTop: 30 }}>
          <TextLink href="/contact">View Contact Options</TextLink>
        </div>
      </article>
    </>
  );
}
