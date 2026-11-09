import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario = { username: '', password: '', role: 'USER' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registro(this.usuario).subscribe({
      next: () => {
        alert('Registro exitoso. Por favor inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Error al registrar usuario');
      }
    });
  }
}
