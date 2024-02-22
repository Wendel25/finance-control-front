import { Component } from '@angular/core';

import { MenuComponent } from '../../shared/components/menu/menu.component';
import { MenuProductsComponent } from './menu-products/menu-products.component';
import { ListProductsComponent } from './list-products/list-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MenuComponent,
    MenuProductsComponent,
    ListProductsComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {

}
