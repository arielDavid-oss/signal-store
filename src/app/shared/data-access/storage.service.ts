import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ProductItemCart } from "../interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private isAdminSubject = new BehaviorSubject<boolean>(false);
    isAdmin$ = this.isAdminSubject.asObservable();

    private isUpdateSubject  = new BehaviorSubject<boolean>(false);
    isUpdate$ = this.isUpdateSubject.asObservable();

    loadProducts(): Observable<ProductItemCart[]> {
        const rawProducts = localStorage.getItem('products');
        return of(rawProducts ? JSON.parse(rawProducts) : []);
    }
 
    saveProducts(products: ProductItemCart[]): void {
        localStorage.setItem('products', JSON.stringify(products));
    }

    constructor() {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        this.isAdminSubject.next(isAdmin);
    
        const isUpdate = localStorage.getItem('isUpdate') === 'true';
        this.isUpdateSubject.next(isUpdate);
    }

    logout() {
        localStorage.removeItem('isAdmin');
        this.isAdminSubject.next(false); // Notificar a los suscriptores
    }

    loginAsAdmin() {
        localStorage.setItem('isAdmin', 'true');
        this.isAdminSubject.next(true); // Notificar a los suscriptores
    }

    setIsUpdateProduct(isUpdate: boolean) { // Permite establecer true o false
        localStorage.setItem('isUpdate', isUpdate.toString()); // Guardar en localStorage
        this.isUpdateSubject.next(isUpdate); // Notificar a los suscriptores
    }

    setIsNewProduct() {
        this.setIsUpdateProduct(false); // Para productos nuevos, `isUpdate` debe ser `false`
    }
}
