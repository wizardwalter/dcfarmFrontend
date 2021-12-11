import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { BlogService } from '../shared/blog.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, public blogService: BlogService, public adminService: AdminService, public router: Router) { }
  id: any;
  blog : any;
  isLogin: boolean = false;
  isLoading: boolean = true
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params =>{
      this.id = params.get('id');
      this.blogService.getBlog(this.id).subscribe(async (res : any)  =>{
        console.log(res)
        this.blog = res['blog'];
        this.isLogin =this.adminService.getIsAuth()
        this.isLoading = await false;
      })
  }
    )}

    deletePost(id : any) {
      this.blogService.deleteBlog(id).subscribe(async (res) => {
        await res;
        await this.router.navigateByUrl('/news');
      });
    }

}
