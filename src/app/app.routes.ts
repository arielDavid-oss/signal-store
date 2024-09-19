import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./products/features/product-shell/product.routes'),
    },
    {
        path: '**',
        redirectTo: '',
    }
];
