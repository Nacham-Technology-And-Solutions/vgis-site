"use server";

import { company, whatsapp } from "@/content/site";

export type ContactState = { status: "idle" | "ok" | "error"; message?: string };

const clean = (v: FormDataEntryValue | null, max = 200) => String(v ?? "").trim().slice(0, max);
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Plans are attached to the email. Vercel caps a request at ~4.5 MB, so larger files go via a link or WhatsApp. */
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const ALLOWED = /\.(pdf|jpe?g|png|webp|dwg|dxf|zip|skp)$/i;

const fallback = `Please WhatsApp ${company.phones[0].display} or email ${company.emails.primary}`;

/**
 * Sends a project enquiry through Resend's HTTP API, plus an auto-reply to the enquirer.
 * Env (Vercel): RESEND_API_KEY, CONTACT_TO_EMAIL (comma-separated), CONTACT_FROM_EMAIL (verified domain),
 * optional CONTACT_REPLY_TO (where clients' replies to the auto-reply go; defaults to the site's main email).
 */
export async function sendEnquiry(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (clean(form.get("company_website"))) return { status: "ok" };

  const name = clean(form.get("name"), 120);
  const phone = clean(form.get("phone"), 40);
  const email = clean(form.get("email"), 160);
  const company_ = clean(form.get("company"), 160);
  const service = clean(form.get("service"), 80);
  const message = clean(form.get("message"), 5000);
  const plansLink = clean(form.get("plans_link"), 500);
  const offer = clean(form.get("offer"), 80);
  // Ad attribution captured client-side (utm_*, click IDs, audience, landing page)
  let attribution: Record<string, string> = {};
  try {
    attribution = JSON.parse(clean(form.get("attribution"), 1500) || "{}");
  } catch {}

  if (!name || !message) return { status: "error", message: "Please add your name and a short brief." };
  if (!phone && !email) return { status: "error", message: "Please add a phone number or email so we can reply." };
  if (phone && !/^[+\d][\d\s()-]{6,}$/.test(phone)) return { status: "error", message: "Please enter a valid phone number, e.g. +234 811 285 3404." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", message: "Please enter a valid email address." };

  const files = form.getAll("plans").filter((f): f is File => typeof f === "object" && f !== null && "size" in f && f.size > 0);
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > MAX_UPLOAD_BYTES) return { status: "error", message: "Files are over 4 MB in total. Please add a Google Drive or Dropbox link instead, or send them on WhatsApp." };
  if (files.some((f) => !ALLOWED.test(f.name))) return { status: "error", message: "Please upload PDF, image, DWG/DXF, SKP or ZIP files." };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_REPLY_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form is not configured: missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL");
    return { status: "error", message: `Our form is offline right now. ${fallback} and we will reply promptly.` };
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone || "-"],
    ["Email", email || "-"],
    ["Company", company_ || "-"],
    ["Service", service || "-"],
    ["Plans link", plansLink || "-"],
    ["Attached files", files.map((f) => f.name).join(", ") || "-"],
    ["Offer page", offer || "-"],
    ...Object.entries(attribution).map(([k, v]): [string, string] => [k, String(v).slice(0, 200)]),
  ];
  const waToLead = phone ? `https://wa.me/${phone.replace(/[^\d]/g, "").replace(/^0/, "234")}` : "";
  const html = `<h2>New project enquiry</h2><table>${rows
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(v)}</td></tr>`)
    .join("")}</table><p style="white-space:pre-wrap">${esc(message)}</p>${
    waToLead ? `<p><a href="${esc(waToLead)}">Reply on WhatsApp</a></p>` : ""
  }`;

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name.slice(0, 120), content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
  );

  const send = (body: object) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

  try {
    const res = await send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      ...(email ? { reply_to: email } : {}),
      subject: `${offer ? "Ad lead" : "Website enquiry"}: ${service || offer || "General"} from ${name}`,
      html,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
      ...(attachments.length ? { attachments } : {}),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  } catch (e) {
    console.error(e);
    return { status: "error", message: `We could not send your message. ${fallback}.` };
  }

  // Auto-reply to the enquirer (best effort: the lead is already delivered).
  if (email) {
    const first = esc(name.split(" ")[0]);
    try {
      const r = await send({
        from: CONTACT_FROM_EMAIL,
        to: [email],
        reply_to: CONTACT_REPLY_TO || company.emails.primary,
        subject: "We've received your brief | VGIS®",
        html: `<div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#000">
<p>Hello ${first},</p>
<p>Thank you for contacting VGIS. We've received your brief${service ? ` for <b>${esc(service)}</b>` : ""} and a member of our team will reply shortly.</p>
<p><b>Want to move faster?</b> Message us on WhatsApp and send your plans or drawings there:<br>
<a href="${whatsapp.url}" style="color:#B34700;font-weight:600">Chat on WhatsApp: ${whatsapp.display}</a></p>
<p>What happens next: we review your project, confirm the scope and deliverables with you, and send a quote before any production starts.</p>
<p>VGIS®, ${company.legalName}<br>${company.offices[0].streetAddress}, ${company.offices[0].addressLocality}<br><a href="https://3dvgis.com">3dvgis.com</a></p>
<p style="color:#4A4A4A;font-size:12px">${esc(company.tagline)}</p></div>`,
        text: `Hello ${name.split(" ")[0]},\n\nThank you for contacting VGIS. We've received your brief and will reply shortly.\n\nWant to move faster? Message us on WhatsApp: ${whatsapp.url} (${whatsapp.display})\n\nWe review your project, confirm the scope and send a quote before production starts.\n\nVGIS®, ${company.legalName}\nhttps://3dvgis.com`,
      });
      if (!r.ok) console.error("Auto-reply failed", r.status, await r.text());
    } catch (e) {
      console.error("Auto-reply failed", e);
    }
  }

  return { status: "ok", message: email ? "Thank you. Your brief has been received; check your inbox for a confirmation." : "Thank you. Your brief has been received and we will call or WhatsApp you shortly." };
}
