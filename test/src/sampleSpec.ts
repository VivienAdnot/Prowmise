import { Sample } from '../../src/sample'

export function sampleSpec() {
    describe("SampleSpec", () => {
        it("should return hello with name", () => {
            let instance = new Sample();
            expect(instance.sayHello("typescript")).toBe("Hello typescript!");
        })

        var value:number = 0;

        it("takes a long time", function(done) {
            setTimeout(function() {
                done();
            }, 2000);
        });
    });
}