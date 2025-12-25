---
layout: page
title: Subscribe
permalink: /subscribe/
---

<form id="subscribeForm">
  <input id="email" type="email" placeholder="you@example.com" required />
  <button type="submit">Subscribe</button>
</form>

<p id="message"></p>

<script src="{{ '/public/js/subscribe.js' | relative_url }}"></script>
<script>
  document.getElementById("subscribeForm").addEventListener("submit", subscribe);
</script>
