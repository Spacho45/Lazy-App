import Image from "next/image";
import Link from "next/link";
import {
  environments,
  faqs,
  journey,
  method,
  projects,
  proofStats,
  tools,
} from "@/data/site";

export function CTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-8" : "section"}>
      <div className="glass fire-border relative overflow-hidden p-7 md:p-10">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[var(--fire)]/20 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Le prochain système à construire</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
              Vous avez une idée. Nous construisons ce qui la fait vivre.
            </h2>
          </div>
          <Link href="/contact" className="btn-primary shrink-0">Parler de mon projet</Link>
        </div>
      </div>
    </section>
  );
}

export function SystemMockup() {
  return (
    <div className="system-mockup">
      <div className="mockup-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="mockup-grid">
        <div className="mockup-panel large">
          <p className="mono">Lazy App OS</p>
          <h3>Idée → Système</h3>
          <div className="signal-line" />
        </div>
        <div className="mockup-panel">
          <p>Identité</p>
          <strong>stable</strong>
        </div>
        <div className="mockup-panel">
          <p>Site</p>
          <strong>prêt</strong>
        </div>
        <div className="mockup-panel">
          <p>Automatisation</p>
          <strong>active</strong>
        </div>
        <div className="mockup-panel accent">
          <p>Acquisition</p>
          <strong>en cours</strong>
        </div>
      </div>
    </div>
  );
}

export function JourneySection() {
  return (
    <section className="section">
      <div className="section-kicker">
        <p className="eyebrow">Acquisition → Construction → Aménagement → Invitations → Fiesta</p>
        <h2 className="section-title">Un parcours plus qu&apos;une liste de services.</h2>
        <p className="section-copy">
          Chaque étape produit un résultat concret pour l&apos;entrepreneur : plus de clarté, plus de crédibilité,
          plus de vitesse et moins de friction.
        </p>
      </div>
      <div className="journey-stack">
        {journey.map((step) => (
          <article key={step.number} className="journey-card">
            <div className="journey-number">{step.number}</div>
            <div>
              <p className="eyebrow">{step.metaphor}</p>
              <h3>{step.title}</h3>
              <p>{step.result}</p>
            </div>
            <div className="journey-tags">
              {step.details.map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MethodTimeline() {
  return (
    <section className="section">
      <div className="section-kicker centered">
        <p className="eyebrow">Notre méthode : simple, rapide, efficace</p>
        <h2 className="section-title">Une idée. Une méthode. Un système.</h2>
      </div>
      <div className="timeline">
        {method.map((step, index) => (
          <article className="timeline-step" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section className="section">
      <div className="section-kicker">
        <p className="eyebrow">Réalisations</p>
        <h2 className="section-title">Des univers pensés comme des produits.</h2>
        <p className="section-copy">
          Les projets ci-dessous servent de vitrines, de laboratoires et de preuves de méthode. Chaque carte est
          pensée pour évoluer en étude de cas complète.
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className={`project-card ${index === 0 ? "featured" : ""}`} key={project.name}>
            {project.image ? (
              <Image src={project.image} alt={`Projet ${project.name}`} fill className="object-cover object-top opacity-70" />
            ) : (
              <div className="project-visual" />
            )}
            <div className="project-content">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <Link href="/contact" className="project-link">{project.cta}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section className="section">
      <div className="proof-grid">
        <div className="glass p-7 md:p-10">
          <p className="eyebrow">Preuve sociale</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            La structure est prête pour montrer les résultats.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/60">
            Projets lancés, automatisations créées, domaines enregistrés, sites mis en ligne : la section est
            conçue pour accueillir les chiffres réels au fil des livraisons.
          </p>
        </div>
        <div className="stats-grid">
          {proofStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EnvironmentsGrid() {
  return (
    <section className="section">
      <div className="section-kicker">
        <p className="eyebrow">Les trois univers</p>
        <h2 className="section-title">Trois approches distinctes. Une même exigence.</h2>
      </div>
      <div className="environment-grid">
        {environments.map((env) => (
          <article key={env.name} className={`environment-card accent-${env.accent}`}>
            {env.image ? (
              <Image src={env.image} alt={`Univers ${env.name}`} fill className="object-cover object-top opacity-55" />
            ) : (
              <div className="hustle-visual" />
            )}
            <div className="environment-content">
              <p className="eyebrow">{env.eyebrow}</p>
              <h3>{env.name}</h3>
              <p>{env.description}</p>
              <ul>
                {env.role.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <Link href="/contact" className="project-link">{env.cta}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ToolsGrid() {
  return (
    <section className="section">
      <div className="section-kicker centered">
        <p className="eyebrow">Capacités</p>
        <h2 className="section-title">La technologie au service du client.</h2>
      </div>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div className="tool-pill" key={tool}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {tool}
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="section">
      <div className="section-kicker">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-title">Les questions utiles, sans détour.</h2>
      </div>
      <div className="mt-8 grid gap-3">
        {faqs.map((faq) => (
          <details className="glass group p-5" key={faq.question}>
            <summary className="cursor-pointer list-none font-semibold">
              {faq.question}
              <span className="float-right text-acid group-open:rotate-45">+</span>
            </summary>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-white/60">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
