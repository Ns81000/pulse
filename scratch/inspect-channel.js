async function run() {
  const url = "https://d14c63magvk61v.cloudfront.net/strm/channels/9xjalwa/master_360_37583.ts";
  console.log(`Testing TS chunk CORS: ${url}`);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Origin: "http://localhost:3000",
      },
    });
    console.log(`Status: ${res.status} ${res.statusText}`);
    console.log("Headers:");
    for (const [k, v] of res.headers.entries()) {
      console.log(`  ${k}: ${v}`);
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
}

run();
