// 🧠 Scenario

// You’re working on a dashboard that fetches data from multiple APIs. To improve performance and reliability:
// 	•	You want to cache the response for each URL the first time it’s fetched.
// 	•	If the same URL is requested again, serve it from the cache, no fetch needed.
// 	•	Each fetch must timeout after 2 seconds.
// 	•	Each fetch should retry up to 2 times if it fails.
// 	•	After all requests, log:
// 	•	✅ How many URLs succeeded
// 	•	❌ How many failed
// 	•	🔁 How many retries happened
// 	•	📦 How many came from cache

// 🧪 Example Setup

const urls = [
  "https://postman-echo.com/delay/1",
  "https://postman-echo.com/delay/3", // will timeout
  "https://postman-echo.com/delay/0",
  "https://postman-echo.com/delay/2",
  "https://postman-echo.com/delay/1", // repeat from cache
];
const cache = {};
async function retry(fn, attempts = 2) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === attempts) {
        return error;
      }
    }
  }
}

async function getURLPromises(urlList) {
  return urlList.map(async (url) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Error: timeout")), 2000);
    });
    let responsePromise = fetch(url);
    if (cache[url]) {
        responsePromise = new Promise((resolve, reject) => {
            resolve(cache[url])
        })
    }
    const fetchWithTimeout = () => new Promise.race([responsePromise, timeoutPromise])
    const response = await retry(fetchWithTimeout, 2);
    cache[url] = res.clone();
    return response;
  });
}

const urlPromises = await getURLPromises(urls);
const results = await Promise.allSettled(urlPromises);
results
