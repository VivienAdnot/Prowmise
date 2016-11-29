/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var prowmiseSpec_1 = __webpack_require__(1);
	prowmiseSpec_1.prowmiseSpec();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var prowmiseTest_1 = __webpack_require__(2);
	function prowmiseSpec() {
	    describe("Prowmise", function () {
	        var instance;
	        beforeEach(function () {
	            instance = new prowmiseTest_1.Prowmise(function (resolve, reject) {
	            });
	        });
	        it("should accept new", function () {
	            expect(instance).toBeDefined;
	        });
	        it("should trigger callback onFulfill", function (done) {
	            instance.done({
	                onFulfilled: done,
	                onRejected: function () { }
	            });
	        });
	    });
	}
	exports.prowmiseSpec = prowmiseSpec;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	;
	var Prowmise = (function () {
	    function Prowmise(action) {
	        this._state = 0;
	        this._value = null;
	        this._handlers = new Array();
	        this.doResolve(action, this.resolve, this.reject);
	    }
	    Prowmise.prototype.done = function (handlers) {
	        this.handle(handlers);
	    };
	    Prowmise.prototype.fulfill = function (result) {
	        this._state = 1;
	        this._value = result;
	        this._handlers.forEach(this.handle);
	        this._handlers = null;
	    };
	    Prowmise.prototype.reject = function (error) {
	        this._state = 2;
	        this._value = error;
	        this._handlers.forEach(this.handle);
	        this._handlers = null;
	    };
	    Prowmise.prototype.resolve = function (result) {
	        try {
	            var then = this.getThen(result);
	            if (then) {
	                this.doResolve(then.bind(result), this.resolve, this.reject);
	                return;
	            }
	            this.fulfill(result);
	        }
	        catch (e) {
	            this.reject(e);
	        }
	    };
	    Prowmise.prototype.getThen = function (value) {
	        var t = typeof value;
	        if (value && (t === "object" || t === "function")) {
	            var then = value.then;
	            if (typeof then === "function") {
	                return then;
	            }
	        }
	        return null;
	    };
	    Prowmise.prototype.doResolve = function (action, onFulfilled, onRejected) {
	        var done = false;
	        var callbackOnFulfilled = function (value) {
	            if (done) {
	                return;
	            }
	            done = true;
	            onFulfilled(value);
	        };
	        var callbackOnRejected = function (reason) {
	            if (done) {
	                return;
	            }
	            done = true;
	            onRejected(reason);
	        };
	        try {
	            action(callbackOnFulfilled, callbackOnRejected);
	        }
	        catch (ex) {
	            if (done) {
	                return;
	            }
	            done = true;
	            onRejected(ex);
	        }
	    };
	    Prowmise.prototype.handle = function (handler) {
	        switch (this._state) {
	            case 0:
	                this._handlers.push(handler);
	                break;
	            case 1:
	                handler.onFulfilled(this._value);
	                break;
	            case 2:
	                handler.onRejected(this._value);
	                break;
	        }
	    };
	    return Prowmise;
	}());
	exports.Prowmise = Prowmise;


/***/ }
/******/ ]);
//# sourceMappingURL=tests.js.map