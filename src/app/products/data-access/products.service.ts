import { Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";
//const LIMIT =5;
@Injectable({providedIn: 'root'})
export class ProductsService extends BaseHttpService {

    getProductos(): Observable<Product[]>{
        return this.http.get<[]>(`${this.apiUrl}/products`,
        );
    }

    getProduct(id: string): Observable<Product>{
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
    }
}