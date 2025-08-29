import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextApiService } from '../../services/text-api-service';
import { DatamuseSynonymWord } from '../../models/DatamuseSynonym';
import { SelectedWord } from '../../models/SelectedWord';
import { Synonym } from '../synonym/synonym';

@Component({
  selector: 'app-text-analyzer',
  templateUrl: './text-analyzer.html',
  styleUrl: './text-analyzer.css',
  imports: [Synonym, FormsModule],
})
export class TextAnalyzer {
  @ViewChild('myTextarea') myTextareaRef!: ElementRef;

  text = signal('');
  symbols = computed(() => this.text().length);
  words = computed(() => this.text().split(/\w+/).length - 1);
  template: RegExp = /\b\w+\b/g;
  synonyms?: DatamuseSynonymWord[];

  selectedText: SelectedWord = {
    value: '',
    indexStart: 0,
    indexEnd: 0,
    remove: () => {
      this.selectedText.value = '';
      this.selectedText.indexStart = 0;
      this.selectedText.indexEnd = 0;
    },
  };

  constructor(private apiSevice: TextApiService) {}

  replaceWordWithSynonym(synonym: string) {
    if (!this.selectedText.value) return;

    console.log(this.selectedText.value);

    this.myTextareaRef.nativeElement.value = this.text;

    let firstPart = this.text().slice(0, this.selectedText.indexStart);

    let secondPart = this.text().slice(this.selectedText.indexEnd).trim();

    console.log(firstPart);
    console.log(secondPart);

    this.text.set(firstPart + synonym + ' ' + secondPart);

    (firstPart = ''), (secondPart = '');

    this.myTextareaRef.nativeElement.value = this.text;

    this.selectedText.remove();
  }

  selectText() {
    this.selectedText.value = this.myTextareaRef.nativeElement.value
      .substring(
        this.myTextareaRef.nativeElement.selectionStart,
        this.myTextareaRef.nativeElement.selectionEnd
      )
      .trim();

    if (!this.selectedText.value) return;

    this.selectedText.indexStart =
      this.myTextareaRef.nativeElement.selectionStart;

    this.selectedText.indexEnd = this.myTextareaRef.nativeElement.selectionEnd;

    console.log(this.selectedText);
  }

  searchSynonyms() {
    if (!this.selectedText.value) return;

    this.apiSevice.getSynonyms(this.selectedText.value).subscribe((value) => {
      this.synonyms = value;
      console.log(this.synonyms);
      this.selectedText.remove();
    });
  }

  hasNoSynonyms(): boolean {
    return this.synonyms?.length == 0 ? true : false;
  }

  copyText() {
    let copyText = this.myTextareaRef.nativeElement.value;
    navigator.clipboard.writeText(copyText);
  }
}
