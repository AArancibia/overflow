import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import {environment} from "../../environments/environment";
import {User} from "./user.model";
import { Http, Headers, Response} from "@angular/http"
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class AuthService {

  usersUrl: string;
  currentUser?: User;

  constructor(private http: Http, private router: Router, public snackBar: MatSnackBar) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLoggedIn()) {
      const { userId, email, firstName , lastName} = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }

  sginup(user: User) {
    const body = JSON.stringify(user);
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post(urljoin(this.usersUrl, '/signup'), body, {headers: header})
      .map((response: Response) => {
      //obtener el json que nos llega
      const json = response.json();
      //almacenamos el usuario en el localstorage
      this.login(json);
      return json;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json());
      });
}

  signin(user: User) {
    const body = JSON.stringify(user);
    const header = new Headers({'Content-Type': 'application/json'});
    return this.http.post(urljoin(this.usersUrl, '/signin'), body, {headers: header})
      .map((response: Response) => {
        const json = response.json();
        this.login(json);
        return json;
      })
      .catch((error: Response) => {
        console.log(error);
        throw Observable.throw(error.json());
      });
  }

  login = ({token, userId, firstName, lastName, email }) => {
    console.log({token, userId, firstName, lastName, email });
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({userId, firstName, lastName, email}));
    this.router.navigateByUrl('/');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }

  showError(message) {
    this.snackBar.open(message, 'x', {duration: 2500});
  }

  public handledError = (error: any) => {
    const {error: {name}, message} = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    }else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    }else {
      this.showError(message || 'Ha  ocurrido un error, intentalo nuevamente');
    }
    this.logout();
  }
}
