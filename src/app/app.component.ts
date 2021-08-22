import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <div><h1>{{pageTitle}}</h1>
      <div>Below is Router Outlet</div>
    </div>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `
})
export class AppComponent {
  pageTitle: string = 'Home Surveillance';
}