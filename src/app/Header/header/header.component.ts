import { Component,Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  GetSettingData :any=[];
  isLoggedIn = false;
  total=0;
  getAllCartProduct :any =[];
  ProductId: any = 0;
  count='';
  constructor(private router: ActivatedRoute,public ds:ServicesService,private route:ActivatedRoute, private formBuilder: FormBuilder){
  }

 ngOnInit(): void {
    this.GetallCartProduct();
    this.getSettingData();
    let locatdata=localStorage.getItem('token');
    if(locatdata != 'null')
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;

    }
  }

 
  
  DeleteCartProduct(id:any) {
    let data = new FormData();
    data.append('pro_id', id);
    this.ds.DeleteCartProduct(data).subscribe((response: any) => {
      if(response ==1)
      {
        Swal.fire(
          'Success !',
          'Product Deleted from Cart'
        ).then(function(){ 
          location.reload();
          }
       );
      }
    });
  }

 GetallCartProduct(){
  let data:any=new FormData();
  data.append('userId',localStorage.getItem('userId'));
  this.ds.GetallCartProduct(data).subscribe((response :any) =>{
  this.getAllCartProduct=response;
  this.total=response[response.length-1].total;
  this.count=response.length;
  
  }) 

}

Logout()
  {
    localStorage.setItem('token','null')
    this.isLoggedIn = false;
    window.location.href = '/acount';

  }
  getSettingData()
  {
    this.ds.getSettingData().subscribe((response:any)=>{
     this.GetSettingData=response[0];
     this.GetSettingData.ameneties = JSON.parse(this.GetSettingData.ameneties);
    })
  }
  UpdateProfile()
  {

  }
}
