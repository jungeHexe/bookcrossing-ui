import { User } from "../domain/user.model";
import {LoginParams} from "../services/authentification.service";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoginFormStoreService {
  registrationForm: User;
  loginForm: LoginParams;
}