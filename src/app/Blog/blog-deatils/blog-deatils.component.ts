import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services.service'; 
@Component({
  selector: 'app-blog-deatils',
  templateUrl: './blog-deatils.component.html',
  styleUrls: ['./blog-deatils.component.css']
})
export class BlogDeatilsComponent {
constructor(
  private router: ActivatedRoute,
  public ds: ServicesService,
  private router2: Router,
  private route: ActivatedRoute,
  
  )
{
  
}

blogId: any = 0;
singleBlog: any = '';
allBlogs: any = '';

ngOnInit(): void {
  this.router.params.subscribe((params: any) => {
    this.blogId = params.id;
    console.log(params.id);
  });
  this.getBlog(this.blogId);
  this.getBlogs();
}

getBlog(id: any) {
  let data = new FormData();
  data.append('id', id);
  this.ds.getAllBlogsSingle(data).subscribe((response: any) => {
    this.singleBlog = response[0];
    let date: any = new Date(this.singleBlog.created_at);

    var formatedDate =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ';

    var formatedTime =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.singleBlog.fdate = formatedDate;
    this.singleBlog.ftime = formatedTime;
    console.log(this.singleBlog);
    
  });
}

getBlogs() {
  this.ds.getAllBlogs().subscribe((response: any) => {
    this.allBlogs = response;
    this.allBlogs.map((x: any) => {
      let date = new Date(x.created_at);

      var formatedDate =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ';

      var formatedTime =
        date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        x.fDate = formatedDate;
        x.fTime = formatedTime;
    });
    console.log(this.allBlogs);
  });
}
openBlog(i: any) {
  this.router2.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router2.onSameUrlNavigation = 'reload';
  this.router2.navigateByUrl('blog-detail/' + i.id);
}
}
