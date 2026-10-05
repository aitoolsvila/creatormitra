import Link from "next/link";
import { ArrowUpRight, LockKeyhole, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/ui";
export const metadata = { title: "Workspace Preview" };
export default function Page() {
  return (
    <section className="container login-layout">
      <div>
        <Eyebrow>YOUR NEXT GREAT COLLABORATION</Eyebrow>
        <h1>
          A little less admin.
          <br />
          <span className="accent-text">A lot more creating.</span>
        </h1>
        <p>The right people and the moving parts, together in one workspace.</p>
      </div>
      <div className="login-card">
        <span className="login-icon">
          <LockKeyhole size={27} />
        </span>
        <h2>Welcome to your workspace.</h2>
        <p>
          Explore a sample campaign, creator shortlists, and content approvals.
        </p>
        <div className="notice">
          Account authentication is not connected yet. The demo workspace is
          available without a login. Please don’t enter real credentials.
        </div>
        <Link href="/dashboard" className="button button-primary">
          Open Demo Workspace
          <ArrowUpRight size={16} />
        </Link>
        <span className="login-divider">NEW TO CREATOR MITRA?</span>
        <div className="login-paths">
          <Link href="/start-campaign">
            I’m a brand
            <ArrowUpRight size={15} />
          </Link>
          <Link href="/creator-signup">
            I’m a creator
            <Sparkles size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
