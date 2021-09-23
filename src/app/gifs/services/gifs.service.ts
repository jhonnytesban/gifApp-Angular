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

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultadosGifs = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string): void {

    query = query.trim().toLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 10)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10&`)
      .subscribe((res) => {
        this.resultadosGifs = res.data
        localStorage.setItem('resultados', JSON.stringify(this.resultadosGifs))
      })
  }


}
