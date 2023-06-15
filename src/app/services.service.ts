import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {}
  baseurl = 'http://localhost/Gforce_29_05_2023/';


  getProducts(data:any) {
    return this.http.post(this.baseurl + 'api/get-all-products',data);
  }



  getSingleProducts(data: any) {
    return this.http.post(this.baseurl + 'api/get-single-products', data);
  }

  getAllBlogs() {
    return this.http.get(this.baseurl + 'api/getBlogs');
  }

  getAllBlogsSingle(data: any) {
    return this.http.post(this.baseurl + 'api/getAllBlogsSingle', data);
  }
  AddProducttoCart(data:any)
  {
    return this.http.post(this.baseurl + 'api/AddProducttoCart',data);
  }
  GetallCartProduct(data:any)
  {
    return this.http.post(this.baseurl + 'api/GetallCartProduct',data);
  }

  DeleteCartProduct(data:any)
  {
    return this.http.post(this.baseurl + 'api/DeleteCartProduct', data);
  }
  SubmitUser(data:any)
  {
    return this.http.post(this.baseurl + 'api/SubmitUser',data);
  }
  
  Login(data:any)
  {
    return this.http.post(this.baseurl + 'api/Login',data)
  }
  UpdateProfile(data:any)
  {
    return this.http.post(this.baseurl +'api/UpdateProfile',data);
  }
  GetProfile(data:any)
  {
    return this.http.post(this.baseurl + 'api/GetProfile',data);
  }
  ForgetPassword(data:any)
  { 
    return this.http.post(this.baseurl + 'api/ForgetPassword',data)
  }

  ValidateOtp(data:any)
  {
    return this.http.post(this.baseurl + 'api/ValidateOtp',data)
  }


  getSettingData()
  {
    return this.http.get(this.baseurl + 'api/getSettingData')

  }
  GetAllTeam()
  {
    return this.http.get(this.baseurl +'api/GetAllTeam');
  }
  GetHomeBlog()
  {
    return this.http.get(this.baseurl + 'api/GetHomeBlog')
  }

  ContactData(data:any)
  {
    return this.http.post(this.baseurl +'api/sendcontactmail',data)
  }

  UpdatePassword(data:any)
  {
    return this.http.post(this.baseurl + 'api/UpdatePassword',data)
  }
  AddRemoveWishlist(data:any)
  {
    return this.http.post(this.baseurl +'api/AddRemoveWishlist',data)

  }
  GetWishlistData(data:any)
  {
    return this.http.post(this.baseurl +'api/GetWishlistData',data)
  }
  Submitpayment(data:any)
  {
    return this.http.post(this.baseurl + 'api/payments',data)
  }
  getProfile(data: any) {
    return this.http.post(this.baseurl + 'api/getProfile', data);
  }

  handlePayment(data: any) {
    return this.http.post(this.baseurl + 'api/payment', data);
  }
  savePaymentId(data: any) {
    console.log(data);
    
    return this.http.post(this.baseurl + 'api/savePayment', data);
  }

}
