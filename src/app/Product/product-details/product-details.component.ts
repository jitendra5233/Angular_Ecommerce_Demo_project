import { Component,Input, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
constructor(private router: ActivatedRoute,public ds:ServicesService,private route:ActivatedRoute, private formBuilder: FormBuilder){
}
quantityValue :any= 1;
ProductId: any = 0;
  singleProduct: any = '';
  getAllCartProduct :any = [];
  allProducts: any = '';
  index :any=0;
  
ngOnInit(): void {
this.router.params.subscribe((params: any) => {
  this.ProductId = params.id;
  this.getSingleProducts(params.id);
  this.GetallCartProduct();
});

}

getSingleProducts(id:any) {
  let data = new FormData();
  data.append('id', id);
  this.ds.getSingleProducts(data).subscribe((response: any) => {
    this.singleProduct = response[0];
  });
}

AddtoCart(type:string)
  {
   type==='add' ? this.quantityValue++ :this.quantityValue--;
  }


  GetallCartProduct(){
    let data:any=new FormData();
    data.append('userId',localStorage.getItem('userId'));
    this.ds.GetallCartProduct(data).subscribe((response :any) =>{
    this.getAllCartProduct=response;
    })
  }

addCartProduct(proid:any)
{
let data:any = new FormData();
  data.append('id',proid);
  data.append('Quantity',this.quantityValue)
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
  
