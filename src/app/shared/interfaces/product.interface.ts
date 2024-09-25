export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;

}

export interface User{
    username: string;
    password: string;
}
export interface ProductItemCart {

    product: Product;
    quantity: number;
    //total: number;
}