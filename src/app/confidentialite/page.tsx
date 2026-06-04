import type { Metadata } from "next";
import { PageIntro } from "@/components/site-shell";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site Lazy App.",
};

const sections = [
  {
    title: "1. Responsable du traitement",
    body: [
      "Le présent site est édité par Lazy App.",
      `Contact : ${contact.email} - ${contact.phone} - lazyapp.fr`,
      "Le responsable du traitement des données collectées sur ce site est Lazy App.",
    ],
  },
  {
    title: "2. Données collectées",
    body: [
      "Lorsque vous utilisez notre site, nous pouvons être amenés à collecter les informations suivantes : nom et prénom, adresse e-mail, numéro de téléphone, nom de société, informations communiquées volontairement via nos formulaires, données techniques de navigation comme l'adresse IP, le navigateur, l'appareil utilisé et les pages visitées.",
      "Nous ne collectons que les données strictement nécessaires à la fourniture de nos services.",
    ],
  },
  {
    title: "3. Finalités du traitement",
    list: [
      "Répondre à vos demandes de contact",
      "Fournir des informations sur nos services",
      "Réaliser des devis ou propositions commerciales",
      "Assurer le bon fonctionnement du site",
      "Mesurer l'audience et améliorer l'expérience utilisateur",
      "Respecter nos obligations légales et réglementaires",
    ],
  },
  {
    title: "4. Base légale du traitement",
    list: [
      "Votre consentement lorsque vous remplissez un formulaire",
      "L'exécution de mesures précontractuelles à votre demande",
      "L'intérêt légitime de Lazy App pour améliorer ses services",
      "Le respect d'obligations légales",
    ],
  },
  {
    title: "5. Destinataires des données",
    body: [
      "Les données collectées sont exclusivement destinées à Lazy App et à ses prestataires techniques intervenant dans l'hébergement, la maintenance ou l'analyse du site.",
      "Ces prestataires sont soumis à des obligations de confidentialité et de sécurité. Aucune donnée personnelle n'est vendue à des tiers.",
    ],
  },
  {
    title: "6. Durée de conservation",
    list: [
      "Demandes de contact : jusqu'à 3 ans après le dernier échange",
      "Données clients : pendant la durée de la relation commerciale puis selon les obligations légales applicables",
      "Cookies et statistiques : jusqu'à 13 mois maximum",
    ],
  },
  {
    title: "7. Sécurité des données",
    body: [
      "Lazy App met en œuvre des mesures techniques et organisationnelles adaptées afin de protéger les données contre l'accès non autorisé, la perte, l'altération, la divulgation accidentelle ou illicite.",
    ],
  },
  {
    title: "8. Vos droits",
    body: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, d'opposition, de portabilité des données et du droit de retirer votre consentement à tout moment.",
      `Pour exercer vos droits, vous pouvez écrire à ${contact.email}. Une réponse sera apportée dans les délais prévus par la réglementation applicable.`,
    ],
  },
  {
    title: "9. Cookies",
    body: [
      "Le site peut utiliser des cookies afin d'assurer son bon fonctionnement, de mesurer son audience et d'améliorer l'expérience utilisateur.",
      "Vous pouvez configurer votre navigateur afin de refuser tout ou partie des cookies.",
    ],
  },
  {
    title: "10. Hébergement",
    body: [
      "Le site est hébergé par un prestataire situé dans l'Union Européenne ou présentant des garanties conformes au RGPD.",
      "Les données sont traitées dans le respect de la réglementation européenne applicable.",
    ],
  },
  {
    title: "11. Modification de la politique",
    body: [
      "Lazy App se réserve le droit de modifier la présente politique de confidentialité à tout moment afin de tenir compte des évolutions légales, réglementaires ou techniques.",
    ],
  },
];

export default function Confidentialite() {
  return (
    <>
      <PageIntro eyebrow="Vos données" title="Politique de confidentialité.">
        Cette page explique quelles données peuvent être collectées, pourquoi elles le sont, et comment exercer vos droits.
      </PageIntro>

      <section className="section grid gap-5 pt-8 text-white/70">
        <article className="glass fire-border p-6 md:p-8">
          <p className="eyebrow">Notre position</p>
          <p className="mt-4 max-w-4xl text-xl font-semibold leading-9 text-white md:text-2xl">
            Nous pensons que la technologie doit simplifier la vie, pas compliquer la confidentialité.
            Vos données vous appartiennent. Nous les utilisons uniquement pour répondre à vos demandes,
            améliorer nos services et faire fonctionner les outils que vous choisissez d&apos;utiliser.
            Jamais pour les revendre. Jamais pour les exploiter sans votre accord.
          </p>
        </article>

        {sections.map((section) => (
          <article className="glass p-6" key={section.title}>
            <h2 className="text-2xl font-bold text-white">{section.title}</h2>
            <div className="mt-4 grid gap-3 leading-7">
              {section.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul className="grid gap-2 pl-5">
                  {section.list.map((item) => (
                    <li className="list-disc" key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}

        <p className="text-sm text-white/40">Dernière mise à jour : 4 juin 2026.</p>
      </section>
    </>
  );
}
