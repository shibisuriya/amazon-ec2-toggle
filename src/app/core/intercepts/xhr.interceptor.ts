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
import { SnackBarService } from '../services/snack-bar.service';
@Injectable()//{providedIn: 'root'}
export class XhrInterceptor implements HttpInterceptor {
  constructor(private _snackBar: SnackBarService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: any) => {
          // Http calls succeed...
          if (event instanceof HttpResponse) {
            console.log(event.status);
          }
        }, (error: any) => {
          // Http call failed because of some reason...
          if (error.status == 0) { // EC2 is down...
            // this._snackBar.open('Unable to reach EC2', 'Hello')
            console.error('EC2 down!')
          } else {
            console.error('Someother error!')
          }
        })
      )

  };
}
