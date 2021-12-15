import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogin:any;
  menu: any;
  constructor(public adminService: AdminService) { }

  ngOnInit(): void {
   this.isLogin = this.adminService.getIsAuth()
  }
  logout(){
    this.adminService.logout()
  }

  untoggle(){
    this.menu = document.getElementById("toggle1")
    this.menu.checked = false;
  }
}
