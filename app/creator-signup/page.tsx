import { Suspense } from "react";
import Onboarding from "@/components/onboarding";
export const metadata = {
  title: "Join as a Creator",
  description:
    "Create a local demo creator profile and explore brand collaboration possibilities.",
};
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container notice">Loading creator onboarding…</div>
      }
    >
      <Onboarding mode="creator" />
    </Suspense>
  );
}
