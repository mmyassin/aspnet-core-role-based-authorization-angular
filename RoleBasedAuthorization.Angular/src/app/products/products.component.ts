import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';
import {ProductsServiceProxy, Product} from '../../shared/service-proxies/service-proxies';
import {Router} from '@angular/router';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';
import {map} from 'rxjs/operators';
import {sort} from '@progress/kendo-data-query/dist/npm/sorting/sort';

@Component({templateUrl: './products.component.html'})
export class ProductsComponent extends AppComponentBase implements OnInit {

  gridData: any;
  gridState: DataStateChangeEvent = {skip: 0, take: 10, sort: []};
  selectedKeys: number[] = [];
  filter: string;

  constructor(
    injector: Injector,
    private _productsServiceProxy: ProductsServiceProxy,
    private _router: Router) {
    super(injector);
  }

  getProducts(event?: any) {
    console.log(event);
    if (!event) {
      event = this.gridState;
    }
    this._productsServiceProxy.getAll(
      this.filter,
      event.skip,
      event.take,
      ''
    ).pipe(
      map(result => ({data: result.data, total: result.total} as GridDataResult))
    ).subscribe(result => {
      this.gridData = result;
    });
  }

  createProduct(): void {
    this._router.navigate(['/products', 'create']);
  }

  editProduct(productId): void {
    this._router.navigate(['/products', productId, 'edit']);
  }

  deleteProducts(id?: number): void {
    if (confirm('Are you sure :(')) {
      let input = [];
      if (id && id > 0) {
        input.push(id);
      } else {
        input = this.selectedKeys;
      }
      this._productsServiceProxy.deleteProducts(input).subscribe(result => {
        this.getProducts();
      });
    }
  }

  ngOnInit(): void {
    this.getProducts();
  }

}
