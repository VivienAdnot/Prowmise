import { Prowmise } from '../../src/lib/prowmise'
import { State } from '../../src/lib/prowmise'

export function prowmiseSpec() {
    describe("Prowmise", () => {
        let instance:Prowmise;

        beforeEach(function() {
            instance = new Prowmise((resolve:any, reject:any) => resolve(100));            
        })

        it("should trigger callback onFulfill", (done:any) => {
            instance.done(
                done, // onFulfilled
                () => {} // onRejected
            );            
        })
    });
}