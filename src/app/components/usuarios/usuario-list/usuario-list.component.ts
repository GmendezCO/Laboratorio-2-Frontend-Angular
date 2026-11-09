import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al cargar usuarios:', err)
    });
  }
}
