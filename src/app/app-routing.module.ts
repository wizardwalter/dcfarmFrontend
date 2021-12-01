import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'news/create', component: CreateBlogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
