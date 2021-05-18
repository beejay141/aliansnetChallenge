export interface ProductModel {
  id : string,
  name: string,
  price : number,
  recordStatus : string,
  userId : string,
  user : ProductUserModel,
  createdAt : Date,
  UpdatedAt : Date
}

export interface ProductUserModel{
   id : string,
   userName : string,
   firstName : string,
   lastName : string
}
