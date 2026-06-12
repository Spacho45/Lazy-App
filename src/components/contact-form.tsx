"use client";
import { useState } from "react";
type Status = { kind: "idle" | "success" | "error"; message?: string };
const fields = [
  ["name", "Nom", "text", true], ["email", "Email", "email", true], ["phone", "Téléphone", "tel", true], ["activity", "Activité", "text", true],
  ["website", "Site actuel", "url", false], ["goal", "Objectif principal", "text", true], ["budget", "Budget approximatif", "text", false], ["urgent", "Besoin urgent", "text", false],
] as const;
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" }); const [pending, setPending] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setPending(true); setStatus({ kind: "idle" }); const form = event.currentTarget; const payload = Object.fromEntries(new FormData(form).entries());
    try { const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); const result = await response.json(); if (!response.ok) throw new Error(result.error); setStatus({ kind: "success", message: "Votre demande est partie. Nous revenons vers vous rapidement." }); form.reset(); } catch (error) { setStatus({ kind: "error", message: error instanceof Error ? error.message : "Impossible d'envoyer la demande pour le moment." }); } finally { setPending(false); }
  }
  return <form onSubmit={submit} className="glass grid gap-4 p-6 md:grid-cols-2" noValidate>{fields.map(([name, label, type, required]) => <label key={name} className="text-sm text-white/70">{label}{required && " *"}<input className="form-field mt-2" name={name} type={type} required={required} /></label>)}<label className="text-sm text-white/70 md:col-span-2">Message libre *<textarea className="form-field mt-2 min-h-36" name="message" required /></label><div className="md:col-span-2"><button className="quiet-cta disabled:opacity-50" disabled={pending}>{pending ? "Envoi..." : "Envoyer"}</button><p role="status" aria-live="polite" className={`mt-4 text-sm ${status.kind === "error" ? "text-orange-300" : "text-lime-200"}`}>{status.message}</p></div></form>;
}
