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
import { ToastService } from '../services/toast.service';

@Injectable()//{providedIn: 'root'}
export class XhrInterceptor implements HttpInterceptor {
  constructor(private lambda: LambdaService, private toast: ToastService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: any) => {
          // Http calls succeed...
          if (event instanceof HttpResponse) {
            // API call succeded...
            if (event.url == environment.lambda_url) {
              if (event.status == 200) {
                this.toast.showSuccess('Lambda Function', 'EC2 is is up! Hit refresh.')
              }
            } else {
              const message = event?.body?.middle_ware_data?.EC2_timer
              this.toast.showSuccess('EC2', message)
            }
          }
        }, (error: any) => {
          // Lambda URL...
          // Becareful! This piece of code can cause infinite looping...
          // If the lambda is also down (Not setup or configured) we will get status code = 0,
          // which will make us hit the lambda_url again... We don't want this behaviour...
          // So we check for error.url == environment.lambda_url
          if (error.url == environment.lambda_url) {
            if (error.status == 0) {
              this.toast.showError('Lambda Function', 'Unable to reach the AWS Lambda function. Contact Devops engineer for help.')
            } else {
              this.toast.showError('Lambda Function', 'HTTP call to Lambda function failed due to unknown reasons (Internal Server Error).')
            }
          }
          // EC2 URL...
          else {
            // Http call failed because of some reason...
            if (error.status == 0) { // EC2 is down...
              this.toast.showError('Browser', 'EC2 is down, trying to up the server using the lambda function.')
              this.lambda.up().subscribe(() => { })
            } else {
              this.toast.showError('EC2', 'The EC2 server is up and running, but the HTTP call to the API server failed due to unknown reasons.')
            }
          }
        })
      )

  };
}
