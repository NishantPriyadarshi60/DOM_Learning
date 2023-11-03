console.log('person1: shows ticket');
console.log('person2: shows ticket');

const promiseWifeBringingTickets = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ticket');
  }, 3000);
});

const getPopcorn = promiseWifeBringingTickets.then((t) => {
  console.log('wife: I have the tickets');
  console.log('husband: we should go in');
  console.log('wife: no, I am hungry');
  return new Promise((resolve) => resolve(`${t} popcorn`));
});

const getButter = getPopcorn.then((t) => {
  console.log('husband: I got some popcorn');
  console.log('husband: we should go in');
  console.log('wife: I need butter on my popcorn');
  return new Promise((resolve) => resolve(`${t} butter`));
});

async function getColdDrinks() {
  const butterWithPopcorn = await getButter;
  console.log('husband: I got butter on the popcorn');
  console.log('husband: we should go in');
  console.log('wife: I need cold drinks');
  return `${butterWithPopcorn} cold drinks`;
}

getColdDrinks().then((t) => {
  console.log(t);
});

console.log('person4: shows ticket');
console.log('person5: shows ticket');
