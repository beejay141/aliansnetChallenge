import { AddProductModel } from './../models/products/add-product.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../models/products/product.model';
import { BaseAPIResponse } from 'src/app/shared/models/responses/base-api.reponse';
import { ProductAuditModel } from '../models/products/product-audit.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  base_url: string;

  constructor(private httpClient: HttpClient, @Inject('ORIGIN_URL') originUrl: string) {
    this.base_url = originUrl;
  }

  CreateProduct(data: AddProductModel) {
    return this.httpClient.post<BaseAPIResponse<ProductModel>>(`${this.base_url}/products/create-new-product`, data);
  }

  EditProduct(id: string, data: AddProductModel) {
    return this.httpClient.put<BaseAPIResponse<ProductModel>>(`${this.base_url}/products/update-product/${id}`, data);
  }

  RemoveProduct(id: string) {
    return this.httpClient.delete<BaseAPIResponse<ProductModel>>(`${this.base_url}/products/remove-product/${id}`);
  }

  GetProducts() {
    return this.httpClient.get<BaseAPIResponse<ProductModel[]>>(`${this.base_url}/products`);
  }

  GetUserProducts(id:string) {
    return this.httpClient.get<BaseAPIResponse<ProductModel[]>>(`${this.base_url}/products/user/${id}`);
  }


  GetProductAudits(id: string) {
    return this.httpClient.get<BaseAPIResponse<ProductAuditModel[]>>(`${this.base_url}/productaudits/product/${id}`);
  }

}
