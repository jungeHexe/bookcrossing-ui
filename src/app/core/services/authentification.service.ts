import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { SERVER_URL } from "src/app/app.constants";
import { User } from "../domain/user.model";
import { ErrorHandlerService } from "./error-handler.service";
import {LocalStorageService} from "./local-storage.service";
import {UserStoreService} from "../stores/user-store.service";

export interface LoginParams {
  login: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthentificationService {
  private readonly token$ = new BehaviorSubject<string>(null);
  
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
    private readonly localStorageService: LocalStorageService,
  ) {
    const savedToken = this.localStorageService.getItem('user-token');
    if (savedToken) {
      this.token$.next(savedToken);
    }
  }
  get token() {
    return this.token$.value;
  }
  
  set token(token: string) {
    this.localStorageService.setItem('user-token', token);
    this.token$.next(token);
  }
  
  login(params: LoginParams): Observable<User> {
    return this.http.post(`${SERVER_URL}users/auth`, params)
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при регистрации')),
        map((response: any) => {
          this.token = response.access_token;
          return User.toClientObject(response);
        }),
      );
  }
  
  register(entity: User): Observable<User> {
    return this.http.post(`${SERVER_URL}users/register`, entity.toServerObject())
      .pipe(
        catchError((err) => this.errorHandler.handleErrorAndNull(err, 'Ошибка при регистрации')),
        map((response: any) => {
          return User.toClientObject(response);
        }),
      );
  }
  
  logout(): void {
    UserStoreService.setUser(null);
    this.token = null;
  }
}