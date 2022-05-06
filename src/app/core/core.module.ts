import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XhrInterceptor } from './intercepts/xhr.interceptor';
import { AnimalsService } from './services/http/animals.service';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from './services/toast.service';

import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    ApiService,
    AnimalsService,
  ]
})
export class CoreModule { }
