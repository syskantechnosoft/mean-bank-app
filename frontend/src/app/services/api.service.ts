import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('x-auth-token', token || '');
  }

  // Auth
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // Accounts
  createAccount(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, data, { headers: this.getHeaders() });
  }

  getAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/accounts`, { headers: this.getHeaders() });
  }

  deposit(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/deposit`, data, { headers: this.getHeaders() });
  }

  withdraw(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/withdraw`, data, { headers: this.getHeaders() });
  }

  transfer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/transfer`, data, { headers: this.getHeaders() });
  }

  requestCard(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/card`, data, { headers: this.getHeaders() });
  }

  toggleCardStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/card/status`, data, { headers: this.getHeaders() });
  }

  requestChequeBook(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/cheque`, data, { headers: this.getHeaders() });
  }

  // User
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`, { headers: this.getHeaders() });
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/profile`, data, { headers: this.getHeaders() });
  }

  addPayee(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/payees`, data, { headers: this.getHeaders() });
  }

  deletePayee(payeeId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/payees/${payeeId}`, { headers: this.getHeaders() });
  }
}
