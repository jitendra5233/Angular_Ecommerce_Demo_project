import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.css'],
})
export class AcountComponent {
 name: any='';
 email : any=''
 password:any =''
 Cpassword :any = ''
 loginemail :any =''
 loginpassword :any =''
 Profiledata :any=''
 username :any =''
 useremail :any =""
 userpassword :any =''
 userCpassword :any=''
 userId :any ='';
 tokenval:any=''
 isLoggedIn =false;

  constructor(
    private router: ActivatedRoute,
    public ds: ServicesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
  
    let locatdata=localStorage.getItem('token');
    if(locatdata !='null')
    {
      this.isLoggedIn=true;
    }
    else{
      this.isLoggedIn=false;

    }
  }


  Register()
  {
    if(this.name == '')
    {
      alert('Please Enter Valid Name');
    }
    if(this.email == '')
    {
      alert('Please Enter Valid Email');
    }
    if(this.password == '')
    {
      alert('Please Enter Valid Password');

    }
    if(this.Cpassword !=this.password)
    {
    alert('Passeord and Confirm Password Both are Same');
    }
    
    else{
     let data=new FormData();
    data.append('name',this.name);
    data.append('email',this.email);
    data.append('password',this.password);
    data.append('Cpassword',this.Cpassword);
    this.ds.SubmitUser(data).subscribe((response :any)=>{
     if(response ==1)
     {
      Swal.fire(
        'Success !',
        'Registration  Successfully'
      ).then(function(){ 
        location.reload();
        }
     );
     }

    })
    }
   

  }

  Login()
  {
    let data=new FormData();
    data.append('email',this.loginemail);
    data.append('password',this.loginpassword);
    let token = this.crypt('salt', this.loginemail);
    data.append('token',token);
    this.ds.Login(data).subscribe((response :any)=>{
    if(response !='')
    {
      localStorage.setItem('token',token)
      localStorage.setItem('userId',response[0].id);
      this.tokenval=localStorage.getItem('token');
      this.username=response[0].name;
      this.useremail=response[0].email;
      this.userId=response[0].id;
      this.isLoggedIn=true;

      Swal.fire(
        'Success !',
        'Login  Successfully'
      ).then(function(){ 
      
        // location.reload();
        window.location.href = '/user-profile';
        }
     );
    }
    if(response == '')
    {
      Swal.fire(
        'Error !',
        'Wrong Credientials'
      )
    } 
    })
  }

  UpdateProfile()
  {

    if(this.name == '')
    {
      alert('Please Enter Valid Name');
    }
    if(this.email == '')
    {
      alert('Please Enter Valid Email');
    }
    if(this.password == '')
    {
      alert('Please Enter Valid Password');

    }
    if(this.Cpassword !=this.password)
    {
    alert('Passeord and Confirm Password Both are Same');
    }
    else {
      let data=new FormData();
      data.append('id',this.userId)
      data.append('name',this.username)
      data.append('password',this.userpassword)
      data.append('Cpassword',this.userCpassword)
      this.ds.UpdateProfile(data).subscribe((response :any)=>{
       this.Profiledata=response[0];
       this.username=this.Profiledata.name;
       this.useremail=this.Profiledata.email;
       this.userId=this.Profiledata.id;
       if(response !='')
       {
        Swal.fire(
          'Success !',
          'Profile Update  Successfully'
        )
       }
     })
    }
  }

  crypt(salt: any, text: any) {
    const textToChars = (text: any) =>
      text.split('').map((c: any) => c.charCodeAt(0));
    const byteHex = (n: any) => ('0' + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: any) =>
      textToChars(salt).reduce((a: any, b: any) => a ^ b, code);

    return text
      .split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
  }

}
