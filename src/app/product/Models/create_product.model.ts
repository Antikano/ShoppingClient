import { Category } from "../category/category.model";

export class create_product {
    name: string;
    stock: number;
    price: number;
    description: string;
    ImageData:string;
    categories:Category[]=[];
    categoriesName:string[]=[];
  }
  