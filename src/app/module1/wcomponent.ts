import { Component } from '@angular/core';

@Component({
  template: `
    <div>
      <div>My First Component Willy</div>
    </div>
    <div class="card">
      <div class="card-body">
        This is some text within a card body.
      </div>
      <a routerLink="../welcome" class="btn btn-link">Register</a>
    </div>
    `
})
export class WComponent {
  pageTitle: string = 'Acme s ManageWWment';
}