import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Heroe } from 'src/app/interfaces/heroes.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl= environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
   return this.http.get<Heroe[]>(`${this._baseUrl}/heroes`)
  }

  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this._baseUrl}/heroes/${id}`)
  }

  agregarHeroe(heroe: Heroe): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<any>{
    return this.http.put<any>(`${this._baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<any>{
    return this.http.delete<any>(`${this._baseUrl}/heroes/${id}`)
  }
}
