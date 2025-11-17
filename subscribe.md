---
layout: default
title: Subscribe
---

---
layout: default
title: Subscribe
---

## Subscribe to Velvet Afterthoughts

Enter your email and click **Subscribe** to join the mailing list.

<form id="subscribeForm">
  <label for="email">Email address</label><br/>
  <input type="email" id="email" name="email" placeholder="you@example.com" required />
  <br/><br/>
  <button type="submit">Subscribe</button>
</form>

<p id="result"></p>

<script>
  const form = document.getElementById("subscribeForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    if (!email) {
      result.textContent = "Please enter an email.";
      return;
    }

    result.textContent = "Submitting…";

    try {
      const response = await fetch("https://velvet-afterthoughts.netlify.app/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        result.textContent = "Thank you! You’re subscribed. 💌";
        form.reset();
      } else {
        result.textContent = "Something went wrong. Please try again.";
      }
    } catch (err) {
      console.error(err);
      result.textContent = "Network error. Please try again.";
    }
  });
</script>
