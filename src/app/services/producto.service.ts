import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, producto, this.getHeaders());
  }

  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto, this.getHeaders());
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
