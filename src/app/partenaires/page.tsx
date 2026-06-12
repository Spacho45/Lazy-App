import type { Metadata } from "next";
import { CTA, ProjectsSection, ProofSection } from "@/components/sections";
import { PageIntro } from "@/components/site-shell";
import { partnerProfiles } from "@/data/site";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Réalisations, projets et réseau de partenaires Lazy App.",
};

export default function Partenaires() {
  return (
    <>
      <PageIntro eyebrow="Réalisations & partenaires" title="Des projets pensés comme des systèmes.">
        Nous réunissons les bonnes compétences autour de chaque projet : design, développement, copywriting, acquisition, automatisation et IA.
      </PageIntro>
      <ProjectsSection />
      <ProofSection />
      <section className="section pt-0">
        <div className="section-kicker">
          <p className="eyebrow">Réseau</p>
          <h2 className="section-title">Chaque spécialiste apporte une pièce du moteur.</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {partnerProfiles.map((profile, index) => (
            <div key={profile} className="glass card-hover p-5">
              <span className="mono">0{index + 1}</span>
              <h3 className="mt-7 font-bold">{profile}</h3>
            </div>
          ))}
        </div>
      </section>
      <CTA compact />
    </>
  );
}
