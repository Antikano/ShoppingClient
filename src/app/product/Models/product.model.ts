export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  categoryNames: string[];
  createdDate: Date;
  updatedDate: Date;
  imageData:string;
  quantity:number;
}
