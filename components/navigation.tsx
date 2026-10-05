"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { Logo, ButtonLink } from "./ui";
const nav = [
  { name: "Solutions", href: "/for-brands", dropdown: true },
  { name: "Platform", href: "/creator-discovery" },
  { name: "For Creators", href: "/for-creators" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resources", href: "/blog" },
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => (
            <div className="nav-item" key={item.name}>
              <Link
                href={item.href}
                className={path === item.href ? "active" : ""}
              >
                {item.name}
                {item.dropdown && <ChevronDown size={12} />}
              </Link>
              {item.dropdown && (
                <div className="nav-dropdown">
                  <Link href="/for-brands">
                    For brands <ArrowUpRight size={15} />
                  </Link>
                  <Link href="/influencer-marketing">Influencer marketing</Link>
                  <Link href="/ugc">UGC content</Link>
                  <Link href="/regional-influencer-marketing">
                    Regional campaigns
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="login-link" href="/login">
            Log in
          </Link>
          <ButtonLink href="/start-campaign">Start a Campaign</ButtonLink>
        </div>
        <button
          className="mobile-menu-toggle icon-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          className="mobile-nav"
          id="mobile-menu"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.name}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Log in
            <ArrowUpRight size={16} />
          </Link>
          <Link
            href="/start-campaign"
            className="button button-primary"
            onClick={() => setOpen(false)}
          >
            Start a Campaign
            <ArrowUpRight size={16} />
          </Link>
        </nav>
      )}
    </header>
  );
}
const columns = [
  {
    title: "Platform",
    links: [
      ["Creator Discovery", "/creator-discovery"],
      ["Campaign Management", "/dashboard"],
      ["Analytics", "/dashboard?tab=analytics"],
      ["UGC Content", "/ugc"],
    ],
  },
  {
    title: "For Brands",
    links: [
      ["Influencer Marketing", "/influencer-marketing"],
      ["Instagram Campaigns", "/instagram-influencer-marketing"],
      ["YouTube Campaigns", "/youtube-influencer-marketing"],
      ["Product Launches", "/product-launch-campaigns"],
    ],
  },
  {
    title: "For Creators",
    links: [
      ["Join Creator Mitra", "/creator-signup"],
      ["Creator Dashboard", "/dashboard"],
      ["Live Campaigns", "/live-campaigns"],
      ["Creator Resources", "/blog"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "/about"],
      ["Case Studies", "/case-studies"],
      ["Journal", "/blog"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>
              Your Mitra in the
              <br />
              Creator Economy.
            </p>
            <div className="social-row">
              <Link
                href="/contact?subject=Instagram"
                aria-label="Ask about our Instagram"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="/contact?subject=LinkedIn"
                aria-label="Ask about our LinkedIn"
              >
                <Linkedin size={18} />
              </Link>
              <Link
                href="/contact?subject=YouTube"
                aria-label="Ask about our YouTube"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>
          {columns.map((col) => (
            <div className="footer-column" key={col.title}>
              <h3>{col.title}</h3>
              {col.links.map(([name, href]) => (
                <Link key={name} href={href}>
                  {name}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Creator Mitra. Made for meaningful
            connections.
          </span>
          <span className="footer-legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span className="india-mark">
              Built with care, in India <span>↗</span>
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
