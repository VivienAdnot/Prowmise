import { Prowmise } from './prowmise'

let instance1 = new Prowmise((resolve, reject) => {
    window.setTimeout(() => {
        resolve(10)
    }, 1000);
});

instance1.done(
    () => console.log("instance1 onFulfilled"),
    () => console.log("instance1 onRejected")
);

let instance2 = new Prowmise(function(resolve, reject) {
    window.setTimeout(reject, 3000);
});

instance2.done(
    () => console.log("instance2 onFulfilled"),
    () => console.log("instance2 onRejected")
);

// import { Concept } from './concept'

// let instance = new Concept((resolve:Function) => window.setTimeout(resolve(100), 200));