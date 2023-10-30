import { Injectable } from '@angular/core';

/**
 * Сервис прослойка для сохранения значений в localStorage.
 */
@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  private currentApplication = '';
  private currentVersion = '';
  private oldVersions: string[] = [];

  setVersionProperties(currentApplication: string, currentVersion: string, oldVersions: string[]): void {
    this.currentApplication = currentApplication;
    this.currentVersion = currentVersion;
    this.oldVersions = oldVersions;
  }

  getVersionKey(key: string): string {
    return `${this.currentApplication}${key}${this.currentVersion}`;
  }

  getItem(key: string, withVersion = true): any {
    if (withVersion) {
      this.removeOldVersions(key);
      key = this.getVersionKey(key);
    }
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, value: any, withVersion = true): void {
    const keyVersion = withVersion ? this.getVersionKey(key) : key;
    if (value) {
      localStorage.setItem(keyVersion, JSON.stringify(value));
    } else {
      localStorage.removeItem(keyVersion);
    }
  }

  removeItem(key: string, withVersion = true): void {
    if (withVersion) {
      this.removeOldVersions(key);
      key = this.getVersionKey(key);
    }
    localStorage.removeItem(key);
  }

  removeOldKeys(oldKeys: string[]): void {
    oldKeys.forEach((oldKey) => {
      this.removeItem(oldKey);
      const oldItem = localStorage.getItem(oldKey);
      if (oldItem) {
        localStorage.removeItem(oldKey);
      }
    });
  }

  private removeOldVersions(key: string): void {
    this.oldVersions.forEach((oldVersion) => {
      const oldKey = `${key}${oldVersion}`;
      const oldItem = localStorage.getItem(oldKey);
      if (oldItem) {
        localStorage.removeItem(oldKey);
      }
    });
  }
}
