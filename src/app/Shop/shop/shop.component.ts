import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { ServicesService } from 'src/app/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {


  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalItems: number = 0;
  products: any = []
  constructor(
    public router:Router,
    public ds: ServicesService
    ){ 
     
  }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    let data:any=new FormData();
    data.append('userId',localStorage.getItem('userId'))
    this.ds.getProducts(data).subscribe((response: any) => {
      this.products = response;
      this.totalItems = this.products.length;
    });
  }


  getPaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
    
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }
  
  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }


  AddRemoveWishlist(id:any)
  {
   let data:any=new FormData();
   data.append('pro_id',id);
   data.append('userId',localStorage.getItem('userId'));
   this.ds.AddRemoveWishlist(data).subscribe((response:any)=>{
    if(response ==1)
    {
      Swal.fire(
       'Success !',
       'Product Added to Wishlist'
      ).then(function(){
       location.reload();
      });
    }
    if(response ==0)
    {
      Swal.fire(
        'Success',
        'Product Removed From Wishlist'
      ).then(function(){
        location.reload();
      })
    }
   })

    
  }

}

