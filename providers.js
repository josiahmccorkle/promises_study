/* This exercise is meant to leverage promises and async programming

Given the following unmodifiable list of "providers", write an async function that logs
to the console results in ascending position order.

Requirements:
  * The providers must start concurrently, not waiting for the previous ones.
  * All the providers should run.
  * Result should only contain values, thus the expected result is: ["cat", "bird", "alligator", "dog"]
*/

{
  const providers = [
    async function provider1() {
      return [
        {
          value: "cat",
          position: 1,
        },
        {
          value: "dog",
          position: 4,
        },
      ];
    },
    async function provider2() {
      return [
        {
          value: "bird",
          position: 2,
        },
      ];
    },
    async function provider3() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              value: "alligator",
              position: 3,
            },
          ]);
        }, 1000);
      });
    },
  ];

  (async function() {
    let results = [];
    const resolvedPromise = await Promise.all(providers.map(async (prov) => prov()));
    results = resolvedPromise
              .flat()
              .sort((a, b) => a.position - b.position)
              .map(item => item.value);

    console.log('results', results);

  })();
}
