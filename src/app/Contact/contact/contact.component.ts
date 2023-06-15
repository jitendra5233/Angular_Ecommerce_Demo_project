import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  GetSettingData :any=[];

  name:any=''
  email:any=''
  phone:any=''
  message:any=''

  constructor(
    public router:Router,
    public ds: ServicesService
    ){ 
     
  }


  
 ngOnInit() :void{
  this.getSettingData();
 }


  getSettingData()
  {
    this.ds.getSettingData().subscribe((response:any)=>{
     this.GetSettingData=response[0];
     this.GetSettingData.ameneties = JSON.parse(this.GetSettingData.ameneties);
    })
  }

  ContactFormSubmit()
  {

    if(this.name =='')
    {
      alert('Name is Required');
    }
    if(this.email =='')
    {
      alert("Please Enter Valid Email-Id");
    }
    if(this.phone =='')
    {
      alert('Please Enter Valid Phone Number');
  
    }
    if(this.message =='')
    {
      alert('Message is Required');
    }
    else{
      let data=new FormData();
      data.append('name',this.name);
      data.append('email',this.email);
      data.append('phone',this.phone);
      data.append('message',this.message);

      this.ds.ContactData(data).subscribe((response:any)=>{
        if(response ==1)
        this.name='';
        this.email='';
        this.phone='';
        this.message='';

        {
          Swal.fire(
            'Success !',
            'Query Send Successfully'

          )
        }
      })
    }
    
  }
}
