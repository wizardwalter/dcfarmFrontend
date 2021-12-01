import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(public http: HttpClient, public router: Router) {}
  // baseUrl = 'https://k9cs-backend.herokuapp.com';
  baseUrl = 'http://localhost:8080'

  getBlogs() {
    return this.http.get(this.baseUrl + '/blogs');
  }

  getBlog(id:any){
    return this.http.get(this.baseUrl + "/blogs/"+ id)
  };

  addBlog(userObj:any): Observable<any> {
    return this.http.post(this.baseUrl + '/blogs/create', userObj);
  };

  editBlog(id:any, userObj:any): Observable<any>{
    return this.http.put(this.baseUrl + '/blogs/' + id, userObj)
  };

  deleteBlog(id:any){
    return this.http.delete(this.baseUrl + '/blogs/' + id);
  };
}
