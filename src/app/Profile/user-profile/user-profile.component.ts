import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {


  Profiledata :any=''
  username :any =''
  useremail :any =""
  userId :any ='';
  tokenval:any=''
  isLoggedIn =false;

  constructor(
    private router: ActivatedRoute,
    public ds: ServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    
  }
  ngOnInit(): void {
    let locatdata=localStorage.getItem('token');
    if(locatdata != 'null')
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;
    }
    this.Getdata();
  }

     Getdata()
     {
     let data:any=new FormData();
     data.append('token',localStorage.getItem('token'));
     this.ds.GetProfile(data).subscribe((response:any)=>{
     this.Profiledata=response[0];
     this.username=this.Profiledata.name;
     this.useremail=this.Profiledata.email;
     this.userId=this.Profiledata.id;
     this.isLoggedIn=true;
     })

     }

  UpdateProfile()
  {
    if(this.username == '')
    {
      alert('Please Enter Valid Name');
    }
    if(this.useremail == '')
    {
      alert('Please Enter Valid Email');
    }
    else {
      let data=new FormData();
      data.append('id',this.userId)
      data.append('name',this.username)
      data.append('email',this.useremail)
      this.ds.UpdateProfile(data).subscribe((response :any)=>{
       this.Profiledata=response[0];
       this.username=this.Profiledata.name;
       this.useremail=this.Profiledata.email;
       this.userId=this.Profiledata.id;
       if(response != '')
       {
        Swal.fire(
          'Success !',
          'Profile Update  Successfully'
        ).then(function(){

          location.reload();
        });
       }
     })
    }
  }

}
