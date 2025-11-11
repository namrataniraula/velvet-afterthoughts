import csv, os, smtplib
from email.mime.text import MIMEText
from email.utils import formatdate
SMTP_HOST = os.environ["SMTP_HOST"]
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USERNAME = os.environ["SMTP_USERNAME"]
SMTP_PASSWORD = os.environ["SMTP_PASSWORD"]
FROM_EMAIL = os.environ["FROM_EMAIL"]
SUBJECT_PREFIX = os.environ.get("SUBJECT_PREFIX", "Newsletter")
# Simple HTML template (customize later)
HTML_TEMPLATE = """
<html>
  <body>
    <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.6; max-width:640px; margin:auto;">
      <h2 style="margin:0 0 12px 0">{subject}</h2>
      <p>Hi, a new post just dropped:</p>
      <p><a href="{post_url}">{post_title}</a></p>
      <hr/>
      <p style="font-size:12px;color:#666">
        You’re receiving this because you subscribed to {brand}. 
        <a href="{unsubscribe_url}">Unsubscribe</a>
      </p>
    </div>
  </body>
</html>
"""
def send_email(to_email, subject, html):
    msg = MIMEText(html, "html", "utf-8")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["Date"] = formatdate(localtime=True)
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as s:
        s.starttls()
        s.login(SMTP_USERNAME, SMTP_PASSWORD)
        s.sendmail(FROM_EMAIL, [to_email], msg.as_string())
def main():
    post_title = os.environ.get("POST_TITLE", "New newsletter")
    post_url = os.environ.get("POST_URL", "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/")
    brand = SUBJECT_PREFIX
    unsubscribe_url = os.environ.get("UNSUBSCRIBE_URL", post_url)  # replace later
    subject = f"{SUBJECT_PREFIX}: {post_title}"
    with open("subscribers.csv", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = (row.get("email") or "").strip()
            if not email:
                continue
            html = HTML_TEMPLATE.format(
                subject=subject,
                post_url=post_url,
                post_title=post_title,
                brand=brand,
                unsubscribe_url=unsubscribe_url
            )
            send_email(email, subject, html)
if __name__ == "__main__":
    main()
