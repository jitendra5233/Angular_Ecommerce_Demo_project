import { Component,Input, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  getAllCartProduct :any=[];
  total=0;
  ProductId: any = 0;
  count='';
  constructor(private router: ActivatedRoute,public ds:ServicesService,private route:ActivatedRoute, private formBuilder: FormBuilder){
  }

  ngOnInit():void{
 this.GetallCartProduct();
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
}
