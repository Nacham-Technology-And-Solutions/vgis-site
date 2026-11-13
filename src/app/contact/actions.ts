"use server";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string };

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Sends a project enquiry through Resend's HTTP API.
 * Required env (set in Vercel): RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * (CONTACT_FROM_EMAIL must be on a domain verified in Resend, e.g. "VGIS Website <web@3dvgis.com>").
 */
export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (clean(form.get("company_website"))) return { status: "ok" };

  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 160);
  const company = clean(form.get("company"), 160);
  const phone = clean(form.get("phone"), 40);
  const service = clean(form.get("service"), 80);
  const message = clean(form.get("message"), 5000);

  if (!name || !email || !message) return { status: "error", message: "Please add your name, email and a short brief." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Please enter a valid email address." };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form is not configured: missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return { status: "error", message: "Our form is offline right now. Please email 3d.vgis.ltd@gmail.com or WhatsApp +234 811 285 3404 and we will reply promptly." };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "-"],
    ["Phone", phone || "-"],
    ["Service", service || "-"],
  ];
  const html = `<h2>New project enquiry</h2><table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${esc(message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `Website enquiry: ${service || "General"} from ${name}`,
        html,
        text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    return { status: "ok", message: "Thank you. Your brief has been received and we will reply shortly." };
  } catch (e) {
    console.error(e);
    return { status: "error", message: "We could not send your message. Please email 3d.vgis.ltd@gmail.com or WhatsApp +234 811 285 3404." };
  }
}
