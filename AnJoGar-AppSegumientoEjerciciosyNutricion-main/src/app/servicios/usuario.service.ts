import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';
import { environment } from '../../environments/environment';
import { Login } from '../interfaces/login';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi: string = environment.endpoint + "Usuario/";
  constructor(private http: HttpClient) {


  }

  ObtenerIniciarSesion(request: Login): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.urlApi}IniciarSesion`, request)
  }

  ObtenerUsuarios(): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.urlApi}Lista`)

  }

  ObtenerUsuarioId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlApi}${id}`);
  }

  GuardarUsuario(request: Usuario): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.urlApi}Guardar`, request)

  }

  EditarUsuario(request: Usuario): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)

  }

  EliminarUsuario(id: number): Observable<ResponseApi> {

    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${id}`);

  }
  guardarSesionUsuario(usuarioSeccion:Sesion){
    localStorage.setItem("usuario",JSON.stringify(usuarioSeccion));
  }

  obtenerSession(){
    const dataCadena=localStorage.getItem("usuario");
    const usuario =JSON.parse(dataCadena!);
    return usuario;
  }

  eliminarSession(){
    localStorage.removeItem("usuario");
  }
  getUserId(): number {
    return parseInt(localStorage.getItem('Id') || '0', 10);
  }
}
