import { Component, inject, signal } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-news',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product-news.component.html',
  styles: ``
})
export default class ProductNewsComponent {
private http = inject(BaseHttpService);
private router = inject(Router);
showAlert = false;

  userId = signal(0);
  productName = signal('');
  productPrice = signal(0);
  productCategory = signal('');
  productDescription = signal('');
  productImage = signal('');


  onSubmit() {
    const newProduct: Product = {
      id: Math.floor(Math.random() * 100), 
      title: this.productName(),
      price: this.productPrice(),
      description: this.productDescription(),
      category: this.productCategory(),
      image: this.productImage(),
    };

    // Call the service to add the product
    this.http.createProduct(newProduct).subscribe(
      (response) => {
        
        console.log('Producto agregado:', response);

        // Mostrar la alerta
        this.showAlert = true;

        // Ocultar la alerta después de 3 segundos (3000 milisegundos)
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);

        this.router.navigate(['/newproduct'], {
          replaceUrl: true,
        });
      },
      (error) => {
        console.error('Error al agregar producto:', error);
        // Manejar errores si es necesario
      }
    );
  }
}