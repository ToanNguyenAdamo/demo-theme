import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  styleElm: any;
  constructor() {}
  appendStyle(properties: any) {
    if (this.styleElm) {
      this.styleElm.parentNode.removeChild(this.styleElm);
    }
    let colorVariables = '';
    Object.keys(properties).forEach((property) => {
      colorVariables += `${property} : ${properties[property]}; `;
    });

    this.styleElm = document.createElement('style');
    this.styleElm.type = 'text/css';
    this.styleElm.innerHTML = `.app-theme { ${colorVariables} }`;
    document.getElementsByTagName('head')[0].appendChild(this.styleElm);
  }
  light() {
    return this.setActiveTheme(light);
  }
  dark() {
    return this.setActiveTheme(dark);
  }
  setActiveTheme(properties: any): Observable<any> {
    return of(properties).pipe(
      delay(1000),
      tap((res: any) => {
        if (environment.production) {
          this.appendStyle(res);
        }
      })
    );
  }

  getRamdomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  getRamdomTheme() {
    const primary = this.getRamdomHex();
    const secondary = this.getRamdomHex();
    const primaryBtnText = this.getRamdomHex();
    const secondaryBtnText = this.getRamdomHex();
    const properties = {
      '--bg-color': this.getRamdomHex(),
      '--text-color': this.getRamdomHex(),
      '--text-primary': primary,
      '--text-secondary': secondary,
      '--btn-primary': primary,
      '--btn-primary-text': primaryBtnText,
      '--btn-secondary': secondary,
      '--btn-secondary-text': secondaryBtnText,
    };
    return properties;
  }
}

export const light = {
  '--bg-color': '#ffffff',
  '--text-color': '#1f1f1f',
  '--text-primary': '#005abd',
  '--text-secondary': '#97c6f8',
  '--btn-primary': '#4646f1',
  '--btn-primary-text': '#ffffff',
  '--btn-secondary': '#e2e9ff',
  '--btn-secondary-text': '#2f2fe4',
};

export const dark = {
  '--bg-color': '#000000',
  '--text-color': '#ffffff',
  '--text-primary': '#005abd',
  '--text-secondary': '#97c6f8',
  '--btn-primary': '#4646f1',
  '--btn-primary-text': '#ffffff',
  '--btn-secondary': '#e2e9ff',
  '--btn-secondary-text': '#2f2fe4',
};
