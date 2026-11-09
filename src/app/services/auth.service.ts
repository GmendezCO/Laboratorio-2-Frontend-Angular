import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ajusta esta URL al puerto exacto de tu backend de Spring Boot (ej. 8080)
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);

        // RESCATE DE EMERGENCIA: Forzar el rol manualmente si es el admin
        const nombreUsuario = credenciales.username || credenciales.email;
        if (nombreUsuario === 'admin') {
          localStorage.setItem('role', 'SUPER-ADMIN-ROLE');
        } else {
          localStorage.setItem('role', 'USER');
        }
      })
    );
  }

  registro(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'SUPER-ADMIN-ROLE';
  }
}
