import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ServicesService } from 'src/app/services.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

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
      {id: 1,img: "./assets/img/hero/1.jpg"},
      {id: 2,img: "./assets/img/hero/2.jpg"}
    ];



    itemsPerPage: number = 3;
    currentPage: number = 1;
    totalItems: number = 0;
    products: any = []; 
    GetSettingData :any = [];
    allBlogs: any = [];
    allBlogsfilter: any = [];

    GetAllTeamData:any =[];

    ngOnInit(): void {
      this.getProducts();
      this.getSettingData();
      this.GetAllTeam();
      this.GetHomeBlog();
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

    getSettingData()
    {
      this.ds.getSettingData().subscribe((response:any)=>{
       this.GetSettingData=response[0];
     this.GetSettingData.ameneties = JSON.parse(this.GetSettingData.ameneties);

      })
    }
    


    customReviewOptions: OwlOptions = {
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
      
    
      sliders = [
        {id: 1,img: "./assets/img/testimonial/1.jpg"},
        {id: 2,img: "./assets/img/testimonial/1.jpg"},
        {id: 3,img: "./assets/img/testimonial/1.jpg"},
        {id: 4,img: "./assets/img/testimonial/1.jpg"},

      ];

      GetAllTeam()
      {
        this.ds.GetAllTeam().subscribe((response:any)=>{
        this.GetAllTeamData=response;
        console.log(this.GetAllTeamData);
        
        })
      }



    


      
      GetHomeBlog() {
    this.ds.GetHomeBlog().subscribe((response: any) => {
      
      this.allBlogs = response;
      this.allBlogs.map((x: any) => {
        let date = new Date(x.created_at);
        var formatedDate =
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate();

        var formatedTime =
          date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        x.fDate = formatedDate;
        x.fTime = formatedTime;
       
      });

      this.allBlogsfilter = this.allBlogs;
      this.allBlogsfilter.map((x: any) => {
        x.postContent = x.postContent.replace(/(<([^>]+)>)/gi, '');
        x.postContent = x.postContent.substring(0, 200);
      });
    });
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
