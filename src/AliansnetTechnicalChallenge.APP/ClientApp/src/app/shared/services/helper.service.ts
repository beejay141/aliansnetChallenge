import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class HelperService {
  constructor(public snackBar: MatSnackBar) { }


  GetLocalStorageData(key : string) {
    return localStorage.getItem(key);
  }

  SetLocalStorageData(key: string, data: any){
    localStorage.setItem(key,data);
  }

  RemoveLocalStorageData(key:string){
    localStorage.removeItem(key);
  }

  openSnackbar(message:string, actionLabel:string = undefined, extraClasses : string[] = undefined){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    config.panelClass = extraClasses;
    this.snackBar.open(message, actionLabel, config);
  }

}
