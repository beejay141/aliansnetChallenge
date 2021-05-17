import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HelperService {
  constructor() { }


  GetLocalStorageData(key : string) {
    return localStorage.getItem(key);
  }

  SetLocalStorageData(key: string, data: any){
    localStorage.setItem(key,data);
  }

}
