//https://www.promisejs.org/implementing/

export const enum State { Pending = 0, Fulfilled = 1, Rejected = 2};

interface IProwmiseAction {
    (resolve:Function, reject:Function) : any;
}

interface IHandlers {
    onFulfilled: Function,
    onRejected: Function
}

export class Prowmise {
    private _state: State;
    private _value: any;
    private _handlers: Array<IHandlers>;

    constructor(action:IProwmiseAction) {
        this._state = State.Pending;
        this._value = null;
        this._handlers = new Array<IHandlers>();

        this.doResolve(action, this.resolve, this.reject);
    }

    public done(handlers:IHandlers): void {
        this.handle(handlers);
    }

    private fulfill(result: any): void {
        this._state = State.Fulfilled;
        this._value = result;

        this._handlers.forEach(this.handle);
        this._handlers = null;
    }

    private reject(error: string, self:any) : void {
        self._state = State.Rejected;
        self._value = error; // useless ?

        self._handlers.forEach(self.handle);
        self._handlers = null;
    }
    
    private resolve(result: any, self:any) {
        try {
            const then = self.getThen(result);
            
            if(then) {
                self.doResolve(then.bind(result), self.resolve, self.reject);
                return;
            }

            self.fulfill(result);
        } catch(e) {
            self.reject(e, self);
        }
    }

    private getThen(value: any): Function {
        let t = typeof value;

        if(value && (t === "object" || t === "function")) {
            var then = value.then;
            if(typeof then === "function") {
                return then;
            }
        }

        return null;
    }

    private doResolve(action:Function, onFulfilled:Function, onRejected:Function) {
        let done: boolean = false;
        const self = this;

        const callbackOnFulfilled = function(value: any) {
            if(done) {
                return;
            }

            done = true;
            onFulfilled(value, self);
        };

        const callbackOnRejected = function(reason: string) {
            if(done) {
                return;
            }

            done = true;
            onRejected(reason, self);
        };

        try {
            action(callbackOnFulfilled, callbackOnRejected);
        } catch(e) {
            if(done) {
                return;
            }

            done = true;
            onRejected(e, self);
        }
    }

    private handle(handlers: IHandlers) {
        switch(this._state) {
            case State.Pending:
                this._handlers.push(handlers);
                break;

            case State.Fulfilled:
                handlers.onFulfilled(this._value);
                break;

            case State.Rejected:
                handlers.onRejected(this._value);
                break;
        }
    }
}