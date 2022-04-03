import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}
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
        Object.keys(res).forEach((property) => {
          document.documentElement.style.setProperty(property, res[property]);
        });
      })
    );
  }

  getRamdomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
  getRamdomTheme() {
    const primary = this.getRamdomHex();
    const secondary = this.getRamdomHex();
    const properties = {
      '--bg-light': this.getRamdomHex(),
      '--color-light': this.getRamdomHex(),
      '--text-primary': primary,
      '--text-secondary': secondary,
      '--input-primary': primary,
      '--input-secondary': secondary,
      '--btn-primary': primary,
      '--btn-secondary': secondary,
      '--bg-success': this.getRamdomHex(),
      '--bg-warning': this.getRamdomHex(),
      '--bg-error': this.getRamdomHex(),
    };
    return properties;
  }
}

export interface Theme {
  name: string;
  properties: any;
}

export const light = {
  '--bg-light': '#ffffff',
  '--color-light': '#1A1A40',
  '--text-primary': '#005abd',
  '--text-secondary': '#97c6f8',
  '--input-primary': '#005abd',
  '--input-secondary': '#97c6f8',
  '--btn-primary': '#005abd',
  '--btn-secondary': '#97c6f8',
  '--bg-success': '#339900',
  '--bg-warning': '#ffcc00',
  '--bg-error': '#cc3300',
};

export const dark = {
  '--bg-light': '#1A1A40',
  '--color-light': '#ffffff',
  '--text-primary': '#7A0BC0',
  '--text-secondary': '#FA58B6',
  '--input-primary': '#7A0BC0',
  '--input-secondary': '#FA58B6',
  '--btn-primary': '#7A0BC0',
  '--btn-secondary': '#FA58B6',
  '--bg-success': '#4E9F3D',
  '--bg-warning': '#ECB365',
  '--bg-error': '#B3541E',
};
