import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppCookieService } from './app-cookie.service';
import { BroadcastEventService } from './broadcast-event.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _document: HTMLDocument;

  constructor(
    private _httpClient: HttpClient,
    private _appCookieService: AppCookieService,
    @Inject('environments') private environments: any,
    @Inject(DOCUMENT) private document: any
  ) {
    this._document = document as HTMLDocument;
  }


  // Emite os eventos do breadcrumb para abiblioteca***************************
  addBreadCrumb(obj) {
    BroadcastEventService.event('onBreadCrumb').emit(obj);
  }

  stripHtml(html: string) {
    const temporalDivElement = document.createElement('div');
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || '';
  }

  formatDate(date: any, datetime: boolean = false) {
    const _date = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const _dateTime = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const options = datetime ? _dateTime : _date;
    const newDate = new Date(date);

    return newDate.toLocaleString('pt-BR', options);
  }

  private isOS() {
    return navigator.userAgent.match(/ipad|iphone/i);
  }

  readJson(jsonFile: string) {
    return new Promise((resolve, reject) => {
      this._httpClient.get(jsonFile).subscribe(
        (response: any) => {
          resolve(response);
        },
        err => {
          resolve(false);
        }
      );
    });
  }

  copyToClipboard(text: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    if (this.isOS()) {
      const range = document.createRange();
      range.selectNodeContents(selBox);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      selBox.setSelectionRange(0, 999999);
    } else {
      selBox.focus();
      selBox.select();
    }
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  deleteAllCookie() {
    this._appCookieService.deleteAllCookies();
  }

  // Controle dos cookies de autenticação*****************************************
  getCookieAuth() {
    return this._appCookieService.getCookie(this.environments.cookie_auth);
  }
  setCookieAuth(value) {
    this._appCookieService.setCookie(value, this.environments.cookie_auth);
  }
  deleteCookieAuth() {
    this._appCookieService.deleteCookie(this.environments.cookie_auth);
  }
  // ******************************************************************************


  // Retorna os dados do usuário logado no cookie**********************************
  getUserData() {
    const cookieVal = this.getCookieAuth();
    if (cookieVal) {
      return cookieVal;
    }
    return false;
  }

  // Retorna o token do usuário no cookie*******************************************
  getUserToken() {
    const cookieVal = this.getUserData();
    if (cookieVal && Object(cookieVal.jwt)) {
      return cookieVal.jwt;
    }
  }

  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  b64toBlob(b64Data, contentType, sliceSize, name) {
    b64Data = b64Data.split(',')[1];
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    const file = new File([blob], name, { type: contentType, lastModified: Date.now() });
    return file;
  }

  // ***************************************************************************************************************/
  // **************************************REQUISIÇÕES HTTP NA API**************************************************/
  // ***************************************************************************************************************/

  // Retorna o as regras do usuário**************************************************
  getUserRule() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', this.getUserToken());

    return this._httpClient.get(this.environments.url_api + 'users/rules', { headers });
  }

  getUserByID(id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('x-access-token', this.getUserToken());

    return this._httpClient.get(this.environments.url_api + 'users/id/' + id, { headers });
  }
}
