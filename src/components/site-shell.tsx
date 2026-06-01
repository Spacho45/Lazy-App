"use client";
import Link from "next/link";
import { useState } from "react";
import { contact, navigation } from "@/data/site";
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080c]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
    <Link href="/" className="wordmark" onClick={() => setOpen(false)}>LES <span>IAP</span></Link><button className="md:hidden" aria-expanded={open} aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}><span className="block h-0.5 w-6 bg-white" /><span className="mt-1.5 block h-0.5 w-6 bg-white" /></button>
    <nav className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-4 border-b border-white/10 bg-[#08080c] px-5 py-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>{navigation.map((item) => <Link key={item.href} href={item.href} className="nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/contact" className="btn-primary text-center" onClick={() => setOpen(false)}>Faire tailler mon costume</Link></nav>
  </div></header>;
}
export function Footer() {
  return <footer className="border-t border-white/10 bg-black/30"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-3 lg:px-8"><div><div className="wordmark">LES <span>IAP</span></div><p className="mt-3 max-w-sm text-sm text-white/55">On construit. On connecte. On automatise. On prend un pourcentage sur ce qui fonctionne. Sinon, rien.</p></div><div className="text-sm text-white/65"><p className="eyebrow">Contact</p><a className="block hover:text-white" href={`mailto:${contact.email}`}>{contact.email}</a><a className="block hover:text-white" href={`tel:${contact.phone.replaceAll(" ", "")}`}>{contact.phone}</a><span>{contact.domain}</span></div><div className="flex flex-col gap-2 text-sm text-white/65 md:items-end"><Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><span className="mt-2 text-white/35">© 2026 Les IAP</span></div></div></footer>;
}
export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) { return <section className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="mt-5 max-w-3xl text-lg text-white/65">{children}</p></section>; }
