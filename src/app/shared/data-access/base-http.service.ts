import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Product } from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService{
    http = inject(HttpClient);
    apiUrl = environment.API_URL;

    createProduct(product: Product) {
        return this.http.post(`${this.apiUrl}/products`, product);
      }
}