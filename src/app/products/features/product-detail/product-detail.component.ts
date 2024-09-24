import { Component, effect, inject, input } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { ProductsDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductsDetailStateService]

})
export default class ProductDetailComponent {
  ProductsDetailStateService = inject(ProductsDetailStateService).state;
  cartState  = inject(CartStateService).state;
    id = input.required<string>();

constructor(){
  effect(() => {
this.ProductsDetailStateService.getById(this.id());
  });
}
addToCart(){
this.cartState.add({
  product: this.ProductsDetailStateService.product()!,
  quantity: 1,
})
}

}
