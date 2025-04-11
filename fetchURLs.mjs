// Challenge:

// You have an array of URLs, each pointing to a JSON resource. Your task is to fetch all URLs concurrently and log the responses in the order they are received.

// Requirements:
// 	1.	All fetch requests should start at the same time.
// 	2.	Responses should be logged in the order they are received, not in the order they were requested.
// 	3.	If a request fails, handle the error and log "Error fetching URL" instead of failing the whole operation.

// Starter Code:
const urls = [
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

// Your solution here
async function getURLPromises(urlList) {
    try {
        return Promise.all(urlList.map(async url => await fetch(url)))
    } catch(error) {
        const message = await Promise.reject(new Error(400));
        return message;
    }
}


try {
    const responses = await getURLPromises(urls);
    console.log(responses.length)

    const results = responses
        .map(async response => {
            return await response.json()
        })

        console.log(results)

} catch(error) {
    console.log('there was an error...')
}
