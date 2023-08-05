import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppingClient';
  activeLang:string;
  availableeLang:string[] | {id:string,label:string}[];

  constructor(private service:TranslocoService) {
    service.setActiveLang('en')
  }
  


}
