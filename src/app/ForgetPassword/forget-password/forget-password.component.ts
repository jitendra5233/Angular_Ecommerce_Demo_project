import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  email :any=''
  otp:any=''
  password :any=''
  hidePassword=true;
  hidemail=false;
  hideotp =true;
  constructor(
    private router: ActivatedRoute,
    public ds: ServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}


  ForgetPassword()
  {
    let data=new FormData();
    data.append('email',this.email);
    this.ds.ForgetPassword(data).subscribe((response:any)=>{
    if(response ==1)
    {
      this.hidemail=true;
      this.hideotp=false;
      Swal.fire(
        'Success !',
        'Opt Send Successfully'
      )
    }
    if(response == 0)
    {
      this.hidemail=false;
      this.hideotp=true;
      Swal.fire(
       'Error !',
       'Wrong Email'
      )
    }
    })

  }

  ValidateOtp()
  {
    let data=new FormData();
    data.append('otp',this.otp);
    data.append('email',this.email)
    this.ds.ValidateOtp(data).subscribe((response:any)=>{
     this.hidemail=true;
     this.hideotp=true;
     this.hidePassword=false;
     if(response ==1)
     {
      Swal.fire(
        'Success !',
        'Opt Validate Successfully'
      )
     }
     if(response ==0){
      this.hidemail=true;
      this.hideotp=false;
      this.hidePassword=true;
      Swal.fire(
        'Error !',
        'Wrong OTP'
      )
     }
     
    })

  }


  UpdatePassword()
  {
   let data=new FormData();
    data.append('password',this.password);
    data.append('email',this.email)
    this.ds.UpdatePassword(data).subscribe((response:any)=>{
     this.hidemail=true;
     this.hideotp=true;
     this.hidePassword=true;
     Swal.fire(
      'Success !',
      'Password Update Successfully'
    ).then(function(){
      window.location.href = '/acount';
    });
    })
  }
 
}
