import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookiesService, CookiesOptions } from '@ngx-utils/cookies';

const IP = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

@Injectable({
    providedIn: 'root'
})
export class AppCookieService {
    public cookieOptions: CookiesOptions;

    private expireCookie = new Date();
    private domainCookie;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject('environments') private environments: any,
        private _cookiesService: CookiesService
    ) {
        this.domainCookie = this.environments.domain_cookie || '.uper.me';

        this.initCookie();
    }

    initCookie() {
        if (isPlatformBrowser(this.platformId)) {
            this.cookieOptions = {
                expires: this.expireCookie,
                domain: window.location.hostname === 'localhost' || IP.test(window.location.hostname) ? window.location.hostname : this.domainCookie,
                path: '/',
                secure: false,
                httpOnly: false
            };
        }
    }

    // REMOVE TODOS OS COOKIES EXISTENTES*********************************************************
    deleteAllCookies() {
        this._cookiesService.removeAll();
    }

    // COOKIE *************************************************************************
    setCookie(cookieVal, cookieName, expire = (24 * 60 * 60 * 1000)) {
        if (isPlatformBrowser(this.platformId)) {
            this.expireCookie.setTime(this.expireCookie.getTime() + expire);
            this.cookieOptions.expires = this.expireCookie;
            this._cookiesService.putObject(cookieName, cookieVal, this.cookieOptions);
        }
    }
    getCookie(cookieName): any {
        if (isPlatformBrowser(this.platformId)) {
            return this._cookiesService.getObject(cookieName);
        }
        return undefined;
    }
    deleteCookie(cookieName) {
        if (isPlatformBrowser(this.platformId)) {
            this._cookiesService.remove(cookieName, { domain: this.cookieOptions.domain });
        }
    }
}
