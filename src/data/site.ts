export type JourneyStep = {
  number: string;
  metaphor: string;
  title: string;
  result: string;
  details: string[];
};

export type MethodStep = {
  title: string;
  body: string;
};

export type Environment = {
  name: string;
  eyebrow: string;
  description: string;
  role: string[];
  tone: string;
  accent: "acid" | "fire" | "champagne";
  cta: string;
  image?: string;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  image?: string;
  cta: string;
};

export const contact = {
  email: "nicolas@lazyapp.fr",
  phone: "06 03 21 70 91",
  domain: "www.lazyapp.fr",
};

export const navigation = [
  { label: "Accueil", href: "/" },
  { label: "Méthode", href: "/methode" },
  { label: "Écosystème", href: "/ecosysteme" },
  { label: "Réalisations", href: "/partenaires" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  eyebrow: "Atelier numérique premium",
  title: "Nous construisons votre système numérique.",
  body: "Vous avez une idée ? Nous saurons lui donner vie...",
  primaryCta: "Construire mon système",
  secondaryCta: "Voir la méthode",
};

export const promise = {
  title: "Vous avez un métier. Lazy App construit tout le reste.",
  body: "Nous ne vendons pas des pages web. Nous dessinons un système complet, lisible et évolutif pour que votre activité gagne en clarté, en crédibilité et en vitesse.",
};

export const journey: JourneyStep[] = [
  {
    number: "01",
    metaphor: "L'acquisition du terrain",
    title: "Votre identité numérique",
    result: "Une adresse claire, crédible et durable pour exister d'une manière cohérente en ligne.",
    details: ["Nom de domaine", "Propriété numérique", "Web3", "Sécurité de base"],
  },
  {
    number: "02",
    metaphor: "Bâtir la maison",
    title: "Votre présence en ligne",
    result: "Un site ou une app simple à comprendre, beau à regarder, prêt à convertir.",
    details: ["Site vitrine", "Landing pages", "Espace client", "Formulaires"],
  },
  {
    number: "03",
    metaphor: "Réaliser les aménagements intérieurs",
    title: "Vos outils et automatisations",
    result: "Un quotidien plus fluide, moins manuel, mieux connecté.",
    details: ["CRM", "Dashboards", "Relances", "IA métier"],
  },
  {
    number: "04",
    metaphor: "Lancer les invitations",
    title: "Une acquisition easy going",
    result: "Des chemins d'entrée clairs pour attirer les bons prospects.",
    details: ["Contenus", "SEO", "Campagnes", "Prospection"],
  },
  {
    number: "05",
    metaphor: "La fiesta parfaite !",
    title: "Une croissance appréciée",
    result: "Un système qui apprend, mesure et évolue avec votre activité.",
    details: ["Conversion", "Analytics", "Optimisation", "Nouveaux canaux"],
  },
];

export const method: MethodStep[] = [
  { title: "Vous avez une idée", body: "On clarifie l'ambition, le marché, les contraintes et ce qui doit exister en premier." },
  { title: "Nous définissons le territoire", body: "On choisit les noms, les messages, les routes et les fondations de votre identité numérique." },
  { title: "Nous construisons la présence", body: "On assemble le site, les pages, les formulaires, les preuves et les points de conversion." },
  { title: "Nous automatisons", body: "On connecte les outils utiles pour réduire les tâches répétitives et garder le contrôle." },
  { title: "Nous développons", body: "On active l'acquisition, les contenus et les boucles de croissance qui font venir les bons visiteurs." },
  { title: "Nous faisons évoluer", body: "On mesure, améliore et prépare les prochaines briques sans casser ce qui fonctionne." },
];

export const environments: Environment[] = [
  {
    name: "Just Hustelin'",
    eyebrow: "Attention",
    description: "L'univers qui attire l'œil, crée le signal et transforme une marque en conversation.",
    role: ["Contenus qui accrochent", "Angles provocateurs", "Formats sociaux"],
    tone: "Street, drôle, tranchant",
    accent: "acid",
    cta: "Créer le signal",
  },
  {
    name: "C'est Pas Faux...",
    eyebrow: "Clarté",
    description: "L'espace qui rend les sujets complexes compréhensibles, rassurants et vendables.",
    role: ["Pédagogie", "Offres structurées", "Livrables lisibles"],
    tone: "Clair, sérieux, accessible",
    accent: "fire",
    cta: "Rendre simple",
    image: "/assets/cpf.webp",
  },
  {
    name: "PureOwner.com",
    eyebrow: "Propriété",
    description: "La vision premium de l'identité numérique, de la donnée personnelle et du patrimoine digital.",
    role: ["Identité souveraine", "Statut digital", "Web de demain"],
    tone: "Élégant, calme, aspirationnel",
    accent: "champagne",
    cta: "Posséder ce qui compte",
    image: "/assets/pure-owner.webp",
  },
];

export const projects: Project[] = [
  {
    name: "PureOwner",
    category: "Identité numérique",
    description: "Un univers premium pour reprendre le contrôle de son identité, de ses accès et de ses actifs numériques.",
    image: "/assets/pure-owner.webp",
    cta: "Voir la vision",
  },
  {
    name: "Hempicurien",
    category: "Commerce & acquisition",
    description: "Structurer une présence claire pour un produit physique, avec narration, pages de conversion et acquisition.",
    cta: "Étude à venir",
  },
  {
    name: "Radio SXB",
    category: "Média & communauté",
    description: "Imaginer une plateforme de contenu capable de fédérer une audience et de transformer l'attention en valeur.",
    cta: "Étude à venir",
  },
  {
    name: "Chez Abdel",
    category: "Commerce local",
    description: "Transformer une activité de terrain en système visible, simple à comprendre et prêt à recevoir des clients.",
    cta: "Étude à venir",
  },
  {
    name: "Comptoir Libanais",
    category: "Restaurant & expérience",
    description: "Penser l'expérience digitale comme une extension du lieu : accueil, information, conversion et fidélisation.",
    cta: "Étude à venir",
  },
];

export const proofStats = [
  { value: "5", label: "projets en vitrine" },
  { value: "6", label: "briques système" },
  { value: "3", label: "univers produits" },
  { value: "∞", label: "automatisations possibles" },
];

export const tools = [
  "Identité digitale",
  "Site internet",
  "Automatisation",
  "Intelligence artificielle",
  "Acquisition",
  "CRM",
  "Dashboards",
  "Tunnels",
  "Paiements",
  "Web de demain",
];

export const partnerProfiles = [
  "Designers",
  "Développeurs",
  "Copywriters",
  "Experts acquisition",
  "No-code builders",
  "Consultants",
  "Spécialistes SEO",
  "Experts IA",
];

export const faqs = [
  {
    question: "Lazy App est une agence web ?",
    answer: "Non. Nous sommes un atelier numérique : nous construisons l'ensemble du système qui permet à une idée d'exister, de vendre et d'évoluer.",
  },
  {
    question: "Est-ce uniquement pour les projets Web3 ?",
    answer: "Non. Le Web3 fait partie de notre vision, mais notre travail commence toujours par le concret : identité, présence, outils, acquisition et automatisation.",
  },
  {
    question: "Que reçoit un entrepreneur au final ?",
    answer: "Un système exploitable : une identité claire, un site crédible, des outils connectés, des parcours de conversion et une méthode pour faire évoluer l'ensemble.",
  },
  {
    question: "Peut-on commencer petit ?",
    answer: "Oui. La bonne approche consiste souvent à construire une première base solide, puis à ajouter les briques qui créent vraiment de la valeur.",
  },
];

export const siteDescription =
  "Lazy App est un atelier numérique premium qui construit des systèmes complets pour les entrepreneurs.";
