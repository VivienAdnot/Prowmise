import { Prowmise } from '../../src/lib/prowmise'
import { State } from '../../src/lib/prowmise'

export function prowmiseSpec() {
    describe("Prowmise", () => {
        let instance:Prowmise;

        beforeEach(function() {
            instance = new Prowmise((resolve:any, reject:any) => resolve(100));            
            //instance = new Prowmise((resolve:any, reject:any) => window.setTimeout(resolve(100), 200));            
        })

        /*it("should accept new", () => {
            expect(instance).toBeDefined;
        })*/

        it("should trigger callback onFulfill", (done:any) => {
            instance.done(
                done, // onFulfilled
                () => {} // onRejected
            );            
        })
    });
}