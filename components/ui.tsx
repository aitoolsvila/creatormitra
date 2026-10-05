import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="logo" aria-label="Creator Mitra home">
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M18 7a9 9 0 1 0 0 18"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M18 25V12c0-4 7-4 7 0v13"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span>
          creator<span className="logo-light">mitra</span>
          <span className="logo-dot">.</span>
        </span>
      )}
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
  arrow = true,
  className = "",
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}
    >
      {children}
      {arrow && <ArrowUpRight size={17} />}
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Eyebrow({
  children,
  dot = false,
}: {
  children: ReactNode;
  dot?: boolean;
}) {
  return (
    <div className="eyebrow">
      {dot && <span className="live-dot" />}
      {children}
    </div>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function Portrait({
  index = 0,
  className = "",
  label = "Illustrative creator portrait",
}: {
  index?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`portrait portrait-${index % 4} ${className}`}
      style={{
        backgroundImage: `url("${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/creator-${index % 4}.webp")`,
      }}
    />
  );
}
export function Score({
  score,
  small = false,
}: {
  score: number;
  small?: boolean;
}) {
  return (
    <span className={`score-pill ${small ? "small" : ""}`}>
      <Sparkles size={small ? 11 : 13} />
      {score}
      <span>{small ? "" : "Mitra Score"}</span>
    </span>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <span>
            <Check size={14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
export function DemoNote({
  children = "Illustrative demo. Profiles and figures are sample data.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="demo-note">
      <span /> {children}
    </p>
  );
}
export function FinalCTA() {
  return (
    <section className="container final-cta">
      <div className="cta-orb" aria-hidden="true" />
      <Eyebrow>YOUR NEXT GREAT COLLABORATION STARTS HERE</Eyebrow>
      <h2>
        Good creators.
        <br />
        Great possibilities.
      </h2>
      <p>Tell us your goal. Let’s find your people.</p>
      <div className="button-row">
        <ButtonLink href="/start-campaign">Start a Campaign</ButtonLink>
        <ButtonLink href="/contact" secondary>
          Talk to Our Team
        </ButtonLink>
      </div>
      <p className="creator-link">
        Here to create?{" "}
        <Link href="/creator-signup">
          Join Creator Mitra <ArrowUpRight size={14} />
        </Link>
      </p>
    </section>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="container page-intro">
      <Eyebrow dot>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
}
