import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, SearchGifResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'xWWlOIJYyAZJqrPRlPXKiRRkfVKItiKO'
  private _historial: string[] = []
  public resultadosGifs: Data[] = []

  get historial(): string[] {
    return [...this._historial]
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string): void {

    query = query.trim().toLowerCase()

    this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((res) => {
        console.log(res.data)
        this.resultadosGifs = res.data
      })

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 10)
    }
  }

}
