import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  ls = localStorage;
  localstorage = localStorage;
  currentUser;
  constructor(private http: HttpClient) { }

   getUser(data) {
    console.log(data);
     return this.http.post('http://localhost:3000/api/getUser', data);
   }

  fetchUser() {
    return this.http.get('http://localhost:3000/api/fetchUser');
  }

  checkLogin() {
    this.currentUser = this.localstorage.getItem('currentUser');
    if (this.currentUser !== '') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.localstorage.setItem('currentUser', '');
    return true;
  }

  saveUser(product) {
    return this.http.post('http://localhost:3000/api/saveUser/', product);
  }

  saveMember(member) {
   // debugger;
    return this.http.post('http://localhost:3000/api/saveMember/', member);
  }

  getMember() {
    return this.http.get('http://localhost:3000/api/getMember');
  }

  // getUser() {
  //   return this.http.get('http://localhost:3000/api/getUser');
  // }

  deleteMember(memberId) {
    //debugger;
    return this.http.delete('http://localhost:3000/api/deleteMember?memberId=' + memberId);
  }

  getUserById(productId) {
    return this.http.get('http://localhost:3000/api/getProductById?productId=' + productId);
  }

  getMemberByUserId(userId) {
    return this.http.get('http://localhost:3000/api/getMemberByUserId?userId=' + userId);
  }

  getCurrentUser() {
    let user = JSON.parse(this.ls.getItem('currentUser')); 
    //console.log(user[0]);
    return user[0];
  }
}
