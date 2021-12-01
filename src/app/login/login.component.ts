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


  ngOnInit(): void {}

 onSubmit(form: NgForm) {
   this.adminService.login(form.value.email, form.value.password)
  }
}
