import { NextResponse } from "next/server";
const required = ["name", "email", "phone", "activity", "goal", "message"] as const;
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  for (const key of required) if (typeof payload[key] !== "string" || !payload[key].trim()) return NextResponse.json({ error: "Merci de remplir les champs obligatoires." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) return NextResponse.json({ error: "Merci de saisir une adresse email valide." }, { status: 400 });
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "Le formulaire est prêt, mais le webhook de réception doit encore être configuré." }, { status: 503 });
  const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, source: "lazyapp.fr", sentAt: new Date().toISOString() }) }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ error: "Le service de réception ne répond pas. Vos informations restent dans le formulaire." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
