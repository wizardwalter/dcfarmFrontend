import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { BlogService } from '../shared/blog.service';
import { Blog } from '../_models/Blog';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
  private blogId: any;
  blog: any;
  isLoading: any;
  file: any = [];
  fileName:any = [];
  imageUrl: any;
  show: boolean = true;





  constructor(public route: ActivatedRoute, public blogService: BlogService, public router: Router, public adminService: AdminService) { }

  ngOnInit(): void {
    if(this.adminService.getIsAuth() == false){
      this.router.navigateByUrl('/')
    }
  }

  // onChange(file: any) {
  //   if (file) {
  //     for(var i = 0; i < file.length; i++){
  //       this.fileName.push(file[i].fileName);
  //       this.file.push(file[i]);
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file[i]);

  //       reader.onload = () => {
  //         this.imageUrl = reader.result;
  //       }
  //     }
  //     console.log(file);
  //   }
  // };


  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
      }
      console.log(file);
    }
  };
  // need to make this run more efficient maybe use a promise
  async onSubmit(formObj: NgForm) {
    this.show = false;
    let Data = {
      title: formObj.value.title,
      text: formObj.value.text,
      author: formObj.value.author
    };
  let formData = new FormData();
  let userObj = formObj.value;

  formData.append("photo", this.file);
  formData.append("title", Data.title);
  formData.append("text", Data.text);
  formData.append("author", "Danielle Connell");
  formData.append("userObj", JSON.stringify(userObj));
  console.log(formData)
  console.log(this.file)
  await this.blogService.addBlog(formData).subscribe(async res =>{
    await res;
    await this.router.navigateByUrl("/news");
    this.show = await true;
  });

  }
  quillStyle = {'height': '500px'}
}
