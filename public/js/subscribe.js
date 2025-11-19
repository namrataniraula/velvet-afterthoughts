// subscribe.js
async function subscribe(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const messageEl = document.getElementById("message");

  if (!email) {
    messageEl.textContent = "Please enter an email.";
    return;
  }

  messageEl.textContent = "Subscribing...";

  // Create a GitHub Issue via API
  const issueTitle = `New subscriber: ${email}`;
  const issueBody = `Email: ${email}\n\nAutomatically created by subscribe.js`;

  const response = await fetch(
    "https://api.github.com/repos/namrataniraula/velvet-afterthoughts/issues",
    {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${GITHUB_SUBSCRIBE_TOKEN}`, // You will set this in GitHub Pages script injection
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ["subscriber"]
      })
    }
  );

  if (response.ok) {
    messageEl.textContent = "Subscribed successfully!";
  } else {
    const err = await response.json();
    console.error(err);
    messageEl.textContent = "Error subscribing. Try again.";
  }
}
