import { Component, OnInit } from '@angular/core';
import { AdminService } from './shared/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public adminService: AdminService) {}
  ngOnInit(): void{
    this.adminService.autoAuthUser();
  }

}
