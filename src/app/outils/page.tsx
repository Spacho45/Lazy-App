import type { Metadata } from "next";
import { CTA, SystemMockup, ToolsGrid } from "@/components/sections";
import { PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Outils",
  description: "Les capacités numériques que Lazy App assemble pour les entrepreneurs.",
};

export default function Outils() {
  return (
    <>
      <PageIntro eyebrow="Sous le capot" title="Des outils qui servent le système.">
        CRM, automatisations, IA, acquisition et dashboards ne sont utiles que s&apos;ils rendent votre activité plus simple à piloter.
      </PageIntro>
      <section className="section pt-8">
        <SystemMockup />
      </section>
      <ToolsGrid />
      <CTA compact />
    </>
  );
}
