import type { Metadata } from "next";
import { CTA, EnvironmentsGrid } from "@/components/sections";
import { PageIntro } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Écosystème",
  description: "Just Hustelin', CPF et PureOwner : les trois univers produits de Lazy App.",
};

export default function Ecosysteme() {
  return (
    <>
      <PageIntro eyebrow="Architecture de marque" title="Trois produits, trois langages.">
        Chaque univers répond à un moment différent : attirer l&apos;attention, rendre les choses simples, et donner envie de posséder son identité numérique.
      </PageIntro>
      <EnvironmentsGrid />
      <CTA compact />
    </>
  );
}
