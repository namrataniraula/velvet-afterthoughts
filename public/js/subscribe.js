async function subscribe(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message");

  msg.textContent = "Processing...";

  const issueTitle = `New subscriber: ${email}`;
  const issueBody = `Email: ${email}`;

  const res = await fetch(
    "https://api.github.com/repos/namrataniraula/velvet-afterthoughts/issues",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GITHUB_SUBSCRIBE_TOKEN}`,
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ["subscriber"]
      })
    }
  );

  if (!res.ok) {
    msg.textContent = "Subscription failed. Try again.";
    return;
  }

  msg.textContent = "Subscribed successfully!";
}
