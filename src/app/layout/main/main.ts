import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-main',
  styleUrl: './main.css',
  templateUrl: './main.html',
})
export default class Main {}
