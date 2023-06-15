import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  GetSettingData :any=[];
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

  
}
