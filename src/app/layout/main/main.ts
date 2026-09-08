import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  imports: [RouterOutlet, RouterLink, MatToolbar],
  selector: 'app-main',
  styleUrl: './main.css',
  templateUrl: './main.html',
})
export default class Main {}
