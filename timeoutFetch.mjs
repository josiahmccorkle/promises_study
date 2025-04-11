// Challenge: URL Fetch with Timeout

// Given a list of URLs, you need to fetch each URL concurrently with a timeout for each fetch. If a request takes longer than the timeout period, it should be rejected, and the program should log an error message.

// Requirements:
// 	•	You need to implement a function fetchWithTimeout(url, timeout) that:
// 	•	Fetches the URL.
// 	•	Rejects if the fetch takes longer than the specified timeout (in milliseconds).
// 	•	The program should fetch all URLs concurrently, but if any request times out, log an error message for that URL.
// 	•	If all fetches are successful, log the results.

// Example:
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

// Implement the solution here

/**
 *     setTimeout(() => {
 *         return Promise.all(urlList.map(async (url) => await fetch(url)));
 *     }, timeout)
 */

async function fetchWithTimeout(urlList, timeout) {
  return await urlList.map(async (url) => {
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject('error'), timeout);
    });
    return Promise.race([fetch(url), timeoutPromise]);
  });
}

const promises = await fetchWithTimeout(urls, 1000);
const results = await Promise.allSettled(promises);
results.forEach(async (result, i) => {
  if (result.status === 'fulfilled') {
    const data = await result.value.json();
    console.log(`Success: `, data);
  } else {
    console.error(`Error fetching ${urls[i]}: `, result.reason.message);
  }
});
