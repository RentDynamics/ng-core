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
        define(["require", "exports", "@angular/core", "@angular/http", "@angular/http", "rxjs/Observable", "./auth-service-config"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var http_1 = require("@angular/http");
    var http_2 = require("@angular/http");
    var Observable_1 = require("rxjs/Observable");
    var auth_service_config_1 = require("./auth-service-config");
    var AuthService = (function () {
        function AuthService(config, http) {
            this.config = config;
            this.http = http;
            var test = {};
            this.formatPayload(test);
        }
        Object.defineProperty(AuthService.prototype, "authToken", {
            get: function () {
                return this.config.authToken;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthService.prototype, "secretKey", {
            get: function () {
                return this.config.secretKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuthService.prototype, "userId", {
            get: function () {
                return this.config.userId;
            },
            enumerable: true,
            configurable: true
        });
        AuthService.prototype.formatPayload = function (payload) {
            var formattedPayload = {};
            var self = this;
            if (typeof payload === undefined || payload === null) {
                formattedPayload = null;
            }
            else if (Array.isArray(payload)) {
                formattedPayload = [];
                for (var i = 0; i < payload.length; i++) {
                    formattedPayload[i] = self.formatPayload(payload[i]);
                }
            }
            else {
                Object.keys(payload).sort().forEach(function (k, v) {
                    if (typeof (payload[k]) == 'object') {
                        formattedPayload[k] = self.formatPayload(payload[k]);
                    }
                    else if (typeof (payload[k]) == 'string') {
                        formattedPayload[k] = payload[k].replace(/ /g, '');
                    }
                    else {
                        formattedPayload[k] = payload[k];
                    }
                });
            }
            return formattedPayload;
        };
        AuthService.prototype.getNonce = function (timestamp, url, payloadStr) {
            var nonceStr = timestamp + url;
            if (typeof payloadStr !== 'undefined') {
                nonceStr += payloadStr;
            }
            var shaObj = new jsSHA('SHA-1', 'TEXT');
            shaObj.setHMACKey(this.config.secretKey, 'TEXT');
            shaObj.update(nonceStr);
            return shaObj.getHMAC('HEX');
        };
        AuthService.prototype.getAuthHeaders = function (url, payload) {
            var headers = new http_1.Headers();
            if (typeof payload !== "undefined") {
                payload = this.formatPayload(payload);
            }
            var timestamp = Date.now();
            var nonce = this.getNonce(timestamp, url, JSON.stringify(payload));
            headers.append('Authorization', 'TOKEN ' + this.config.authToken);
            headers.append('x-rd-api-key', this.config.apiKey);
            headers.append('x-rd-api-nonce', nonce);
            headers.append('x-rd-timestamp', timestamp.toString());
            return headers;
        };
        AuthService.prototype.getAuthHeadersWithoutAuth = function (url, payload) {
            var headers = new http_1.Headers();
            if (typeof payload !== "undefined") {
                payload = this.formatPayload(payload);
            }
            var timestamp = Date.now();
            var nonce = this.getNonce(timestamp, url, JSON.stringify(payload));
            headers.append('x-rd-api-key', this.config.apiKey);
            headers.append('x-rd-api-nonce', nonce);
            headers.append('x-rd-timestamp', timestamp.toString());
            return headers;
        };
        AuthService.prototype.logout = function () {
            this.config.authToken = null;
            this.config.userId = null;
            window.sessionStorage.removeItem('rdUserAuthToken');
            window.sessionStorage.removeItem('rdUserId');
        };
        AuthService.prototype.login = function (user) {
            var _this = this;
            //Reset authToken
            this.config.authToken = null;
            //Encrypt password
            var shaObj = new jsSHA('SHA-1', 'TEXT');
            shaObj.update(user.password);
            user.password = shaObj.getHash('HEX');
            //Send request
            var endpoint = '/auth/login';
            var url = this.getHost() + endpoint;
            return this.http.post(url, user)
                .toPromise()
                .then(function (res) {
                _this.loginCallback(res);
            });
        };
        AuthService.prototype.ssoLogin = function (token) {
            var _this = this;
            //Reset authToken
            this.config.authToken = null;
            //Send request
            var endpoint = '/auth/sso_login';
            var body = {
                sso_token: token
            };
            var url = this.getHost() + endpoint;
            var headers = this.getAuthHeadersWithoutAuth(endpoint, body);
            return this.http.post(url, body, { headers: headers }).flatMap(function (result) {
                var response = _this.loginCallback(result);
                return Observable_1.Observable.from([response]);
            });
        };
        AuthService.prototype.loginCallback = function (res) {
            var response = res.json ? res.json() : res;
            this.config.authToken = response.token;
            this.config.userId = response.userId;
            window.sessionStorage.setItem('rdUserAuthToken', this.config.authToken);
            window.sessionStorage.setItem('rdUserId', this.config.userId);
            return response;
        };
        AuthService.prototype.isAuthenticated = function () {
            return this.config.authToken ? true : false;
        };
        AuthService.prototype.forgotPassword = function (username) {
            var user = { username: username };
            var endpoint = '/auth/reset_password';
            var url = this.getHost() + endpoint;
            var headers = this.getAuthHeadersWithoutAuth(endpoint, user);
            return this.http.post(url, user, { headers: headers })
                .map(function (response) { return response.json(); });
        };
        AuthService.prototype.getHost = function () {
            return this.config.host;
        };
        AuthService.prototype.errorHandler = function (error) {
            console.log(error);
        };
        AuthService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [auth_service_config_1.AuthServiceConfig, http_2.Http])
        ], AuthService);
        return AuthService;
    }());
    exports.AuthService = AuthService;
});
//# sourceMappingURL=auth.service.js.map