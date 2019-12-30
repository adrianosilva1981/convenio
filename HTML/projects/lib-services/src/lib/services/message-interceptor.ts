import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppToastsService } from './app-toasts.service';
import { BroadcastEventService } from './broadcast-event.service';

@Injectable({
    providedIn: 'root'
})
export class MessageInterceptor implements HttpInterceptor {

    public userNameCompany: string;

    constructor(
        private _appToastsService: AppToastsService,
        @Inject('environments') private environments: any,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    // https://juristr.com/blog/2017/08/intercept-http-requests-in-angular/

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
            .do(evt => {
                if (evt instanceof HttpResponse) {
                }
            })
            .catch((err: any) => {
                let typeMessage = 'error';
                let titleMessage = 'Erro';
                let textMessage = 'Ocorreu um erro inesperado';
                
                if (isPlatformBrowser(this.platformId)) {
                    try {
                        if (err instanceof HttpErrorResponse) {
                            typeMessage = err.error.warn ? 'warn' : 'error';
                            titleMessage = typeMessage === 'warn' ? 'Atenção' : 'Erro';

                            if (Array.isArray(err.error[typeMessage])) {
                                textMessage = '';
                                err.error[typeMessage].forEach((element, idx) => {
                                    textMessage += (idx + 1) + ' - ' + element.message + '<br>';
                                });
                            } else {
                                textMessage = err.error[typeMessage].message;
                            }
                        }

                        this._appToastsService.addToast(typeMessage, titleMessage, textMessage);

                        if (err.error[typeMessage].relogin) {
                            BroadcastEventService.event('onInvalidToken').emit(true);
                        }

                    } catch (error) {
                        this._appToastsService.addToast(typeMessage, titleMessage, textMessage);
                    }
                }

                return Observable.throwError(err);
            });
    }

}
