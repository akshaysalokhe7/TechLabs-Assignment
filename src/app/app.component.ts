import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './modules/customer-pins/add-customer/add-customer.component';
import { CustomerPinsModule } from './modules/customer-pins/customer-pins.module';
import { MainService } from './services/main.service';
import { AddPinComponent } from './modules/customer-pins/add-pin/add-pin.component';
import { Pin } from './types/main-types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomerPinsModule,NgbModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MainService]
})
export class AppComponent {
  title = 'TechLabs-Assignment';
  pins: Pin[] = [];

  constructor(private modalSevice: NgbModal, private mainService: MainService){
    this.mainService.getCountries().subscribe();
    this.pins = this.mainService.getPins();
  }

  addCustomer(){
    this.modalSevice.open(AddCustomerComponent, {backdrop:'static'});
  }

  addPin(){
    this.modalSevice.open(AddPinComponent, {backdrop:'static'}).closed.subscribe(data=>{
      this.pins = this.mainService.getPins();
    });
  }
}
