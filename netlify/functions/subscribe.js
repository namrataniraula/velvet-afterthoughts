export async function handler(event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { email } = JSON.parse(event.body || "{}");
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) return { statusCode: 400, body: "Invalid email" };

  const res = await fetch(
    "https://api.github.com/repos/namrataniraula/velvet-afterthoughts/dispatches",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.everest-preview+json",
        Authorization: `token ${process.env.SUBSCRIBE_PAT}`,
      },
      body: JSON.stringify({
        event_type: "new_subscription",
        client_payload: { email },
      }),
    }
  );

  return res.ok
    ? { statusCode: 200, body: "ok" }
    : { statusCode: res.status, body: await res.text() };
}
