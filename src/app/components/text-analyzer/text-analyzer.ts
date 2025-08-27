import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextApiService } from '../../services/text-api-service';
import { DatamuseSynonymWord } from '../../models/DatamuseSynonym';
import { Word } from '../../models/Word';
import { Synonym } from '../synonym/synonym';

@Component({
  selector: 'app-text-analyzer',
  templateUrl: './text-analyzer.html',
  styleUrl: './text-analyzer.css',
  imports: [Synonym],
})
export class TextAnalyzer {
  @ViewChild('myTextarea') myTextareaRef!: ElementRef;
  @ViewChild('mySymbols') mySymbolsRef!: ElementRef;
  @ViewChild('myWords') myWordsRef!: ElementRef;

  symbols: number = 0;
  words: number = 0;
  text: string = '';
  template: RegExp = /\b\w+\b/g;
  synonyms?: DatamuseSynonymWord[];

  // selectedText: Word = new Word('', 0, 0)
  selectedText: Word = {
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

  onInput(event: Event) {
    this.text = (event.target as HTMLInputElement).value;

    this.symbols = (event.target as HTMLInputElement).value.length;

    this.mySymbolsRef.nativeElement.textContent = this.symbols;

    this.myWordsRef.nativeElement.textContent =
      this.text.split(/\w+/).length - 1;
  }

  replaceWordWithSynonym(synonym: string) {
    if (!this.selectedText.value) return;

    this.myTextareaRef.nativeElement.value = this.text;

    let firstPart = this.text.slice(0, this.selectedText.indexStart);

    let secondPart = this.text.slice(this.selectedText.indexEnd).trim();

    console.log(firstPart);
    console.log(secondPart);

    this.text = firstPart + synonym + ' ' + secondPart;

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

  hasNoSynonym(): boolean {
    return this.synonyms?.length == 0 ? true : false;
  }

  copyText() {
    let copyText = this.myTextareaRef.nativeElement.value;
    navigator.clipboard.writeText(copyText);
  }
}
