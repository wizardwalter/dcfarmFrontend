import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public adminService: AdminService, public router: Router) {}

status: any;
  ngOnInit(): void {}

 async onSubmit(form: NgForm) {
   await this.adminService.login(form.value.email, form.value.password)
    this.status = this.adminService.getStatus()
     setTimeout(()=>{this.status = ''}, 3500);
  }
}
