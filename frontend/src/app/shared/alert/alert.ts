import { Component, input } from '@angular/core';

export type AlertType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-alert',
  imports: [],
  styleUrl: './alert.scss',
  templateUrl: './alert.html'
})
export class Alert {
  type = input<AlertType>('info');
  message = input('');
}