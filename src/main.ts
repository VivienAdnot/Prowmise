import { Prowmise } from './prowmise'

let instance1 = new Prowmise(function(resolve, reject) {
    window.setTimeout(resolve(10), 1000);
});

instance1.done({
    onFulfilled: () => console.log("instance1 onFulfilled"),
    onRejected: () => console.log("instance1 onRejected")
});

let instance2 = new Prowmise(function(resolve, reject) {
    window.setTimeout(reject(), 3000);
});

instance2.done({
    onFulfilled: () => console.log("instance2 onFulfilled"),
    onRejected: () => console.log("instance2 onRejected")
});