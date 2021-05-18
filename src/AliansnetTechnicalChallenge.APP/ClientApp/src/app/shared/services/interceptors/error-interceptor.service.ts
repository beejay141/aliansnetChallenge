import { HelperService } from './../helper.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private helperService: HelperService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).
      pipe(
        catchError((response: any) => {
          if (response instanceof HttpErrorResponse && response.status === 401) {
            this.helperService.RemoveLocalStorageData("tk");
            this.router.navigate(['/']);
          }
          return throwError(response);
        })
      )
  }
}
