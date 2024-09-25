import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../../services/main.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent{
  regionsData: any = {};
  contries: any =[];
  regions: any=[];
  customerForm: FormGroup;
  isSubmitted : boolean = false;
  activeModal = inject(NgbActiveModal);


  constructor(private mainService: MainService){
    this.mainService.getCountries().subscribe(data=>{ 
      this.regionsData = Object.entries(data).map(o=>o[1]);
      this.regions = [...new Set(this.regionsData.map((o:any)=>o.region))];
    });
    this.customerForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      region: new FormControl('', [Validators.required]),
      contry: new FormControl('', [Validators.required])
    });
  }
  
  /**
  * Call when customer form is submitted
  * @return {void}
  */
  onSubmit(){
    this.isSubmitted = true;
    if(this.customerForm.valid){
      this.mainService.addCustomer(this.customerForm.value);
      this.activeModal.close();
    }     
  }

  /**
  * Call when region is changed from dropdown
  * @return {void}
  */
  onRegionChange(event){
    if(event){
      let selectedRegion = event[0].value;
      this.contries = this.regionsData.filter(o=>o.region===selectedRegion).map(o=>o.country);
    }
  }

  /**
  * Call when user close this modal
  * @return {void}
  */
  onClose(){
    this.activeModal.close();
  }
}
