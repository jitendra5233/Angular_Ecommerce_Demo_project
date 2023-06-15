import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { response } from 'express';
import { ServicesService } from 'src/app/services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  Getiwishlistdata:any=[];
  constructor(public router:Router,public ds:ServicesService)
  {
    
    
  }
  ngOnInit(): void {
    this.GetWishlistData();
  }
  GetWishlistData()
  {
    let data:any=new FormData();
    data.append('userId',localStorage.getItem('userId'));
    this.ds.GetWishlistData(data).subscribe((response:any)=>{
     this.Getiwishlistdata=response;
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

  addCartProduct(proid:any)
{
let data:any = new FormData();
  data.append('id',proid);
  data.append('Quantity',1)
  data.append('userId',localStorage.getItem('userId'));
  this.ds.AddProducttoCart(data).subscribe((response: any) => {
    if(response ==1)
    {
      Swal.fire(
        'Success !',
        'Product Added to Cart'
      ).then(function(){ 
        location.reload();
        }
     );
    }
   
  });
}


}
