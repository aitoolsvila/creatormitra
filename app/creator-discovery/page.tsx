import { Suspense } from "react";
import { PageIntro } from "@/components/ui";
import Directory from "@/components/directory";
export const metadata = {
  title: "Creator Discovery",
  description:
    "Explore a sample directory of Indian creators. Filter by platform, niche, location, language, and audience.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR NEXT GREAT COLLABORATION"
        title={
          <>
            Find your people<span className="accent-text">.</span>
          </>
        }
        description="A niche. A city. A shared point of view. Discover creators who feel like a natural fit for your brand."
      />
      <Suspense
        fallback={
          <div className="container notice">Loading creator filters…</div>
        }
      >
        <Directory />
      </Suspense>
    </>
  );
}
