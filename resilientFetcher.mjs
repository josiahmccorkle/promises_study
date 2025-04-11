// You’re given a list of URLs (some fast, some slow, some broken). You want to fetch all of them with a timeout of 2 seconds per request.

// Requirements:
// 	1.	Each fetch must timeout after 2 seconds if the server doesn’t respond.
// 	2.	Use Promise.race to enforce that timeout per URL.
// 	3.	Use Promise.allSettled to handle all the race results without crashing on errors.
// 	4.	Print the JSON body of successful responses.
// 	5.	Count and log how many fetches failed (either due to timeout or other error).

// Bonus: Log how long each request took, from start to either fulfillment or rejection.

const urls = [
  "https://postman-echo.com/delay/0",
  "https://postman-echo.com/delay/2",
  "https://postman-echo.com/delay/3",
  "https://postman-echo.com/delay/4",
];

async function getUrlPromises(urlList) {
  return urlList.map((url) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), 2000);
    });
    return retry(() => Promise.race([fetch(url), timeoutPromise]), 2);
  });
}

async function retry(fn, attempts = 2) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === attempts - 1) throw err;
    }
  }
}


const urlPromises = await getUrlPromises(urls);
const settledList = await Promise.allSettled(urlPromises);
let failedResponses = 0;
for (const item of settledList) {
  if (item.status === "fulfilled") {
    console.log(await item.value.json());
  } else {
    failedResponses++;
    console.log("Failed:", item.reason.message);
  }
}

//this is safe bc for of loop is async aware
console.log(failedResponses);
