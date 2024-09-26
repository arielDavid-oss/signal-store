import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStateService } from '../../../data-access/cart-state.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { StorageService } from '../../../data-access/storage.service';
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
private storegeService = inject(StorageService);

  isAdmin = false;
  isDropdownOpen = false;
  closeTimeout: ReturnType<typeof setTimeout> | null = null;
  @ViewChild('navbarDropdown') navbarDropdown!: ElementRef;
  clicks = false;
  isUpdate=false;
ngOnInit() {

  // Verificar si el usuario es administrador
  this.storegeService.isAdmin$.subscribe((isAdmin) => {
    this.isAdmin = isAdmin;
    
  });
  this.storegeService.isUpdate$.subscribe((isUpdate) => {
    this.isUpdate = isUpdate;
  });
}

click() {
  this.clicks = !this.clicks;

}
toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
  if (this.isDropdownOpen) {
    this.resetCloseTimeout();
  }
}
resetCloseTimeout() {
  // Limpia el temporizador anterior si existe
  if (this.closeTimeout) {
    clearTimeout(this.closeTimeout);
  }

  // Establece un nuevo temporizador
  this.closeTimeout = setTimeout(() => {
    this.isDropdownOpen = false; // Cierra el menú
  }, 4000); // Cambia 5000 por el tiempo que desees en milisegundos
}
logout() {

  this.storegeService.logout();
  this.clicks = false;
  this.router.navigate(['/cart']);
}

buttonUpdateProduct(){
  localStorage.setItem('isUpdate', 'true');
  this.storegeService.setIsUpdateProduct(true);

  // Redirigir a la página que debe mostrar el formulario de actualización
  this.router.navigate(['/newproduct']); 
}

buttonNewProduct(){
  localStorage.setItem('isUpdate', 'false');  // Actualiza en localStorage
  this.storegeService.setIsNewProduct();
  // Cambia el estado a false en el servicio
  
  // Redirige a la ruta de nuevo producto
  this.router.navigate(['/newproduct']); 
}

}