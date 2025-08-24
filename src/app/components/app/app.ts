import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { TextApiService } from '../../services/text-api-service';
import { TextAnalyzer } from '../text-analyzer/text-analyzer';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [TextAnalyzer],
})


export class App {
  protected readonly title = signal('textAnalyzer');

  constructor() {
    console.log('hello');


  }
}
