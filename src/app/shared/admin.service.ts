import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(public http: HttpClient, public router: Router) {}
  //baseUrl = 'http://localhost:8080';
  baseUrl = 'https://dcfarmbackend.herokuapp.com';
  isAuthenticated = false;
  isLoading: boolean = false;
  status: string = '';
  private token: any;
  private tokenTimer: number = 0;
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getStatus(){
    return this.status;
  }

  login(email: string, password: string) {
    const authData: Admin = { email: email, password: password };
    this.isLoading = true;
    return this.http
      .post<{ token: string; expiresIn: number; ok: boolean; message: string }>(
        this.baseUrl + '/admin',
        authData
      )
      .subscribe((res) => {
        console.log(res)
        if (res.ok == false) {
          this.status = res.message
        } else {
          const token = res.token;
          this.token = token;
          const expiresInDuration = res.expiresIn;
          this.setAdminTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAdminData(token, expirationDate);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  setAdminTimer(duration: number) {
    this.tokenTimer = window.setTimeout(() => {
      this.logout();
    }, duration * 10000);
  }

  saveAdminData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = window.setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}
