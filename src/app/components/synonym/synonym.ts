import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatamuseSynonymWord } from '../../models/DatamuseSynonym';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-synonym',
  imports: [RouterLink],
  templateUrl: './synonym.html',
  styleUrl: './synonym.css',
})
export class Synonym {
  @Input()
  synonym!: DatamuseSynonymWord;

  @Output() synonymClick = new EventEmitter<string>();

  onSynonymClick() {
    this.synonymClick.emit(this.synonym.word);
  }
}
