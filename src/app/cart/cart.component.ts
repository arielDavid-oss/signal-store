import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item.component';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {

state = inject(CartStateService).state;
onRemove(id: number){
this.state.remove(id);
}


onIncrease(product: ProductItemCart){
this.state.update({
  product: product.product,
  quantity: product.quantity + 1
});
}
onDecrease(product: ProductItemCart){
  this.state.update({
   ...product,
   quantity: product.quantity - 1,
  });
}
}
