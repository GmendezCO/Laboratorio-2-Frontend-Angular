import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent implements OnInit {
  categoria = { id: null, nombre: '', descripcion: '' };
  esEdicion = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.categoriaService.getCategoriaById(id).subscribe({
        next: (data) => this.categoria = data,
        error: () => alert('Error al cargar la categoría')
      });
    }
  }

  onSubmit(): void {
    if (this.esEdicion && this.categoria.id) {
      this.categoriaService.actualizarCategoria(this.categoria.id, this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => alert('Error al actualizar la categoría')
      });
    } else {
      this.categoriaService.crearCategoria(this.categoria).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: () => alert('Error al registrar la categoría')
      });
    }
  }
}
