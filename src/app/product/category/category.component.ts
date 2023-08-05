import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from './category.model';
import { CategoryService } from '../services/category.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory!: Category;

  @Output() dataEvent: EventEmitter<any> = new EventEmitter();

  constructor(private categoryService: CategoryService) { }


  ngOnInit(): void {
    this.getCategories();
    

  }
  onChange(){
    this.dataEvent.emit(this.selectedCategory);
  }

 

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(
        (categories: Category[]) => {
          console.log(categories);
          this.categories = [
            { id: 0, name: 'All', description: '', createdDate: new Date(), updatedDate: new Date() } as Category,
            ...categories
          ];
        },
        (error: any) => {
          console.log('Hata oluştu:', error);
        }
      );
  }





}
