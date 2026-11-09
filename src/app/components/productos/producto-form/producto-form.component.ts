import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, NgFor],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {
  producto = { id: null, nombre: '', precio: 0, categoriaId: null };
  categorias: any[] = [];
  esEdicion = false;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.esEdicion = true;
      this.productoService.getProductoById(id).subscribe({
        next: (data) => {
          this.producto = {
            ...data,
            categoriaId: data.categoria?.id || data.categoriaId
          };
        },
        error: () => alert('Error al cargar el producto')
      });
    }
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  onSubmit(): void {
    const payload = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      categoria: { id: this.producto.categoriaId }
    };

    if (this.esEdicion && this.producto.id) {
      this.productoService.actualizarProducto(this.producto.id, payload).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => alert('Error al actualizar el producto')
      });
    } else {
      this.productoService.crearProducto(payload).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: () => alert('Error al registrar el producto')
      });
    }
  }
}
