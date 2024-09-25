import { Component, inject, input, output, OnInit } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent implements OnInit {
  private http = inject(BaseHttpService);
product = input.required<Product>();
deleteProduct = output<Product>(); 
addToCard = output<Product>();
isAdmin = false;

ngOnInit() {
  // Verificar si el usuario es administrador
  this.isAdmin = localStorage.getItem('isAdmin') === 'true';
}

  add(event:Event){
event.stopPropagation();
event.preventDefault();
this.addToCard.emit(this.product());
  }

  delete(event:Event){
event.stopPropagation();
event.preventDefault();
this.http.deleteproduct(this.product().id).subscribe(

  (response) => {
    console.log('Producto eliminado:', response);
    this.deleteProduct.emit(this.product());
  },
  (error) => {
    console.error('Error al eliminar producto:', error);
  }
);

}
}