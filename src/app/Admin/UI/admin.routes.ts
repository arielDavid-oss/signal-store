import { Routes } from "@angular/router"

export default [
    {
        path: '',
        loadComponent: () => import('./login.component'),
    },
]as Routes;