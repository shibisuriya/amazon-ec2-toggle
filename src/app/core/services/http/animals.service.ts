import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Animal } from '../../models/animal.model';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private apiService: ApiService) { }

  get(): Observable<Animal[]> {
    return this.apiService.get('/animals/')
  }
}
