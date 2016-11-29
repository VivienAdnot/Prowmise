import { Prowmise } from '../../src/prowmise'
import { State } from '../../src/prowmise'

export function prowmiseSpec() {
    describe("Prowmise", () => {
        let instance:Prowmise;

        beforeEach(function() {
            instance = new Prowmise(function(resolve, reject) {

            });
        })

        it("should accept new", () => {
            expect(instance).toBeDefined;
        })

        it("should trigger callback onFulfill", (done:Function) => {
            instance.done({
                onFulfilled: done,
                onRejected: () => {}
            });            
        })
    });
}