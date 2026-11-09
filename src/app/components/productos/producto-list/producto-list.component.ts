import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CurrencyPipe],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: any[] = [];

  constructor(
    private productoService: ProductoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: () => alert('Error al eliminar el producto')
      });
    }
  }
}
