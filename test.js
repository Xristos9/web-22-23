const randomNumber = () => {

  return Math.floor(Math.random() * Math.floor(2));
};

// Usage: random number between 10 and 100.
// const n = randomNumber({ min: 0, max: 1 });
for (let i = 0; i < 100; i++) {
  console.log(randomNumber());
}
