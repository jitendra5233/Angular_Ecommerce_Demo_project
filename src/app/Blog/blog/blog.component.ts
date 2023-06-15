import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { ServicesService } from 'src/app/services.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  constructor(public router:Router,public ds:ServicesService){ 
  }

  allBlogs: any = [];
  allBlogsfilter: any = [];

  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;


  
  allShow = true;

  ngOnInit(): void {
    this.getBlogs();
   
  }

  getBlogs() {
    this.ds.getAllBlogs().subscribe((response: any) => {
      this.allBlogs = response;
      this.totalItems = this.allBlogs.length;
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


  getPaginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.allBlogs.slice(startIndex, endIndex);
    
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
  
}
