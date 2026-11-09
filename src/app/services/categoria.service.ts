import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  crearCategoria(categoria: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria, this.getHeaders());
  }

  actualizarCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, categoria, this.getHeaders());
  }

  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
