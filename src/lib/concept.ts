export class Concept {
    constructor(executor:any) {
        try {
            const self = this;

            const callback = function() {
                this.logSuccess();
            };         

            executor(callback.bind(this));
        } catch(e) {
            console.log("catch: " + e);
        }
    }

    private logSuccess() {
        console.log("success");
    }  
}