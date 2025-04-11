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

  // running this file as mjs file bc I was getting errors when trying to put await when calling the animalPromises
  // function. An alternative to making this an mjs file is to run the code inside an IIFE

  async function animalPromises(providersList) {
    try {
      return Promise.all(providersList.map(async (provider) => provider()));
    } catch (error) {
      console.error('There was an error getting the provider')
      return [];
    }
  }
  try {
    const animals = await animalPromises(providers);
    const newAnimalList = animals
      .flat()
      .sort((a, b) => a.position - b.position)
      .map((animal) => animal.value);
    console.log(newAnimalList);
  } catch (error) {
    console.log(`There was an error: ' + ${error}`);
  }
}
