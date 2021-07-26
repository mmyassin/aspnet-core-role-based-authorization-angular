import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';
import {CategoriesServiceProxy, Category} from '../../shared/service-proxies/service-proxies';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({templateUrl: './edit-category.component.html'})
export class EditCategoryComponent extends AppComponentBase implements OnInit {
  loading = false;
  category: Category = new Category();

  constructor(
    injector: Injector,
    private _categoriesServiceProxy: CategoriesServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    super(injector);
  }

  getDetails(categoryId?: number) {
    if (!categoryId) {
      this.category = new Category();
      this.category.id = categoryId;
    } else {
      this._categoriesServiceProxy.getCategoryForEdit(categoryId).subscribe(result => {
        this.category = result;
      });
    }
  }

  saveChanges() {
    this.loading = true;
    this._categoriesServiceProxy.createOrEditCategory(this.category)
      .subscribe(() => {
        this.loading = false;
        this._router.navigate(['categories/']);
      });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      let categoryId = params['categoryId'];
      this.getDetails(categoryId);
    });
  }

}
