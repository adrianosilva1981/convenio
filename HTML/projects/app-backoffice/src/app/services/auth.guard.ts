import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'lib-services';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _commonService: CommonService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        try {
            if (this._commonService.getUserToken()) {
                return true;
            }

            this._router.navigate(['/login']);
            return false;
        } catch (error) {
            this._router.navigate(['/login']);
            return false;
        }

    }
}
