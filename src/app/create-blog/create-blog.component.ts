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






  constructor(public route: ActivatedRoute, public blogService: BlogService, public router: Router, public adminService: AdminService) { }

  ngOnInit(): void {
    if(this.adminService.getIsAuth() == false){
      this.router.navigateByUrl('/')
    }
  }
  file: any;
  fileName: string = "No Image Selected";
  imageUrl: string | ArrayBuffer | null = "https://bulma.io/images/placeholders/256x256.png";

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageUrl = reader.result;
      }

    }
  };
  // need to make this run more efficient maybe use a promise
  async onSubmit(formObj: NgForm) {
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
  formData.append("author", Data.author);
  formData.append("userObj", JSON.stringify(userObj));
  console.log(formData)
  console.log(this.file)
  await this.blogService.addBlog(formData).subscribe();
  await this.router.navigateByUrl("/blogs");
  }
  quillStyle = {'height': '500px'}
}
