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
email:any;
password:any;
  ngOnInit(): void {}

 async onSubmit(form: NgForm) {
   this.email = form.value.email;
   this.password = form.value.password;
  this.adminService.login(this.email, this.password)
    .subscribe((res) => {
      console.log(res)
      if (res.ok == false) {
        this.status = res.message
      } else {
        const token = res.token;
        this.adminService.token = token;
        const expiresInDuration = res.expiresIn;
        this.adminService.setAdminTimer(expiresInDuration);
        this.adminService.isAuthenticated = true;
        this.adminService.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
        this.adminService.saveAdminData(token, expirationDate);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    });

  }
}
