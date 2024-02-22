import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  providers: [ApiService],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})

export class ListProductsComponent implements OnInit {
  constructor(
    private apiService: ApiService
  ) { }

  panelOpenState = false;
  categories: string[] = [];
  products: any[] = [];

  getCategoriesTitle() {
    this.apiService.getProducts().subscribe(
      (data) => {
        this.categories = Object.keys(data.results);
      },
      (error) => {
        console.log("erro ao buscar categorias", error);
      }
    );
  }

  ngOnInit(): void {
    this.getCategoriesTitle();
  }
}
