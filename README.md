# Lazy App

Site Next.js de production pour `www.lazyapp.fr`, deploye sur Cloudflare Workers avec `@opennextjs/cloudflare`.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
npm run deploy
```

`npm run deploy` execute `opennextjs-cloudflare build`, genere `.open-next/worker.js`, puis publie le Worker via Wrangler.

## Domaine production

Le domaine principal est :

- `https://www.lazyapp.fr`

Le domaine racine redirige vers le www :

- `https://lazyapp.fr` -> `https://www.lazyapp.fr`

Les deux hostnames sont declares comme Custom Domains Workers dans `wrangler.jsonc`.

## Variables et secrets

Le formulaire de contact utilise `CONTACT_WEBHOOK_URL`.

En production, creer le secret Cloudflare :

```bash
npx wrangler secret put CONTACT_WEBHOOK_URL
```

Sans ce secret, le formulaire reste protege mais renvoie une erreur de configuration.

## Validation avant production

Avant de remplacer le site actuel :

```bash
npm install
npm run lint
npm run build
npm run deploy -- --dry-run
```

Puis deployer :

```bash
npm run deploy
```

## DNS Cloudflare attendu

Les serveurs de noms du registrar doivent pointer vers Cloudflare. Dans Cloudflare, les Custom Domains Workers creent les enregistrements necessaires pour `www.lazyapp.fr` et `lazyapp.fr`.

Si une redirection Cloudflare separee est mise en place pour `lazyapp.fr`, conserver un enregistrement proxifie sur le domaine racine afin que Cloudflare puisse appliquer la redirection.
