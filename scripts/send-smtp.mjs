import fs from "node:fs";
import nodemailer from "nodemailer";

const {
  SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS,
  FROM_EMAIL, SITE_URL,
  SUBJECT, POST_URL
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !SUBJECT || !POST_URL) {
  throw new Error("Missing env vars. Check GitHub Secrets and workflow env.");
}

const csv = fs.readFileSync("data/subscribers.csv", "utf8").trim().split("\n");
const emails = csv
  .slice(1)
  .map(line => line.split(",")[0]?.replaceAll('"', "").trim())
  .filter(Boolean);

if (!emails.length) {
  console.log("No subscribers to send to.");
  process.exit(0);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465, // true for 465
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

const html = `
<div style="font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial; line-height:1.5">
  <h2>${SUBJECT}</h2>
  <p>New post is live:</p>
  <p><a href="${POST_URL}">${POST_URL}</a></p>
  <hr/>
  <p style="font-size:12px;color:#666">
    You’re receiving this because you subscribed on ${SITE_URL}.<br/>
    To unsubscribe, reply to this email with “unsubscribe”.
  </p>
</div>
`;

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

for (const to of emails) {
  console.log("Sending to:", to);
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: SUBJECT,
    html,
  });

  // tiny delay to be polite to SMTP servers
  await sleep(400);
}

console.log("Done.");
