import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  imports: [],
  templateUrl: './example.html',
  styleUrl: './example.css',
})
export default class Example {
  constructor() {
    console.log('URL', import.meta.env.NG_APP_API_URL);
    console.log('App title', import.meta.env.NG_APP_TITLE);
  }
}
