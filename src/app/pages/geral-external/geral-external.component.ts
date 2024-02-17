import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { GeralProvidersComponent } from './geral-providers/geral-providers.component';
import { SupplierComponent } from './supplier/supplier.component';

@Component({
  selector: 'app-geral-external',
  standalone: true,
  imports: [
    SupplierComponent,
    MatTabsModule,
    MenuComponent,
    GeralProvidersComponent
  ],
  templateUrl: './geral-external.component.html',
  styleUrl: './geral-external.component.scss'
})

export class GeralExternalComponent {

}
