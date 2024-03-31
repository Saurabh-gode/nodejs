var construtorFalse = new Boolean(0);

if (construtorFalse) {
  console.log("this is wrong because of typeCoercien it evaluavates to an object");
}

if (construtorFalse.valueOf()) {
  console.log("here the actual value is accessed via the method");
} else {
  console.log("here the actual value is accessed via the method evaluevated to false");
}
