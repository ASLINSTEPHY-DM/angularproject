import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://gorest.co.in/public/v2/users';
  private accessToken = 'e1348ba343c3638106c51baddfd6761261809d7cddfcca8c98c763ff047b98b5';

  constructor(private http: HttpClient) {}

  addEmployee(employeeData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.post(`${this.apiUrl}`, employeeData, { headers });
  }

  updateEmployee(id: number, employeeData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.put(`${this.apiUrl}/${id}`, employeeData, { headers });
  }

  getEmployeeList(pageIndex: number, pageSize: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    const params = new HttpParams()
      .set('_page', pageIndex.toString())
      .set('_limit', pageSize.toString());

    return this.http.get(`${this.apiUrl}`, { headers, params });
  }

  deleteEmployee(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
