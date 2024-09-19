import { effect, inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { StorageService } from "./storage.service";
import { map, Observable } from "rxjs";
import { state } from "@angular/animations";


interface State {
    products: ProductItemCart[];
    loading: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class CartStateService{

    private _storageService = inject(StorageService);
private initialState: State = {
    products: [],
    loading: false,
};
loadProducts$ = this._storageService.loadProducts().pipe(
    map(products => ({ products, loading: true })));


    


state = signalSlice({
   initialState: this.initialState,
   sources: [this.loadProducts$],
   actionSources:{
    add: (state, action$: Observable<ProductItemCart>) => 
        action$.pipe(
            map(product => this.add(state, product)),
        ),
    
   },
       effects: (state) =>({
        load: ()=> {
            console.log(state.products());
        },
       }),
});
private add(state: Signal<State>, product: ProductItemCart) {
   const isInCart = state().products.find((producInCart) => producInCart.product.id === product.product.id,
); 

if(!isInCart) {
    return {products: [...state().products, {...product, quantity: 1}],
};
}

        isInCart.quantity += 1;
        return {products: [...state().products],
};    
         
    };
}

