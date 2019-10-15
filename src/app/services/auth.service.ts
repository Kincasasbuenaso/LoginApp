import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAZT01j4c26qOtxmH7jm8pPa-OYBwA_RHM';
  UserToken: string;

  // Nuevo Usuario https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const userData = {
        ...usuario,
        returnSecureToken: true
    };
    return this.http.post(`${this.url}signInWithPassword?key=${this.apikey}`, userData).pipe(
      map ( resp => {
        this.SaveToken( resp['idToken']);
        return resp;
      })
    );
  }

  newUser(usuario: UsuarioModel) {
    // const userData = {
    //   email: usuario.email,
    //   nombre: usuario.nombre,
    //   password: usuario.password,
    // };

    // operardor spread
    const userData = {
        ...usuario,
        returnSecureToken: true
    };
    return this.http.post(`${this.url}signUp?key=${this.apikey}`, userData).pipe(
      map ( resp => {
        this.SaveToken( resp['idToken']);
        return resp;
      })
    );
  }

  SaveToken( idToken: string) {
    this.UserToken = idToken;
    localStorage.setItem('token', idToken);
  }

  getToken() {
    if (localStorage.getItem('token')) {
      this.UserToken = localStorage.getItem('token');
    } else {
      this.UserToken = ' ';
    }
  }

  IsAuth(): boolean {
    return this.UserToken.length > 2;
   }
}
