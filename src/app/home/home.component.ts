import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { BlogService } from '../shared/blog.service';
import { Blog } from '../_models/Blog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public slides = [
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638304372/dcfarm/horses_blmws7.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638304372/dcfarm/ducks_n9fup6.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638304372/dcfarm/pig_h5fnmh.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638307620/dcfarm/chickens_adobespark_cz0w9a.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638310304/dcfarm/goats_adobespark_ilpovr.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638307503/dcfarm/alpacas_adobespark_uf7xzn.jpg" },
    { src: "https://res.cloudinary.com/walterscloudinary/image/upload/v1638319797/dcfarm/rosey_adobespark_cax5kr.jpg" },
  ];

  blogs1:any;
  blogs: any;
  date: any;
  image: any;
  text: any;
  title: any;
  isLoading: boolean = true;

  constructor(public blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getBlogs().subscribe(
    async (res : any) => {
      console.log(res)
      this.blogs1 = await res['blogs'];
        this.blogs = await this.blogs1.slice(this.blogs1.length - 3, this.blogs1.length);
      this.isLoading = await false;
    })
  }

}
