import { Suspense } from "react";
import Dashboard from "@/components/dashboard";
export const metadata = {
  title: "Demo Campaign Workspace",
  description:
    "Explore Creator Mitra’s sample workspace for creator campaigns, content approvals, and analytics.",
};
export default function Page() {
  return (
    <Suspense
      fallback={<div className="container notice">Loading workspace…</div>}
    >
      <Dashboard />
    </Suspense>
  );
}
