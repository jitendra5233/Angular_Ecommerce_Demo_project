import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {Router} from '@angular/router';
import { ServicesService } from 'src/app/services.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  abouttxt='ABOUT US'
  
  constructor(
    public router:Router,
    public ds: ServicesService
    ){ 
     
  }
  customOptions: OwlOptions = {
    loop: true,
    dots: false,
    autoplay: true,
    margin: 0,
    nav: true,
    navText: [
      '<i class="fas fa-arrow-left"></i>',
      '<i class="fas fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
 
  
    slides = [
      {id: '1', img:"./assets/img/client/1.png"},
      {id: '2', img:"./assets/img/client/2.png"},
      {id: '3', img:"./assets/img/client/3.png"},
      {id: '4', img:"./assets/img/client/4.png"},
      {id: '5', img:"./assets/img/client/5.png"},
      {id: '6', img:"./assets/img/client/6.png"}
    ];

    GetSettingData :any = [];
    GetAllTeamData:any =[];

    ngOnInit():void{
    this.GetAllTeam();
    this.getSettingData();
    }

    GetAllTeam()
      {
        this.ds.GetAllTeam().subscribe((response:any)=>{
        this.GetAllTeamData=response;
        
        })
      }

      getSettingData()
      {
        this.ds.getSettingData().subscribe((response:any)=>{
         this.GetSettingData=response[0];
        })
      }
}
