import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatamuseSynonymWord } from '../models/DatamuseSynonym';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TextApiService {

  private apiUrl = 'https://api.datamuse.com/words';

  constructor(private http: HttpClient) { }


  getSynonyms(text: string): Observable<DatamuseSynonymWord[]> {
    return this.http.get<DatamuseSynonymWord[]>(`${this.apiUrl}?rel_syn=${text}`)
  }

}
