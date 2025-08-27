import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextAnalyzer } from '../text-analyzer/text-analyzer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TextAnalyzer, RouterOutlet],
})
export class App {
  protected readonly title = signal('textAnalyzer');

  constructor() {
    console.log('hello');
  }
}
