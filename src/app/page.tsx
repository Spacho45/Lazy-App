import Link from "next/link";
import {
  CTA,
  EnvironmentsGrid,
  FAQ,
  JourneySection,
  MethodTimeline,
  ProjectsSection,
  ProofSection,
  SystemMockup,
  ToolsGrid,
} from "@/components/sections";
import { hero, promise } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="hero-title mt-5">{hero.title}</h1>
          <p className="hero-body">{hero.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" href="/contact">{hero.primaryCta}</Link>
            <Link className="btn-secondary" href="/methode">{hero.secondaryCta}</Link>
          </div>
          <div className="hero-proof">
            <span>Identité</span>
            <span>Site</span>
            <span>Automatisation</span>
            <span>Acquisition</span>
            <span>IA</span>
          </div>
        </div>
        <SystemMockup />
      </section>

      <section className="section pt-0">
        <div className="promise-card">
          <p className="eyebrow">La promesse</p>
          <h2>{promise.title}</h2>
          <p>{promise.body}</p>
        </div>
      </section>

      <JourneySection />
      <MethodTimeline />
      <ProjectsSection />
      <ProofSection />
      <EnvironmentsGrid />
      <ToolsGrid />
      <FAQ />
      <CTA />
    </>
  );
}
