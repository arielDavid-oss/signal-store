import { Routes } from "@angular/router";

export default[
{
    path:'',
    loadComponent: () => import('../product-list/product-list.component')

},
{
    path: 'product/:id',
    loadComponent: () => import('../product-detail/product-detail.component')
},
{
    path: '',
    loadComponent: () => import('../product-news/product-news.component')
}
]as Routes;