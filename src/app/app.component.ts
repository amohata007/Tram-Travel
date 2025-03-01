// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TramListComponent } from './components/tram-list/tram-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TramListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tram-departure-app';
}
