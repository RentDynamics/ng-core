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
        define(["require", "exports", "rxjs/Rx", "@angular/core", "@angular/http", "../../helpers", "./auth.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("rxjs/Rx");
    var core_1 = require("@angular/core");
    var http_1 = require("@angular/http");
    var helpers_1 = require("../../helpers");
    var auth_service_1 = require("./auth.service");
    var ApiService = (function () {
        function ApiService(authService, http) {
            this.authService = authService;
            this.http = http;
        }
        ApiService.prototype.get = function (endpoint, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            var url = this.getHost() + endpoint;
            var headers = this.authService.getAuthHeaders(endpoint);
            return this.http.get(url, helpers_1.extend({
                headers: headers
            }, options))
                .map(function (response) {
                return response[responseType]();
            });
        };
        ApiService.prototype.put = function (endpoint, body, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            var url = this.getHost() + endpoint;
            var headers = this.authService.getAuthHeaders(endpoint, body);
            return this.http.put(url, body, helpers_1.extend({
                headers: headers
            }, options))
                .map(function (response) {
                return response[responseType]();
            });
        };
        ApiService.prototype.post = function (endpoint, body, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            var url = this.getHost() + endpoint;
            var headers = this.authService.getAuthHeaders(endpoint, body);
            return this.http.post(url, body, helpers_1.extend({
                headers: headers
            }, options))
                .map(function (response) {
                return response[responseType]();
            });
        };
        ApiService.prototype.postWithoutAuth = function (endpoint, body, options, responseType) {
            if (options === void 0) { options = {}; }
            if (responseType === void 0) { responseType = 'json'; }
            var url = this.getHost() + endpoint;
            var headers = this.authService.getAuthHeadersWithoutAuth(endpoint, body);
            return this.http.post(url, body, helpers_1.extend({
                headers: headers
            }, options))
                .map(function (response) {
                return response[responseType]();
            });
        };
        ApiService.prototype.delete = function (endpoint, options) {
            if (options === void 0) { options = {}; }
            var url = this.getHost() + endpoint;
            var headers = this.authService.getAuthHeaders(endpoint);
            return this.http.delete(url, helpers_1.extend({
                headers: headers
            }, options));
        };
        ApiService.prototype.errorHandler = function (error) {
            /* todo: make this a lot better (abstract out to @rd/core exception-handler.service or something) */
            var logError = (error && error.json ? error.json().error_message : error);
            console.error('errorHandler()', logError);
        };
        ApiService.prototype.getHost = function () {
            return this.authService.getHost();
        };
        ApiService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [auth_service_1.AuthService, http_1.Http])
        ], ApiService);
        return ApiService;
    }());
    exports.ApiService = ApiService;
});
//# sourceMappingURL=api.service.js.map