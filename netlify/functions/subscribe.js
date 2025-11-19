export async function handler(event, context) {
  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: "OK"
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Method Not Allowed"
    };
  }

  const { email } = JSON.parse(event.body || "{}");

  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: "Invalid email"
    };
  }

  // Trigger GitHub Action
  const response = await fetch(
    "https://api.github.com/repos/namrataniraula/velvet-afterthoughts/dispatches",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github.everest-preview+json",
        Authorization: `token ${process.env.SUBSCRIBE_PAT}`
      },
      body: JSON.stringify({
        event_type: "new_subscription",
        client_payload: { email }
      })
    }
  );

  const text = await response.text();
  console.log("GitHub response:", response.status, text);

  return {
    statusCode: response.ok ? 200 : response.status,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: response.ok ? "ok" : text
  };
}
