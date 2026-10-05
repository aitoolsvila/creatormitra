import { Suspense } from "react";
import Onboarding from "@/components/onboarding";
export const metadata = {
  title: "Start a Campaign",
  description:
    "Plan your next creator campaign with a thoughtful step-by-step brief.",
};
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container notice">Loading campaign builder…</div>
      }
    >
      <Onboarding mode="campaign" />
    </Suspense>
  );
}
