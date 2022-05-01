import { Component } from '@angular/core';
import { AnimalsService } from './core/services/http/animals.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'amazon-ec2-toggle';
  constructor(private animalService: AnimalsService) {

  }
  animals = []
  ngOnInit() {
  }
  getAnimals() {
    this.animalService.get()
      .subscribe((resp: any) => {
        this.animals = resp
      })
  }
}
