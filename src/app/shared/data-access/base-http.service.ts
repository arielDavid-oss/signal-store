import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Product, User } from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class BaseHttpService{
    http = inject(HttpClient);
    apiUrl = environment.API_URL;

    createProduct(product: Product) {
        return this.http.post(`${this.apiUrl}/products`, product);
      }

    getaccess(user: User){
        return this.http.post(`${this.apiUrl}/verify`, user);
    }
    deleteproduct(id: number) {
        return this.http.delete(`${this.apiUrl}/products/${id}`);
      }
}