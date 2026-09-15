import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html'
})
export class Navbar {}