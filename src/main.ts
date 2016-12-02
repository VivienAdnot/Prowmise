import { Prowmise } from './lib/prowmise'

function longRunningFunction() {
    return new Prowmise((resolve, reject) => window.setTimeout(_ => resolve(10), 1000));
};

longRunningFunction()
.done(
    (result:any) => console.log("result: " + result),
    (error:any) => console.log("error: " + error)
);