import { Component, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  THEME_DARKNESS_SUFFIX = `-dark`;
  title = 's3-website';
  showFiller = false;
  pages: Product[] = [
    {
      title: 'Sudoku',
      icon: 'casino',
      url: 'sudoku',
    },
    {
      title: 'Calculator',
      icon: 'credit_card',
      url: 'calculator',
    },
    {
      title: 'Snake Game',
      icon: 'games',
      url: 'snake-game',
    },
  ];
  themes: string[] = [
    'deeppurple-amber',
    'indigo-pink',
    'pink-bluegrey',
    'purple-green',
  ];

  @HostBinding('class') activeThemeCssClass: string;
  isThemeDark = true;
  activeTheme: string;

  constructor(private overlayContainer: OverlayContainer) {
    this.setTheme('indigo-pink', true); // Default Theme
  }

  setTheme(theme: string, darkness: boolean = null) {
    if (darkness === null) darkness = this.isThemeDark;
    else if (this.isThemeDark === darkness) {
      if (this.activeTheme === theme) return;
    } else this.isThemeDark = darkness;

    this.activeTheme = theme;

    const cssClass = darkness === true ? theme + this.THEME_DARKNESS_SUFFIX : theme;

    const classList = this.overlayContainer.getContainerElement().classList;
    if (classList.contains(this.activeThemeCssClass))
      classList.replace(this.activeThemeCssClass, cssClass);
    else classList.add(cssClass);

    this.activeThemeCssClass = cssClass;
  }

  toggleDarkness() {
    this.setTheme(this.activeTheme, !this.isThemeDark);
  }
}



interface Product {
  title: string;
  icon: string;
  url: string;
}
