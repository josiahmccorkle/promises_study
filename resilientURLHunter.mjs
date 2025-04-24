// 1.	Given an array of URLs, fetch them all concurrently.
// 2.	Apply a timeout of 2 seconds per request using Promise.race.
// 3.	If a fetch fails or times out, retry up to 2 more times (3 total attempts max).
// 4.	Use Promise.allSettled to wait for all final attempts.
// 5.	After everything:
//          Log how many succeeded
//          How many failed completely
//          How many required retries

const urls = [
  "https://postman-echo.com/delay/0",
  "https://postman-echo.com/delay/2",
  "https://postman-echo.com/delay/3",
  "https://postman-echo.com/delay/4",
];
let retries = 0;
async function getURLPromises(urlList) {
  return urlList.map((url) => {
    const timeoutpromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("error"));
      }, 2000);
    });

    return retry(() => Promise.race([fetch(url), timeoutpromise]), 2);
  });
}

async function retry(fn, attempts) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (i === attempts - 1) throw error;
    }
  }
}

async function printResults(results) {
  let failedResponses = 0;
  let succeededResponses = 0;
  //this works bc for...of is async aware
  for (let result of results) {
    if (result.status === "fulfilled") {
      succeededResponses++;
      console.log(await result.value.json());
    } else {
      failedResponses++;
      console.log("failed: " + result.reason.message);
    }
  }

  // 5.	After everything:
  //          Log how many succeeded
  //          How many failed completely
  //          How many required retries

  //this works bc for...of is async aware
  console.log("succeededResponses:   " + succeededResponses);
  console.log("failedResponses:   " + failedResponses);
  console.log("retries:   " + retries);
}

const urlPromises = await getURLPromises(urls);
const results = await Promise.allSettled(urlPromises);
printResults(results);
