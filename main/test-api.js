const doFetch = global.fetch;

async function test() {
  const url =
    "https://completedoc-backend.onrender.com/api/auth/register-start";
  console.log("Fetching:", url);

  if (!doFetch) {
    console.error("Global fetch not found!");
    return;
  }

  try {
    const res = await doFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" }),
    });

    console.log("Status:", res.status, res.statusText);
    const text = await res.text();
    console.log("Body:", text);
    try {
      const json = JSON.parse(text);
      console.log("Parsed JSON:", json);
    } catch (e) {
      console.log("Not JSON");
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
