import {Component, Injector, OnInit} from '@angular/core';
import {AppComponentBase} from '../../shared/app-component-base';
import {ProductsServiceProxy, Product, DropDownDto} from '../../shared/service-proxies/service-proxies';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({templateUrl: './edit-product.component.html'})
export class EditProductComponent extends AppComponentBase implements OnInit {
  loading = false;
  product: Product = new Product();
  categoriesList: DropDownDto[] = [];
  metadataList: string[] = [];
  selectedMetadata: string[] = [];

  constructor(
    injector: Injector,
    private _productsServiceProxy: ProductsServiceProxy,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    super(injector);
  }

  getDetails(productId?: number) {
    if (!productId) {
      this.product = new Product();
      this.product.id = productId;
    } else {
      this._productsServiceProxy.getProductForEdit(productId).subscribe(result => {
        this.product = result;
        if (result.metadata && result.metadata !== '') {
          this.selectedMetadata = result.metadata.split(',');
        }
      });
    }
    this.getCategories();
  }

  getCategories() {
    this._productsServiceProxy.getCategoriesList()
      .subscribe(result => {
        this.categoriesList = result;
        this.getCategoryMetadata();
      });
  }

  getCategoryMetadata() {
    this._productsServiceProxy.getCategoryMetadata(this.product.categoryId)
      .subscribe(result => {
        this.metadataList = result;
      });
  }

  saveChanges() {
    this.loading = true;
    if (this.selectedMetadata.length > 0) {
      this.product.metadata = this.selectedMetadata.toString();
    }
    this._productsServiceProxy.createOrEditProduct(this.product)
      .subscribe(() => {
        this.loading = false;
        this._router.navigate(['products/']);
      });
  }

  onCategoryValueChange() {
    this.getCategoryMetadata();
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      let productId = params['productId'];
      this.getDetails(productId);
    });
  }

}
