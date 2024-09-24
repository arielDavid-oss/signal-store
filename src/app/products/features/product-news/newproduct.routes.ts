import { Routes } from "@angular/router"

export default [
    {
        path: '',
        loadComponent: () => import('./product-news.component'),
    },
]as Routes;