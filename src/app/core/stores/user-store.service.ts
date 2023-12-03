import { BehaviorSubject } from "rxjs";
import { User } from "../domain/user.model";

export class UserStoreService {

  private static readonly user$ = new BehaviorSubject<User>(null);

  /**
   * Текущий пользователь.
   */
  static get user(): User {
    return this.user$.value ?? User.toClientObject(JSON.parse(localStorage.getItem('user')));
  }

  /**
   * Установить текущего пользователя.
   * @param user Текущий пользователь.
   */
  static setUser(user: User): void {
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
    this.user$.next(user);
  }

  static isAuthorized() {
    return !!this.user;
  }
}
