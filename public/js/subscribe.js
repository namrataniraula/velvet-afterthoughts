async function subscribe(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message");
  msg.textContent = "Processing...";

  try {
    const res = await fetch("https://velvet-subscribers.nniroula111.workers.dev/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      msg.textContent = "Subscription failed. Try again.";
      return;
    }

    msg.textContent = "Subscribed successfully!";
  } catch (e) {
    msg.textContent = "Subscription failed. Try again.";
  }
}
