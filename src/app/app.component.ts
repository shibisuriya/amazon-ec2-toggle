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
  data: any = null
  cron_expression = null;
  time_components: any = null;
  EC2_timer: any = null;
  time: any = null
  ngOnInit() {
  }
  getAnimals() {
    this.animalService.get()
      .subscribe((resp: any) => {
        this.data = resp.middle_ware_data
        this.EC2_timer = this.data.EC2_timer
        this.cron_expression = this.data.cron_expression
        this.time_components = this.data.time_components
        this.time = this.data.time

      }, err => {
        this.data = null;
      })
  }
}
