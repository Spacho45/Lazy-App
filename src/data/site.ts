export type Step = { number: string; title: string; metaphor: string; summary: string; items: string[] };
export type Environment = { name: string; eyebrow: string; description: string; role: string[]; tone: string; accent: "acid" | "fire" | "champagne"; image?: string };
export const contact = { email: "nicolas@lazyapp.fr", phone: "06 03 21 70 91", domain: "www.lazyapp.fr" };
export const navigation = [
  { label: "Accueil", href: "/" }, { label: "Méthode", href: "/methode" }, { label: "Écosystème", href: "/ecosysteme" },
  { label: "Outils", href: "/outils" }, { label: "Partenaires", href: "/partenaires" }, { label: "Contact", href: "/contact" },
];
export const steps: Step[] = [
  { number: "01", title: "Digital ID", metaphor: "Acheter le terrain", summary: "On choisit l'adresse, on sécurise les accès et on branche les routes.", items: ["Noms de domaine", "Extensions Web3", "Wallets", "Sécurité"] },
  { number: "02", title: "Site & App", metaphor: "Construire la maison", summary: "On bâtit un espace clair où votre activité peut accueillir, convaincre et vendre.", items: ["Site vitrine", "Landing page", "Application simple", "Espace client"] },
  { number: "03", title: "Tunnels de vente", metaphor: "Envoyer les invitations", summary: "On dessine les bons chemins d'entrée pour éviter que les prospects se perdent.", items: ["Formulaires", "QR codes", "Emails", "Pages de conversion"] },
  { number: "04", title: "Acquisition", metaphor: "Faire venir les convives", summary: "On organise l'arrivée du trafic avec des actions compréhensibles et mesurables.", items: ["Contenus", "Campagnes", "Partenariats", "Prospection"] },
  { number: "05", title: "Accueil & conversion", metaphor: "Recevoir correctement", summary: "On affine le message, les preuves et le parcours de décision.", items: ["Offre claire", "Preuve sociale", "Prise de contact", "Paiement"] },
  { number: "06", title: "Outils & automatisation", metaphor: "Faire tourner le moteur", summary: "On installe un système opérationnel visible, pilotable et utile au quotidien.", items: ["CRM", "Automatisations", "Dashboards", "IA métier"] },
];
export const environments: Environment[] = [
  { name: "Just Socialing", eyebrow: "Attirer l'attention", description: "L'entrée dark, punk et cyberpunk. Une provocation intelligente pour créer du désir et casser les codes.", role: ["Créer du bruit utile", "Donner envie d'entrer", "Produire des formats viraux"], tone: "Street, drôle, tranchant", accent: "acid" },
  { name: "CPF / C'est Pas Faux", eyebrow: "Rendre limpide", description: "L'univers pédagogique et accessible qui transforme les sujets complexes en décisions simples.", role: ["Rassurer les entreprises", "Expliquer sans ennuyer", "Formaliser les livrables"], tone: "Clair, sérieux, légèrement décalé", accent: "fire", image: "/assets/cpf.png" },
  { name: "Pure Owner", eyebrow: "Posséder ce qui compte", description: "L'environnement premium qui parle identité, propriété numérique et souveraineté personnelle.", role: ["Porter la vision haut de gamme", "Parler de patrimoine digital", "Créer de l'exclusivité"], tone: "Élégant, calme, minimaliste", accent: "champagne", image: "/assets/pure-owner.png" },
];
export const tools = ["CRM", "IA métier", "Automatisations", "Dashboards", "Formulaires", "QR codes", "Tunnels", "Paiements", "Wallets", "Analytics"];
export const partnerProfiles = ["Designers", "Développeurs", "Copywriters", "Experts acquisition", "No-code builders", "Consultants", "Spécialistes SEO", "Experts IA"];
export const faqs = [
  { question: "Vous faites seulement des sites internet ?", answer: "Non. Le site est une pièce du moteur. On travaille aussi l'identité digitale, les tunnels, l'acquisition et les automatisations." },
  { question: "Faut-il comprendre le Web3 pour travailler avec vous ?", answer: "Non. Notre rôle est justement de rendre les outils utiles sans vous imposer un dictionnaire technique." },
  { question: "Comment fonctionne la rémunération à la performance ?", answer: "Quand le contexte le permet, nous définissons ensemble une part liée aux résultats. Le cadre exact dépend du projet et reste transparent." },
  { question: "Pouvez-vous reprendre un système existant ?", answer: "Oui. On commence par regarder ce qui fonctionne déjà, puis on simplifie, connecte et améliore ce qui mérite de l'être." },
];
export const siteDescription = "Les IAP construit votre territoire digital : identité, site, tunnels, acquisition et automatisation.";
