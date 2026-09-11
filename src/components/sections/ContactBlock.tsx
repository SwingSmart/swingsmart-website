import { ContactForm } from "@/components/forms/ContactForm";
import { Container, DisplayHeading, Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import type { ContactBlockSection, EventPackage, SiteSettings } from "@/lib/types";

export function ContactBlockView({
  section,
  settings,
  packages,
}: {
  section: ContactBlockSection;
  settings: SiteSettings;
  packages: EventPackage[];
}) {
  const showDetails = section.showDetails !== false;
  const showForm = section.showForm !== false;

  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          {section.heading ? (
            <DisplayHeading className="mb-4">{section.heading}</DisplayHeading>
          ) : null}
          {section.text ? (
            <p className="max-w-md text-base leading-7 text-muted">{section.text}</p>
          ) : null}
          {showDetails ? (
            <ul className="mt-8 space-y-3 text-sm">
              {settings.contact.email ? (
                <li>
                  <a
                    className="text-green-soft hover:underline"
                    href={`mailto:${settings.contact.email}`}
                  >
                    {settings.contact.email}
                  </a>
                </li>
              ) : null}
              {(settings.contact.phones || []).map((phone) => (
                <li key={phone}>
                  <a className="hover:text-green" href={`tel:${phone.replace(/\s/g, "")}`}>
                    {phone}
                  </a>
                </li>
              ))}
              {settings.contact.location ? (
                <li className="text-muted">{settings.contact.location}</li>
              ) : null}
            </ul>
          ) : null}
        </Reveal>
        {showForm ? (
          <Reveal delay={80}>
            <ContactForm packages={packages} />
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
