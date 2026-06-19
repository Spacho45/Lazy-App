"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { contact, navigation, projects } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/10 bg-[#08080c]/88 backdrop-blur-xl">
      <div className="site-header-inner">
        <Link href="/" className="brand-logo" onClick={() => setOpen(false)} aria-label="Lazy App - Accueil">
          <Image src="/assets/lazyapp-logo.png" alt="Lazy App" width={180} height={120} priority />
        </Link>
        <button className="md:hidden" aria-expanded={open} aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>
          <span className="block h-0.5 w-6 bg-white" />
          <span className="mt-1.5 block h-0.5 w-6 bg-white" />
        </button>
        <nav className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 border-b border-white/10 bg-[#08080c] px-6 py-6 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
          <Link href="/contact" className="header-cta text-center" onClick={() => setOpen(false)}>Discuter</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer-hub">
      <div className="site-footer-inner grid gap-12 py-16 lg:grid-cols-[1.2fr_.8fr_.8fr_.9fr]">
        <div className="footer-brand">
          <Link href="/" className="brand-logo brand-logo-footer" aria-label="Lazy App - Accueil">
            <Image src="/assets/lazyapp-logo.png" alt="Lazy App" width={210} height={140} />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
            Atelier numérique premium. Nous aidons les entrepreneurs à transformer une idée en système complet :
            identité, présence, outils, acquisition et automatisation.
          </p>
          <Link href="/contact" className="quiet-cta mt-6">Discuter</Link>
        </div>

        <div>
          <p className="footer-title">Navigation</p>
          <div className="mt-4 grid gap-2">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/confidentialite">Confidentialité</Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Réalisations</p>
          <div className="mt-4 grid gap-2">
            {projects.slice(0, 5).map((project) => <Link href="/partenaires" key={project.name}>{project.name}</Link>)}
          </div>
        </div>

        <div>
          <p className="footer-title">Contact</p>
          <div className="mt-4 grid gap-2 text-sm text-white/60">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={`tel:${contact.phone.replaceAll(" ", "")}`}>{contact.phone}</a>
            <span>{contact.domain}</span>
          </div>
          <div className="mt-6 flex gap-3 text-sm text-white/45">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>GitHub</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/35">
        © 2026 Lazy App. Vous avez un métier. Nous construisons tout le reste.
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-white/65">{children}</p>
    </section>
  );
}
