var app = app;

console.log(app.counter.getCurrentCount());

for (let x = 0; x < 10; x++) {
    app.counter.increment();  
}

console.log(app.counter.getCurrentCount());

let counter1 = app.counterCreator();
let counter2 = app.counterCreator();

console.log(counter1.getCurrentCount());
console.log(counter2.getCurrentCount());

for (let x = 0; x < 5; x++) {
    counter1.increment();  
}

for (let x = 0; x < 15; x++) {
    counter2.increment();  
}

console.log(counter1.getCurrentCount());
console.log(counter2.getCurrentCount());

