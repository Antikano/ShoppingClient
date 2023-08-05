import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DenemeService {

  private apiUrl = 'https://localhost:7279/api/Basket';
  constructor(private http:HttpClient) { }

  denemeGet(){ 
    this.http.post('https://localhost:7279/api/Basket',"deneme");
  }


}
