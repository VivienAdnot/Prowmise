import { Concept } from '../../src/concept'

export function conceptSpec() {
    describe("concept", () => {
        let instance:Concept;

        beforeEach(function() {
            instance = new Concept((resolve) => window.setTimeout(resolve(100), 200));            
        })

        it("should accept new", () => {
            expect(instance).toBeDefined;
        })
    });
}