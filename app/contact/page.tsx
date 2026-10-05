import { PageIntro, TextLink } from "@/components/ui";
import ContactForm from "@/components/contact-form";
export const metadata = {
  title: "Contact",
  description:
    "Have an idea for a creator campaign or collaboration? Start a conversation with Creator Mitra.",
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="SAY HELLO"
        title={
          <>
            Good things start
            <br />
            with a conversation.
          </>
        }
        description="A campaign idea, a creative collaboration, or something we haven’t thought of yet. We’d love to hear it."
      />
      <section className="container contact-layout">
        <div className="contact-options">
          <article>
            <h3>Here for your brand?</h3>
            <p>Let’s turn your next idea into a thoughtful creator campaign.</p>
            <TextLink href="/start-campaign">
              Build Your Campaign Brief
            </TextLink>
          </article>
          <article>
            <h3>Here to create?</h3>
            <p>Tell us about your content and the community you’ve built.</p>
            <TextLink href="/creator-signup">Create Your Profile</TextLink>
          </article>
          <div className="notice">
            Official email, phone, and social channels are awaiting
            confirmation. This site does not publish invented contact details.
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
