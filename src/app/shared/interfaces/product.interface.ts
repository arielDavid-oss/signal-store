export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: Number;
        count: number;
    };
}


export interface ProductItemCart {

    product: Product;
    quantity: number;
    total: number;
}