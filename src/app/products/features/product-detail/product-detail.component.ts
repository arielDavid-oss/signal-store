import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe,NgFor,RouterLink],
  templateUrl: './product-detail.component.html',
  styles: ``,
  providers: [ProductsDetailStateService]

})
export default class ProductDetailComponent {
  ProductsDetailStateService = inject(ProductsDetailStateService).state;
    id = input.required<string>();

constructor(){
  effect(() => {
this.ProductsDetailStateService.getById(this.id());
  });
}
}
