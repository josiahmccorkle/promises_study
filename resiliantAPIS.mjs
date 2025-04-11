// 🧪 Practice Challenge: “Resilient APIs”

// You’re calling 5 different mock APIs. Some will fail. You want to:
// 	1.	Fire all fetches concurrently
// 	2.	Wait for all to finish (success or fail)
// 	3.	Log only the successful JSONs
// 	4.	Handle failures gracefully and count them

// Here’s your starting point:

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/invalid-url", // will fail
  "https://jsonplaceholder.typicode.com/posts/3",
  "https://jsonplaceholder.typicode.com/posts/4",
  "https://jsonplaceholder.typicode.com/invalid-url-2", // will fail
];

async function getUrlPromises(urlList) {
   return await urlList.map(url => fetch(url))
}

let rejectedCount = 0;
const urlPromises = await getUrlPromises(urls);
const results = await Promise.allSettled(urlPromises);
for (const result of results) {
    if (result.status === 'fulfilled') {
        console.log(await result.value.json())
    } else if (result.status === 'rejected') {
        rejectedCount++
    }
}
console.log(`Rejected requests: ${rejectedCount}`);