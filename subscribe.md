---
layout: default
title: Subscribe
---

<h2>Subscribe to Velvet Afterthoughts</h2>

<form id="subscribeForm">
  <input type="email" id="email" name="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe</button>
</form>

<p id="result"></p>

<script>
  document.getElementById("subscribeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    document.getElementById("result").textContent = "Submitting…";

    const response = await fetch("https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.everest-preview+json",
        "Authorization": "token YOUR_PAT_HERE",
      },
      body: JSON.stringify({
        event_type: "new_subscription",
        client_payload: { email: email }
      }),
    });

    if (response.ok) {
      document.getElementById("result").textContent = "Thank you! You’re subscribed.";
    } else {
      document.getElementById("result").textContent = "Something went wrong 😢";
    }
  });
</script>
