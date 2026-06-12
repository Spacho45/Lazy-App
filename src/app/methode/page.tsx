import type { Metadata } from "next";
import { CTA, JourneySection, MethodTimeline } from "@/components/sections";
import { PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Méthode",
  description: "La méthode Lazy App pour transformer une idée en système numérique.",
};

export default function Methode() {
  return (
    <>
      <PageIntro eyebrow="La méthode Lazy App" title="De l&apos;idée au système.">
        Une progression claire pour construire sans s&apos;éparpiller : définir, bâtir, automatiser, développer, faire évoluer.
      </PageIntro>
      <MethodTimeline />
      <JourneySection />
      <CTA compact />
    </>
  );
}
