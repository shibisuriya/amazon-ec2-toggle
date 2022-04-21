import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { XhrInterceptor } from './intercepts/xhr.interceptor';
import { AnimalsService } from './services/http/animals.service';
@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    ApiService,
    AnimalsService,
  ]
})
export class CoreModule { }
