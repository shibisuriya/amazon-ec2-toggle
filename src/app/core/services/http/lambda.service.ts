import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class LambdaService {

  constructor(private apiService: ApiService) { }

  up(): any {
    // To up the EC2 using lambda a function...
    // Browser -> Http request -> API gateway -> Lambda function -> EC2
    return this.apiService.getLambda('')
  }
}



