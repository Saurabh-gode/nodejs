const promiseOne = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved1");
      // reject("promise rejected");
    }, 2000);
  });
};
const promiseTwo = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved2");
      // reject("promise rejected");
    }, 2000);
  });
};
const promiseThree = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved3");
      // reject("promise rejected");
    }, 2000);
  });
};

Promise.all([1, 2, Promise.reject("some rejection"), Promise.resolve(444)])
  .then((data) => {
    console.log(data);
  })
  .catch((e) => console.log(e));

// promiseOne.then((data) => {
//   console.log("then block!", data);
//   promiseTwo.then((data) => {
//     console.log(data);
//     promiseThree.then((data) => {
//       console.log(data);
//     });
//   });
// }); // callback hell

// async function promiseHandler() {
//   console.log("Before sync");
//   const prom1 = await promiseOne();
//   const prom2 = await promiseTwo();
//   const prom3 = await promiseThree();
//   console.log("After sync");
// }

// console.log(promiseHandler());
