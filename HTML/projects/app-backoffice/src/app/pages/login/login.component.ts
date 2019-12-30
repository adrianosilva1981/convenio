import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'lib-services';
import { SharedService } from '@app-backoffice/services/shared.service';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-backoffice-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])
    ),
    password: new FormControl(
      { value: '', disabled: false }, Validators.compose([Validators.required, Validators.minLength(6)])
    )
  });

  constructor(
    private _sharedService: SharedService,
    private _commonService: CommonService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  submitLoginForm() {
    if (this.loginForm.valid) {
      this._sharedService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this._commonService.setCookieAuth(response);
          this._router.navigate(['/home']);
        }
      );
    }
  }

}
