var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs/Rx", "@angular/core", "@angular/http", "./shared/api.service", "./rentplus-auth.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("rxjs/Rx");
    var core_1 = require("@angular/core");
    var http_1 = require("@angular/http");
    var api_service_1 = require("./shared/api.service");
    var rentplus_auth_service_1 = require("./rentplus-auth.service");
    var RentplusApiService = (function (_super) {
        __extends(RentplusApiService, _super);
        function RentplusApiService(authService, http) {
            return _super.call(this, authService, http) || this;
        }
        RentplusApiService.prototype.get = function (endpoint, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            return _super.prototype.get.call(this, endpoint, options).map(function (response) {
                return response[responseType]();
            });
        };
        RentplusApiService.prototype.put = function (endpoint, body, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            return _super.prototype.put.call(this, endpoint, body, options).map(function (response) {
                return response[responseType]();
            });
        };
        RentplusApiService.prototype.post = function (endpoint, body, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            return _super.prototype.post.call(this, endpoint, body, options).map(function (response) {
                return response[responseType]();
            });
        };
        RentplusApiService.prototype.postBlob = function (endpoint, body, options) {
            if (options === void 0) { options = {}; }
            return _super.prototype.post.call(this, endpoint, body, options);
        };
        RentplusApiService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [rentplus_auth_service_1.RentplusAuthService, http_1.Http])
        ], RentplusApiService);
        return RentplusApiService;
    }(api_service_1.ApiService));
    exports.RentplusApiService = RentplusApiService;
});
//# sourceMappingURL=rentplus-api.service.js.map