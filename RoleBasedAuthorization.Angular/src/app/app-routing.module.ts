import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home';
import {AdminComponent} from './admin';
import {LoginComponent} from './login';
import {AuthGuard} from './_helpers';
import {CategoriesComponent} from '@app/categories/categories.component';
import {EditCategoryComponent} from '@app/categories/edit-category.component';
import {EditProductComponent} from '@app/products/edit-products.component';
import {ProductsComponent} from '@app/products/products.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'categories/create', component: EditCategoryComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'categories/:categoryId/edit', component: EditCategoryComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'products', component: ProductsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'products/create', component: EditProductComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'products/:productId/edit', component: EditProductComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'Manager']}
  },
  {
    path: 'login', component: LoginComponent
  },

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
