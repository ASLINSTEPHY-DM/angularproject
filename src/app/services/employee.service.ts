import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = 'e1348ba343c3638106c51baddfd6761261809d7cddfcca8c98c763ff047b98b5';

  constructor(private http: HttpClient) {}

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}?access-token=${this.accessToken}`, employeeData);
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}?access-token=${this.accessToken}`, employeeData);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(`${this.apiUrl}?access-token=${this.accessToken}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?access-token=${this.accessToken}`);
  }
}