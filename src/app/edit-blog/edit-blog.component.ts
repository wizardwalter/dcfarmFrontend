import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../shared/blog.service';


@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blog: any;
  id: any;
  quillStyle = {'height': '500px'}

  constructor(public BlogService: BlogService, public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params =>{
       this.id = params.get('id');
       this.BlogService.getBlog(this.id).subscribe((res:any) => {
        this.blog = res['blog'];
      })
    })
  }
 toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];

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
  formData.append("author", "Danielle Connell");
  formData.append("userObj", JSON.stringify(userObj));
  console.log(formData)
  console.log(this.file)
  await this.BlogService.editBlog(this.id ,formData).subscribe(async res =>{
    await res;
    await this.router.navigateByUrl("/news");
  });
  }

}

