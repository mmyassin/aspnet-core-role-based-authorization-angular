import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';
import {CategoriesServiceProxy, Category} from '../../shared/service-proxies/service-proxies';
import {Router} from '@angular/router';

@Component({templateUrl: './categories.component.html'})
export class CategoriesComponent extends AppComponentBase implements OnInit {

  gridData: any;
  selectedKeys: number[] = [];
  filter: string;

  constructor(
    injector: Injector,
    private _categoriesServiceProxy: CategoriesServiceProxy,
    private _router: Router) {
    super(injector);
  }

  getCategories(event?: any) {
    this._categoriesServiceProxy.getAll(
      this.filter,
      undefined,
      undefined,
      undefined).subscribe(result => {
      this.gridData = result;
    });
  }

  createCategory(): void {
    this._router.navigate(['/categories', 'create']);
  }

  editCategory(categoryId): void {
    this._router.navigate(['/categories', categoryId, 'edit']);
  }

  deleteCategories(id?: number): void {
    if (confirm('Are you sure :(')) {
      let input = [];
      if (id && id > 0) {
        input.push(id);
      } else {
        input = this.selectedKeys;
      }
      this._categoriesServiceProxy.deleteCategories(input).subscribe(result => {
        this.getCategories();
      });
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

}
