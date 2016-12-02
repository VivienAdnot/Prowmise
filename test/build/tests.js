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
	var prowmise_1 = __webpack_require__(2);
	function prowmiseSpec() {
	    describe("Prowmise", function () {
	        var instance;
	        beforeEach(function () {
	            instance = new prowmise_1.Prowmise(function (resolve, reject) { return resolve(100); });
	        });
	        it("should trigger callback onFulfill", function (done) {
	            instance.done(done, function () { });
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
	    function Prowmise(executor) {
	        this._executor = executor;
	        this._state = 0;
	        this._value = null;
	        this._handlers = new Array();
	        this.initialize();
	    }
	    Prowmise.prototype.initialize = function () {
	        try {
	            this._executor(this.fulfill.bind(this), this.reject.bind(this));
	        }
	        catch (e) {
	            this.reject(e);
	        }
	    };
	    Prowmise.prototype.done = function (onFulfilled, onRejected) {
	        this.handle({
	            onFulfilled: onFulfilled.bind(this),
	            onRejected: onRejected.bind(this)
	        });
	    };
	    Prowmise.prototype.fulfill = function (result) {
	        var _this = this;
	        this._state = 1;
	        this._value = result;
	        this._handlers.forEach(function (value) { return _this.handle(value); });
	        this._handlers = null;
	    };
	    Prowmise.prototype.reject = function (error) {
	        var _this = this;
	        this._state = 2;
	        this._value = error;
	        this._handlers.forEach(function (value) { return _this.handle(value); });
	        this._handlers = null;
	    };
	    Prowmise.prototype.handle = function (handlers) {
	        switch (this._state) {
	            case 0:
	                this._handlers.push(handlers);
	                break;
	            case 1:
	                handlers.onFulfilled(this._value);
	                break;
	            case 2:
	                handlers.onRejected(this._value);
	                break;
	        }
	    };
	    return Prowmise;
	}());
	exports.Prowmise = Prowmise;


/***/ }
/******/ ]);
//# sourceMappingURL=tests.js.map