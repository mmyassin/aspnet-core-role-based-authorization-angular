import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JwtInterceptor, ErrorInterceptor} from './_helpers';
import {HomeComponent} from './home';
import {AdminComponent} from './admin';
import {LoginComponent} from './login';
import * as ApiServiceProxies from '../shared/service-proxies/service-proxies';
import {API_BASE_URL} from '../shared/service-proxies/service-proxies';
import {environment} from '@environments/environment';
import {CategoriesComponent} from './categories/categories.component';
import {GridModule, PagerModule, SharedModule} from '@progress/kendo-angular-grid';;
import { EditCategoryComponent } from './categories/edit-category.component'
import {ProductsComponent} from '@app/products/products.component';
import {EditProductComponent} from '@app/products/edit-products.component';
import {DropDownListModule, MultiSelectModule} from '@progress/kendo-angular-dropdowns';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GridModule,
    PagerModule,
    FormsModule,
    SharedModule,
    DropDownListModule,
    MultiSelectModule,
  ], declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    CategoriesComponent,
    EditCategoryComponent,
    ProductsComponent,
    EditProductComponent
  ], providers: [
    ApiServiceProxies.AuthServiceProxy,
    ApiServiceProxies.CategoriesServiceProxy,
    ApiServiceProxies.ProductsServiceProxy,
    {provide: API_BASE_URL, useValue: environment.apiUrl},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
