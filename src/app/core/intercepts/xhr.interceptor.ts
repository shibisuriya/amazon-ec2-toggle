import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LambdaService } from '../services/http/lambda.service';
import { environment } from '../../../environments/environment';
@Injectable()//{providedIn: 'root'}
export class XhrInterceptor implements HttpInterceptor {
  constructor(private lambda: LambdaService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: any) => {

          // Http calls succeed...
          if (event instanceof HttpResponse) {
            console.log(event.status);

          }
        }, (error: any) => {
          // Lambda URL...
          // Becareful! This piece of code can cause infinite looping...
          // If the lambda is also down (Not setup or configured) we will get status code = 0,
          // which will make us hit the lambda_url again... We don't want this behaviour...
          // So we check for error.url == environment.lambda_url
          if (error.url == environment.lambda_url) {
            if (error.status == 200) {
              console.log('Trying to up the EC2 server...')
            } else {
              console.log('Unable to trigger the EC2 server...')
            }
          }
          // EC2 URL...
          else {
            // Http call failed because of some reason...
            if (error.status == 0) { // EC2 is down...
              return this.lambda.up().subscribe((resp: any) => {
                console.log(resp)

              })
              // this.lambda.up().subscribe((res: any) => {
              //   console.log(res)
              // })
              // console.error('EC2 down!')
            } else {
              console.error('Someother error!')
            }
          }
        })
      )

  };
}
