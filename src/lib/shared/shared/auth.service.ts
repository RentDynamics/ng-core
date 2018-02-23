import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Credentials } from './credentials';
import { AuthServiceConfig } from './auth-service-config';

declare var jsSHA: jsSHA.jsSHA;

@Injectable()
export class AuthService {
    get authToken() {
        return this.config.authToken;
    }

    get secretKey() {
        return this.config.secretKey;
    }

    get userId() {
        return this.config.userId;
    }

    constructor(public config: AuthServiceConfig, public http: Http) {
let test = {};
this.formatPayload(test);
    }

    formatPayload(payload: Object) {
        var formattedPayload = {};
        let self = this;

        if (typeof payload === undefined || payload === null) {
            formattedPayload = null;
        } else if (Array.isArray(payload)) {
            formattedPayload = [];

            for (let i = 0; i < payload.length; i++) {
                formattedPayload[i] = self.formatPayload(payload[i]);
            }
        } else {
            Object.keys(payload).sort().forEach(function(k, v) {
                if (typeof (payload[k]) == 'object') {
                    formattedPayload[k] = self.formatPayload(payload[k]);
                } else if (typeof (payload[k]) == 'string') {
                    formattedPayload[k] = payload[k].replace(/ /g, '');
                } else {
                    formattedPayload[k] = payload[k]
                }
            });
        }
        return formattedPayload;
    }

    getNonce(timestamp: number, url: string, payloadStr?: string) {
        var nonceStr = timestamp + url;

        if (typeof payloadStr !== 'undefined') {
            nonceStr += payloadStr;
        }
        var shaObj = new jsSHA('SHA-1', 'TEXT');
        shaObj.setHMACKey(this.config.secretKey, 'TEXT');
        shaObj.update(nonceStr);

        return shaObj.getHMAC('HEX');
    }

    getAuthHeaders(url: string, payload?: Object) {
        var headers = new Headers();
        if (typeof payload !== "undefined") {
            payload = this.formatPayload(payload);
        }
        var timestamp = Date.now();
        var nonce = this.getNonce(timestamp, url, JSON.stringify(payload));
        headers.append('Authorization', 'TOKEN ' + this.config.authToken);
        headers.append('x-rd-api-key', this.config.apiKey);
        headers.append('x-rd-api-nonce', nonce);
        headers.append('x-rd-timestamp', timestamp.toString());
        //headers.append('x-rd-super-key', 'rd-test-sk');
        return headers;
    }

    getAuthHeadersWithoutAuth(url: string, payload?: Object) {
        var headers = new Headers();
        if (typeof payload !== "undefined") {
            payload = this.formatPayload(payload);
        }
        var timestamp = Date.now();
        var nonce = this.getNonce(timestamp, url, JSON.stringify(payload));
        headers.append('x-rd-api-key', this.config.apiKey);
        headers.append('x-rd-api-nonce', nonce);
        headers.append('x-rd-timestamp', timestamp.toString());
        //headers.append('x-rd-super-key', 'rd-test-sk');
        return headers;
    }

    logout() {
        this.config.authToken = null;
        this.config.userId = null;
        window.sessionStorage.removeItem('rdUserAuthToken');
        window.sessionStorage.removeItem('rdUserId');
    }

    login(user: Credentials) {
        //Reset authToken
        this.config.authToken = null;
        //Encrypt password
        var shaObj = new jsSHA('SHA-1', 'TEXT');
        shaObj.update(user.password);
        user.password = shaObj.getHash('HEX');
        //Send request
        let endpoint = '/auth/login';
        let url = this.getHost() + endpoint;
        return this.http.post(url, user)
            .toPromise()
            .then((res) => {
                let response = res.json();
                this.config.authToken = response.token;
                this.config.userId = response.userId;
                window.sessionStorage.setItem('rdUserAuthToken', this.config.authToken);
                window.sessionStorage.setItem('rdUserId', this.config.userId);
            });
    }

    ssoLogin(token: string) {
        //Reset authToken
        this.config.authToken = null;
        //Send request
        let endpoint = '/auth/sso_login';
        let body = {
            sso_token: token
        };
        let url = this.getHost() + endpoint;
        let headers = this.getAuthHeadersWithoutAuth(endpoint, body);
        return this.http.post(url, body, {headers: headers}).flatMap((result) => {
            let response = result.json ? result.json() : result;
            this.config.authToken = response.token;
            this.config.userId = response.userId;
            window.sessionStorage.setItem('rdUserAuthToken', this.config.authToken);
            window.sessionStorage.setItem('rdUserId', this.config.userId);
            return Observable.from([ response ]);
        });
    }

    isAuthenticated() {
        return this.config.authToken ? true : false;
    }

    forgotPassword(username: string) {
        let user = { username: username };
        let endpoint = '/auth/reset_password';
        let url = this.getHost() + endpoint;
        let headers = this.getAuthHeadersWithoutAuth(endpoint, user);

        return this.http.post(url, user, { headers: headers })
            .map(response => response.json());
    }

    getHost() {
        return this.config.host;
    }

    errorHandler(error) {
        console.log(error);
    }

}