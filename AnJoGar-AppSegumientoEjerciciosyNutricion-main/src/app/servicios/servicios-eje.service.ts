import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../interfaces/ejercicio';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosEjeService {

  private urlApi: string = environment.endpoint + "Ejercicio/";
  constructor(private http: HttpClient) {

   }

   ObtenerUsuarios(): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)

  }

}
