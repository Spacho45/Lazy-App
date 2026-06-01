import type { Metadata } from "next"; import { CTA, StepsGrid } from "@/components/sections"; import { PageIntro } from "@/components/site-shell";
export const metadata: Metadata = { title: "Méthode", description: "Les six étapes de construction de votre territoire digital." };
export default function Methode() { return <><PageIntro eyebrow="La méthode Les IAP" title="Du terrain au moteur.">Six étapes concrètes pour construire votre présence numérique sans transformer votre projet en chantier permanent.</PageIntro><section className="section pt-8"><StepsGrid /><CTA compact /></section></>; }
