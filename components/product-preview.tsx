import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  ChartNoAxesCombined,
  BriefcaseBusiness,
  Users,
  ChevronsUpDown,
  Bell,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Portrait } from "./ui";
export function ProductPreview() {
  return (
    <div className="hero-visual">
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="preview-window">
        <div className="preview-chrome">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>Creator Mitra Workspace</span>
          <span className="preview-demo">DEMO</span>
        </div>
        <div className="preview-layout">
          <aside className="preview-sidebar">
            <div className="mini-brand">
              m<span>.</span>
            </div>
            <LayoutGrid size={16} />
            <span className="active">
              <Search size={16} />
            </span>
            <BriefcaseBusiness size={16} />
            <Users size={16} />
            <ChartNoAxesCombined size={16} />
            <div className="sidebar-avatar">A</div>
          </aside>
          <div className="preview-main">
            <div className="preview-heading">
              <div>
                <span className="tiny-eyebrow">
                  YOUR NEXT GREAT COLLABORATION
                </span>
                <h3>
                  Find your people<span>.</span>
                </h3>
              </div>
              <Bell size={15} />
            </div>
            <div className="preview-search">
              <Search size={13} />
              <span>Search by name, niche, or city...</span>
              <SlidersHorizontal size={13} />
            </div>
            <div className="preview-tabs">
              <span className="selected">All creators</span>
              <span>For your brand</span>
              <span>Shortlisted</span>
              <span className="filter-dot">●</span>
            </div>
            <div className="preview-creators">
              <Link href="/creators/aarushi-mehta" className="mini-creator">
                <div className="mini-photo">
                  <Portrait index={0} />
                  <span className="mini-category">Beauty & Lifestyle</span>
                </div>
                <div className="mini-details">
                  <h4>
                    Aarushi Mehta <span>✓</span>
                  </h4>
                  <p>Mumbai, India</p>
                  <div className="mini-metrics">
                    <span>
                      <b>82K</b>Followers
                    </span>
                    <span>
                      <b>5.8%</b>Engagement
                    </span>
                  </div>
                  <div className="mini-invite">
                    View Creator <ArrowUpRight size={11} />
                  </div>
                </div>
              </Link>
              <Link href="/creators/rohan-sharma" className="mini-creator">
                <div className="mini-photo">
                  <Portrait index={1} />
                  <span className="mini-category">Tech & Everyday</span>
                </div>
                <div className="mini-details">
                  <h4>
                    Rohan Sharma <span>✓</span>
                  </h4>
                  <p>Bangalore, India</p>
                  <div className="mini-metrics">
                    <span>
                      <b>124K</b>Followers
                    </span>
                    <span>
                      <b>6.2%</b>Engagement
                    </span>
                  </div>
                  <div className="mini-invite">
                    View Creator <ArrowUpRight size={11} />
                  </div>
                </div>
              </Link>
            </div>
            <div className="preview-bottom">
              <span>
                <span className="live-dot" />
                Good things start with the right fit.
              </span>
              <ChevronsUpDown size={11} />
            </div>
          </div>
        </div>
      </div>
      <div className="match-float">
        <div className="match-icon">
          <Sparkles size={18} />
        </div>
        <div>
          <span>IT’S A MATCH</span>
          <strong>Big on brand fit.</strong>
        </div>
        <div className="match-score">
          91<small>Mitra Score</small>
        </div>
      </div>
      <div className="collab-float">
        <div className="float-avatars">
          <Portrait index={2} />
          <Portrait index={3} />
        </div>
        <div>
          <strong>Better together.</strong>
          <span>Creators. Brands. Possibilities.</span>
        </div>
        <span className="float-check">
          <Check size={13} />
        </span>
      </div>
      <span className="hero-visual-caption">
        A little preview of your next big idea. <ArrowRight size={11} />
      </span>
    </div>
  );
}
export function DashboardPreview() {
  return (
    <div className="dashboard-preview">
      <div className="dashboard-preview-top">
        <span className="project-icon">
          <BriefcaseBusiness size={18} />
        </span>
        <div>
          <span className="tiny-eyebrow">CAMPAIGN OVERVIEW · SAMPLE DATA</span>
          <h3>The Everyday Edit</h3>
        </div>
        <span className="status-pill">
          <span className="live-dot" />
          In progress
        </span>
      </div>
      <div className="dash-stats">
        <div>
          <span>Campaign budget</span>
          <strong>₹2.4L</strong>
          <small>Illustrative budget</small>
        </div>
        <div>
          <span>Total views</span>
          <strong>1.28M</strong>
          <small className="green-text">↗ Sample metric</small>
        </div>
        <div>
          <span>Creators</span>
          <strong>
            12<span className="muted"> / 12</span>
          </strong>
          <small>Selected for this demo</small>
        </div>
      </div>
      <div className="dash-chart-title">
        <span>Campaign performance</span>
        <span>Last 14 days</span>
      </div>
      <div className="chart">
        <div className="chart-grid">
          <span>1.5M</span>
          <span>1.0M</span>
          <span>0.5M</span>
        </div>
        <svg
          viewBox="0 0 500 125"
          preserveAspectRatio="none"
          aria-label="Illustrative increasing campaign views"
          role="img"
        >
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8d7bec" stopOpacity=".2" />
              <stop offset="100%" stopColor="#8d7bec" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 110C35 105 40 115 70 94S100 96 135 82S175 88 200 60S235 70 265 48S290 53 330 35S365 40 405 20S445 28 500 4V125H0Z"
            fill="url(#chartFill)"
          />
          <path
            d="M0 110C35 105 40 115 70 94S100 96 135 82S175 88 200 60S235 70 265 48S290 53 330 35S365 40 405 20S445 28 500 4"
            fill="none"
            stroke="#7c64d8"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      <div className="chart-dates">
        <span>01 Jun</span>
        <span>07 Jun</span>
        <span>14 Jun</span>
      </div>
      <div className="dash-content">
        <Portrait index={0} />
        <div>
          <strong>Aarushi Mehta</strong>
          <span>Instagram Reel · Everyday skincare</span>
        </div>
        <span className="status-pill">
          <Check size={12} />
          Approved
        </span>
      </div>
    </div>
  );
}
