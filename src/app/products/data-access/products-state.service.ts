import { inject, Injectable } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { ProductsService } from "./products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";

interface State {
    products: Product[];
    status: 'loading' | 'success' | 'error';
}

@Injectable()
export class ProductsStateService {

    private productsService = inject(ProductsService);
    
    private initialState: State = {
        products: [],
        status: 'loading' as const,
     
    };

changePage$ = new Subject<number>();
loadproducts$ = this.changePage$.pipe(
    startWith(1),
    switchMap(() => this.productsService.getProductos()),
    map(products => ({ products, status: 'success' as const })),
    catchError(() => of({ status: 'error' as const })),
);
   state = signalSlice({
    initialState: this.initialState,
    sources: [
        this.changePage$.pipe(
            map((page)=> ({page, status: 'loading' as const})),
        ),
        this.loadproducts$,
        ],
    });
   
}