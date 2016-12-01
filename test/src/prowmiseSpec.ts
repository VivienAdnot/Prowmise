// import { Prowmise } from '../../src/prowmise'
// import { State } from '../../src/prowmise'

// export function prowmiseSpec() {
//     describe("Prowmise", () => {
//         let instance:Prowmise;

//         beforeEach(function() {
//             instance = new Prowmise((resolve, reject) => window.setTimeout(resolve(100), 200));            
//         })

//         it("should accept new", () => {
//             expect(instance).toBeDefined;
//         })

//         it("should trigger callback onFulfill", (done:Function) => {
//             instance.done(
//                 done, // onFulfilled
//                 () => {} // onRejected
//             );            
//         })
//     });
// }