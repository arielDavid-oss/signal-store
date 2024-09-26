import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { Product } from '../../../shared/interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../../shared/data-access/storage.service';
import { ProductsService } from '../../data-access/products.service';

@Component({
  selector: 'app-product-news',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './product-news.component.html',
  styles: ``
})
export default class ProductNewsComponent implements OnInit {
private http = inject(BaseHttpService);
private router = inject(Router);
private ProductsService = inject(ProductsService);
private StoregeService = inject(StorageService);
  showAlert = false;
idob = 0;
  userId = signal(0);
  productName = signal('');
  productPrice = signal(0);
  productCategory = signal('');
  productDescription = signal('');
  productImage = signal('');
  isUpdate= false;
  products: Product[] = []; 

  
  ngOnInit() {
    this.StoregeService.isUpdate$.subscribe((isUpdate) => {
      this.isUpdate = isUpdate;
      //console.log('isUpdate:', this.isUpdate);

    });
    this.loadProducts();
  }


  loadProducts() {
    this.ProductsService.getProductos().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  onProductSelect(event: Event) {
    const selectElement = event.target as HTMLSelectElement; 
    const productId = Number(selectElement.value);
    const selectedProduct = this.products.find(product => product.id === productId);
    this.idob=productId;
    
    if (selectedProduct) {
      console.log('Producto seleccionado:', selectedProduct); // Imprime el producto seleccionado
      this.productName.set(selectedProduct.title);
      this.productPrice.set(selectedProduct.price); 
      this.productCategory.set(selectedProduct.category);
      this.productDescription.set(selectedProduct.description);
      this.productImage.set(selectedProduct.image);
      
      console.log('Precio del producto:', this.productPrice()); // Imprime el precio configurado
    }
  }
  
  
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
  actualizar(){
    const actualizarProduct: Product = {
      id: this.idob,
      title: this.productName(),
      price: this.productPrice(),
      description: this.productDescription(),
      category: this.productCategory(),
      image: this.productImage(),
    };
    this.http.updateProduct(actualizarProduct).subscribe(
      (response) => {
        
        console.log('Producto actualizado:', response);

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