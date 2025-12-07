
const API_KEY = "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";

async function testApi() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Test Script"
      },
      body: JSON.stringify({
        "model": "tngtech/deepseek-r1t2-chimera:free",
        "messages": [
          {
            "role": "user",
            "content": "Hello, are you working?"
          }
        ]
      })
    });

    if (!response.ok) {
        console.error("Status:", response.status);
        const text = await response.text();
        console.error("Body:", text);
    } else {
        const data = await response.json();
        console.log("Success:", JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testApi();
