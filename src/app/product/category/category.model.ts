export interface Category {
    subscribe(arg0: (selectedCategory: any) => void): import("rxjs").Subscription | undefined;
    id: number;
    name: string;
    description: string;
    createdDate: Date;
    updatedDate: Date;
  }
  