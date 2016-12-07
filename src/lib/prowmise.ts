//https://www.promisejs.org/implementing/

export const enum State { Pending = 0, Fulfilled = 1, Rejected = 2};

interface IResolvable {
    (resolve:Function, reject:Function) : any;
}

interface IHandlers {
    onFulfilled: Function,
    onRejected: Function
}

interface Thenable {
    then(): any;
}

function isThenable(value: any): value is Thenable {
    return (<Thenable>value).then !== undefined;
}

export class Prowmise {
    private _state: State;
    private _value: any;
    private _handlers: Array<IHandlers>;
    private _executor:IResolvable;

    constructor(executor:IResolvable) {
        this._executor = executor;
        this._state = State.Pending;
        this._value = null;
        this._handlers = new Array<IHandlers>();

        this.initialize();
    }

    public done(onFulfilled: Function, onRejected: Function): void {
        this.handle({
            onFulfilled: onFulfilled.bind(this),
            onRejected: onRejected.bind(this)
        });
    }

    public then(onFulfilled: Function, onRejected: Function): Prowmise {
        return new Prowmise((resolve : Function, reject : Function) => this.done(
            (result:any) => resolve(onFulfilled(result)),
            (error:string) => resolve(onRejected(error))
        ));
    }

    private initialize() {
        try {
            this._executor(this.fulfill.bind(this), this.reject.bind(this));
        } catch(e) {
            this.reject(e);
        }
    }    

    private fulfill(result: any): void {
        this._state = State.Fulfilled;
        this._value = result;

        this._handlers.forEach((value:IHandlers) => this.handle(value));
        this._handlers = null;
    }

    private reject(error?: string) : void {
        this._state = State.Rejected;
        this._value = error; // useless ?

        this._handlers.forEach((value:IHandlers) => this.handle(value));
        this._handlers = null;
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