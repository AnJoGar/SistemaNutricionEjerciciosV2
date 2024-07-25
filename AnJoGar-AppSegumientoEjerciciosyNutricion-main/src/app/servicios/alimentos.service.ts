import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from '../../environments/environment';
import { Alimento } from '../interfaces/alimentos'; // Ajusta la ruta según la ubicación del componente

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {
  private urlApi: string = environment.endpoint + "Alimento";

  constructor(private http: HttpClient) { }

  getAlimento(): Observable<Alimento[]> {
    return this.http.get<{ status: boolean, value: Alimento[] }>(`${this.urlApi}/Lista`).pipe(
      map(response => response.value) // Extrae el array de alimentos de la respuesta
    );
  }

  addAlimento(alimento: Alimento): Observable<Alimento> {
    return this.http.post<Alimento>(`${this.urlApi}/alimentos`, alimento);
  }

  updateAlimento(alimento: Alimento): Observable<Alimento> {
    return this.http.put<Alimento>(`${this.urlApi}/alimentos/${alimento.id}`, alimento);
  }

  deleteAlimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/alimentos/${id}`);
  }
}