// var is function scoped
for (var x = 0; x < 5; x++) {
  var btn = document.createElement("button");
  btn.appendChild(document.createTextNode(`Button ${x}`));
  btn.addEventListener("click", () => {
    console.log(x);
  });

  document.body.appendChild(btn);
  document.body.appendChild(document.createElement("br"));
}

document.body.appendChild(document.createElement("hr"));

// let is blocked scoep
for (let x = 0; x < 5; x++) {
  const btn = document.createElement("button");
  btn.appendChild(document.createTextNode(`ButtonLet ${x}`));
  btn.addEventListener("click", () => {
    console.log(x);
  });

  document.body.appendChild(btn);
  document.body.appendChild(document.createElement("br"));
}
