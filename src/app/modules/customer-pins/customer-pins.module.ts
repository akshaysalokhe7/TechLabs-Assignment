import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';
import { AddPinComponent } from './add-pin/add-pin.component';



@NgModule({
  declarations: [
    AddCustomerComponent,
    AddPinComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule
  ],
  exports:[
    AddCustomerComponent,
    AddPinComponent
  ]
})
export class CustomerPinsModule { }
