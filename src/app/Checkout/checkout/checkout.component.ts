import { Component,Input, OnInit, Output } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';





@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  stripePromise: Promise<Stripe | null>;
  getAllCartProduct :any=[];
  total=0;
  ProductId: any = 0;
  count='';
  activeUser: any = [];
  activeWorkshop: any = [];

  bookingType = '';

  activeId: any = 0;
  cardHolderName: any = '';
  cardNo: any = '';
  exMonth: any = '';
  exYear: any = '';
  cvv: any = '';
  price: any = '';

  cardHolderNameErr: any = false;
  cardNoErr: any = false;
  exMonthErr: any = false;
  exYearErr: any = false;
  cvvErr: any = false;

  cardNoErr2: any = false;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public ds:ServicesService,
    private formBuilder: FormBuilder,
    public http:HttpClient,
    private spinner: NgxSpinnerService,
    
  ){
  
    this.stripePromise =loadStripe('pk_test_51JqwPVSBqQ3Slb1tCMS5Y9dNrvH8rGCgyGzTEpVTa9ZKw6gbP58DJ89hPwbjd2Ykj3sPS0DEA5swlF9Su6MLPQhF00xsFzjWQd');
  }

  cardElement: any;

  ngOnInit() :void{
    this.GetallCartProduct();
      this.getUserData();

  }


  getUserData() {
    let data:any = new FormData();
    data.append('token',localStorage.getItem('token'));
    this.ds.getProfile(data).subscribe((res: any) => {
        this.activeUser = res[0];
        console.log(this.activeUser);
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

  handlePayment(amount:any){
    let result = true;

    if (this.cardHolderName == '') {
      this.cardHolderNameErr = true;
      result = false;
    } else {
      this.cardHolderNameErr = false;
      result = true;
    }

    if (this.cardNo == '') {
      this.cardNoErr = true;
      result = false;
    } else {
      this.cardNoErr = false;
      result = true;
      if (JSON.stringify(this.cardNo).length == 18) {
        console.log('if', JSON.stringify(this.cardNo).length);
        this.cardNoErr2 = false;
        result = true;
      } else {
        console.log('else', JSON.stringify(this.cardNo).length);

        this.cardNoErr2 = true;
        result = false;
      }
    }

    if (this.exMonth == '') {
      this.exMonthErr = true;
      result = false;
    } else {
      this.exMonthErr = false;
      result = true;
    }

    if (this.exYear == '') {
      this.exYearErr = true;
      result = false;
    } else {
      this.exYearErr = false;
      result = true;
    }

    if (this.cvv == '') {
      this.cvvErr = true;
      result = false;
    } else {
      this.cvvErr = false;
      result = true;
    }

    if (result) {
      this.spinner.show();
      let data:any = new FormData();
      data.append('cno', this.cardNo);
      data.append('emonth', this.exMonth);
      data.append('eyear', this.exYear);
      data.append('cvv', this.cvv);
      data.append('boat',amount);

      this.ds.handlePayment(data).subscribe((res: any) => { 
        let payment_id = res.payment_method;
        let payment_intent = res.id;
        let data2:any = new FormData();
        data2.append('userId', localStorage.getItem('userId'));
        data2.append('payment_id', payment_id);
        data2.append('payment_intent_id', payment_intent);
        data2.append('price',amount);
        this.ds.savePaymentId(data2).subscribe((res2: any) => {
          this.spinner.hide();
          console.log(res.next_action.redirect_to_url.url);
          window.location.href = res.next_action.redirect_to_url.url;
        });
      });
    }
  }



  


}
