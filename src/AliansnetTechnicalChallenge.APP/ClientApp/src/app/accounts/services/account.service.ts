import { HelperService } from './../../shared/services/helper.service';
import { RegisterResponseModel } from './../models/response/register.response';
import { LoginResponse } from './../models/response/login.response';
import { LoginModel } from './../models/request/login.model';
import { BaseAPIResponse } from './../../shared/models/responses/base-api.reponse';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RegisterModel } from '../models/request/register.model';
import { LoginStatus } from '../models/login-status.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  base_url: string;

  constructor(private httpClient: HttpClient, @Inject('ORIGIN_URL') originUrl: string, private helperService: HelperService) {
    this.base_url = originUrl;
  }


  CreateAccount(data: RegisterModel) {
    return this.httpClient.post<BaseAPIResponse<RegisterResponseModel>>(`${this.base_url}/Account/create-user`, data);
  }


  Login(data: LoginModel) {
    return this.httpClient.post<BaseAPIResponse<LoginResponse>>(`${this.base_url}/auth/login`, data);
  }

  GetAuthStatus(): LoginStatus {
    let role = this.helperService.GetLocalStorageData("rm");
    let firstName = this.helperService.GetLocalStorageData("fn");
    let lastName = this.helperService.GetLocalStorageData("ln");

    let data: LoginStatus = {
      role,
      firstName,
      lastName,
      loggedIn: true
    };

    let token = this.helperService.GetLocalStorageData("tk");

    if (token === null) {
      data.loggedIn = false;
    }

    return data
  }



}
