import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Customer, Pin } from '../types/main-types';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) {
    console.log("Service Created");
  }


  /**
  * Set contries from API to localstorage
  * @return {Observable}
  */
  setContries(){
    return this.http.get("https://api.first.org/data/v1/countries").pipe(map((data:any)=>data.data),tap((data:any)=>{
      localStorage.setItem("countries",JSON.stringify(data));
    }));
  }

  /**
  * get contries from localstorage if not present then call setContries
  * @return {Observable}
  */
  getCountries(){
    let countries = localStorage.getItem("countries");
    if(countries) {
      return of(JSON.parse(countries));
    } else {
      return this.setContries();
    }
  }

  /**
  * add customers to localstorage
  * @param {Customer} customerObj
  * @return {void}
  */
  addCustomer(customerObj:Customer):void{
    let customers = localStorage.getItem("customers");
    let arrCustomer: Customer[] = [];
    if(customers) {
      arrCustomer = JSON.parse(customers) as Customer[];
    }
    arrCustomer.push(customerObj);
    localStorage.setItem("customers",JSON.stringify(arrCustomer));
  }

  /**
  * add pin to localstorage
  * @param {Pin} pinObj
  * @return {void}
  */
  addPin(pinObj:Pin):void{
    let pins = localStorage.getItem("pins");
    let arrPins: Pin[] = [];
    if(pins) {
      arrPins = JSON.parse(pins) as Pin[];
    }
    arrPins.push(pinObj);
    localStorage.setItem("pins",JSON.stringify(arrPins));
  }

  /**
  * get pins from localstorage
  * @return {Pin[]}
  */
  getPins():Pin[]{
    let pins:string = localStorage.getItem("pins");
    if(pins) {
      return JSON.parse(pins) as Pin[];
    } else {
      return [];
    }
  }

  /**
  * get customers from localstorage
  * @return {Customer[]}
  */
  getCustomers():Customer[]{
    let customers:string = localStorage.getItem("customers");
    if(customers) {
      return JSON.parse(customers) as Customer[];
    } else {
      return [];
    }
  }
  
}
