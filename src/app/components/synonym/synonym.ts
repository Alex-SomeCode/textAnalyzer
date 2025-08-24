import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatamuseSynonymWord } from '../../models/DatamuseSynonym';

@Component({
  selector: 'app-synonym',
  imports: [],
  templateUrl: './synonym.html',
  styleUrl: './synonym.css'
})
export class Synonym {

  @Input()
  synonym!: DatamuseSynonymWord

  @Output() synonymClick = new EventEmitter<string>()


  onSynonymClick() {
    
    this.synonymClick.emit(this.synonym.word)

  }

  // click(): void {

  //   console.log('click in synonym ' + JSON.stringify(this.synonym));

  // }

}
