function add(x) {
  if (arguments.length > 1) {
    let sum = 0;

    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum;
  }
  return (y) => {
    return x + y;
  };
}

// this same doesn't work with arrow function function  expression

console.log(add(10)(20));
console.log(add(10, 20));
