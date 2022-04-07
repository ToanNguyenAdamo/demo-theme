import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { light, ThemeService } from 'src/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  env = environment;

  title = 'theme-demo';
  currentTheme = 'Dark';
  isLoading = false;
  initialApp = true;
  constructor(private themeService: ThemeService) {}

  ngOnInit() {
      this.initialApp = false;

    // this.lightTheme().subscribe((res) => {
    //   this.initialApp = false;
    // });
  }

  currentThemeChange() {
    this.currentTheme = this.currentTheme == 'Light' ? 'Dark' : 'Light';
    this.isLoading = true;

    if (this.currentTheme == 'Dark') {
      this.lightTheme().subscribe((res) => {
        this.isLoading = false;
      });
    } else {
      this.darkTheme().subscribe((res) => {
        this.isLoading = false;
      });
    }
  }

  ramDomTheme() {
    this.isLoading = true;
    const theme = this.themeService.getRamdomTheme();
    this.themeService.setActiveTheme(theme).subscribe((res) => {
      this.isLoading = false;
    });
  }

  lightTheme() {
    return this.themeService.light();
  }
  darkTheme() {
    return this.themeService.dark();
  }
}
