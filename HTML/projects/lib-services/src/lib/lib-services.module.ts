import { NgModule } from '@angular/core';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AutofocusDirective } from './directives/auto-focus.directive';

import { GooglePlacesDirective } from './directives/google-places.directive';
import { ConversionPipe } from './pipes/conversion.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  imports: [
    BrowserCookiesModule.forRoot(),
    GrowlModule
  ],
  declarations: [
    ConversionPipe,
    SafeHtmlPipe,
    DateFormatPipe,
    AutofocusDirective,
    ClickOutsideDirective,
    GooglePlacesDirective,
  ],
  exports: [
    ConversionPipe,
    SafeHtmlPipe,
    DateFormatPipe,
    AutofocusDirective,
    ClickOutsideDirective,
    GooglePlacesDirective
  ],
  providers: [
    ConversionPipe,
    SafeHtmlPipe,
    DateFormatPipe,
    AutofocusDirective,
    ClickOutsideDirective,
    GooglePlacesDirective,
    MessageService
  ]
})
export class LibServicesModule {

  constructor() { }
}
