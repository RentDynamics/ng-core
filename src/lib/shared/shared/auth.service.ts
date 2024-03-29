import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Http} from '@angular/http';
import {Observable, of, from} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Credentials} from './credentials';
import {AuthServiceConfig} from './auth-service-config';
import * as _jsSHA from 'jssha';

declare var jsSHA: _jsSHA.jsSHA;

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
        } else if (payload !== Object(payload)) {
            formattedPayload = payload;
        }
        else if (Array.isArray(payload)) {
            formattedPayload = [];

            for (let i = 0; i < payload.length; i++) {
                formattedPayload[i] = self.formatPayload(payload[i]);
            }
        } else {
            Object.keys(payload).sort().forEach(function (k, v) {
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
        /*
        we need to calculate the nonce on the encoded URL to allow special characters to work
        in REST calls; HOWEVER, rest-framework-simplify performs a replacement on pipe characters
        before calculating the nonce on the back-end:

        https://github.com/Skylude/django-rest-framework-signature/blob/b3d613079137b52f660b9f4f4076cac144d48037/rest_framework_signature/authentication.py#L132
        */
        const encodedUrl = encodeURI(url)
          .replace(/%7[Cc]/g, '|')
          .replace(/%20/g, ' ');

        var nonceStr = timestamp + encodedUrl;

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
        return headers;
    }

    logout() {
        this.config.authToken = null;
        this.config.userId = null;
        window.localStorage.removeItem('rdUserAuthToken');
        window.localStorage.removeItem('rdUserId');
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
                this.loginCallback(res);
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
        return this.http.post(url, body, {headers: headers}).pipe(flatMap((result) => {
            let response = this.loginCallback(result);
            return from([ response ]);
        }));
    }

    loginCallback(res) {
        let response = res.json ? res.json() : res;
        this.config.authToken = response.token;
        this.config.userId = response.userId;
        window.localStorage.setItem('rdUserAuthToken', this.config.authToken);
        window.localStorage.setItem('rdUserId', this.config.userId);
        return response;
    }

    isAuthenticated() {
        return this.config.authToken ? true : false;
    }

    forgotPassword(username: string) {
        let user = {username: username};
        let endpoint = '/auth/reset_password';
        let url = this.getHost() + endpoint;
        let headers = this.getAuthHeadersWithoutAuth(endpoint, user);

        return this.http.post(url, user, { headers: headers }).pipe(
            map(response => response.json())
        );
    }

    getHost() {
        return this.config.host;
    }

    getSvcRoute() {
        return this.config.serviceRoute ? this.config.serviceRoute : '';
    }

    errorHandler(error) {
        console.log(error);
    }

}
