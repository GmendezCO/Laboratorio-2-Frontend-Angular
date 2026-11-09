import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  categorias: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriaService.eliminarCategoria(id).subscribe({
        next: () => this.cargarCategorias(),
        error: () => alert('Error al eliminar la categoría')
      });
    }
  }
}
