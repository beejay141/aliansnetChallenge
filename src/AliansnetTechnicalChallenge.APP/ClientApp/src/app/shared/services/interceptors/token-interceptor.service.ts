import { HelperService } from '../helper.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private helperService: HelperService;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.helperService = this.injector.get(HelperService);
    const token: string = this.helperService.GetLocalStorageData("tk");
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token || ""}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(request);
  }
}
