import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    blogs: any;
    date: any;
    imageName: any;
    isLogin: boolean = false;
    isLoading: boolean = true

    constructor(
      public blogService: BlogService,
      public adminService: AdminService,
      public router: Router
    ) {}

    ngOnInit(): void {
      this.isLogin = this.adminService.getIsAuth();
      this.blogService.getBlogs().subscribe( (res : any) => {
        this.blogs = res['blogs'];
        this.imageName = this.blogs.image;
        console.log(res);
        this.date = this.blogs.date;
        console.log(this.blogs);
        this.isLoading =  false;
      });
  }

}
