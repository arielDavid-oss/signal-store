import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../../data-access/cart-state.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {
cartState  = inject(CartStateService).state;
private router = inject(Router);
isAdmin = false;
isDropdownOpen = true;
clicks = false
ngOnInit() {
  // Verificar si el usuario es administrador
  this.isAdmin = localStorage.getItem('isAdmin') === 'true';
}

click() {
  this.clicks = !this.clicks;

}
toggleDropdown() {
  //this.isDropdownOpen = !this.isDropdownOpen;
  this.isDropdownOpen = true;
}

logout() {
  // Aquí puedes manejar la lógica de cerrar sesión
  localStorage.removeItem('isAdmin'); // o cualquier otro ítem que estés usando para la sesión
  this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
}

}

