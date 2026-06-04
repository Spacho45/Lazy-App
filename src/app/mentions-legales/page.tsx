import type { Metadata } from "next";
import { PageIntro } from "@/components/site-shell";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Lazy App.",
};

const legalSections = [
  {
    title: "Éditeur du site",
    rows: [
      ["Nom commercial", "Lazy App"],
      ["Responsable de publication", "Nicolas Schneider"],
      ["Statut juridique", "Entrepreneur individuel"],
      ["SIREN", "983 464 710"],
      ["SIRET du siège", "983 464 710 00018"],
      ["Adresse", "11 rue du Débarcadère, 75017 Paris"],
      ["Activité principale exercée (APE)", "62.02A - Conseil en systèmes et logiciels informatiques"],
      ["Contact", `${contact.email} - ${contact.phone}`],
    ],
  },
  {
    title: "Hébergement",
    rows: [
      ["Hébergeur", "Cloudflare, Inc."],
      ["Adresse", "101 Townsend St, San Francisco, CA 94107, États-Unis"],
      ["Site web", "https://www.cloudflare.com"],
    ],
  },
  {
    title: "Nom de domaine",
    rows: [
      ["Domaine principal", "lazyapp.fr"],
      ["Bureau d'enregistrement", "Gandi"],
      ["Date de création du domaine", "8 mars 2004"],
      ["Expiration", "10 mars 2027"],
    ],
  },
];

export default function Mentions() {
  return (
    <>
      <PageIntro eyebrow="Cadre légal" title="Mentions légales.">
        Informations relatives à l&apos;éditeur, à l&apos;hébergement et à l&apos;utilisation du site Lazy App.
      </PageIntro>
      <section className="section grid gap-5 pt-8 text-white/70">
        {legalSections.map((section) => (
          <article className="glass p-6" key={section.title}>
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <dl className="mt-6 grid gap-4">
              {section.rows.map(([label, value]) => (
                <div className="grid gap-1 border-b border-white/10 pb-4 md:grid-cols-[14rem_1fr]" key={label}>
                  <dt className="text-sm text-white/45">{label}</dt>
                  <dd className="font-medium text-white/80">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}

        <article className="glass p-6">
          <h2 className="text-2xl font-bold text-white">Propriété intellectuelle</h2>
          <p className="mt-4 max-w-4xl leading-7">
            Le contenu du site, incluant les textes, éléments graphiques, interfaces, marques, noms commerciaux
            et visuels, est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
            modification ou diffusion non autorisée est interdite.
          </p>
        </article>

        <article className="glass p-6">
          <h2 className="text-2xl font-bold text-white">Responsabilité</h2>
          <p className="mt-4 max-w-4xl leading-7">
            Lazy App s&apos;efforce de fournir des informations exactes et à jour. Toutefois, le site peut contenir
            des erreurs, omissions ou informations devenues obsolètes. L&apos;utilisateur reste responsable de
            l&apos;usage qu&apos;il fait des informations et services présentés.
          </p>
        </article>

        <article className="glass p-6">
          <h2 className="text-2xl font-bold text-white">Données personnelles</h2>
          <p className="mt-4 max-w-4xl leading-7">
            Les informations transmises via le formulaire de contact sont utilisées uniquement pour répondre aux
            demandes reçues. Pour plus de détails sur le traitement des données, consultez la page Confidentialité.
          </p>
        </article>

        <p className="text-sm text-white/40">
          Dernière mise à jour : 4 juin 2026. Les informations d&apos;identification sont établies à partir de
          l&apos;avis de situation au répertoire SIRENE fourni.
        </p>
      </section>
    </>
  );
}
