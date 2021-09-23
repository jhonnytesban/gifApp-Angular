import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []

  get historial(): string[] {
    return [...this._historial]
  }

  buscarGifs(query: string): void {
    if (this._historial.length >= 10) {
      this._historial.pop()
      this._historial.unshift(query)
    } else {
      this._historial.unshift(query)
    }
  }

}
