import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LambdaService {

  constructor(private _http: HttpClient) { }
  up(): any {
    // To up the EC2 using lambda a function...
    // Browser -> Http request -> API gateway -> Lambda function -> EC2
    return this._http.get(environment.lambda_url)
  }
}



