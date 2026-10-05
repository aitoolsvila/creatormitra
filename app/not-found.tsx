import { Eyebrow, ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 · A LITTLE DETOUR</Eyebrow>
      <h1>Let’s find your way back.</h1>
      <p>This page isn’t here. A good connection is still a click away.</p>
      <div className="button-row">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/creator-discovery" secondary>
          Explore Creators
        </ButtonLink>
      </div>
    </section>
  );
}
