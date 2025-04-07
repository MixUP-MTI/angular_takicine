import {Component, Input} from '@angular/core';
import {TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({ required: true }) title! : string

  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('dark-mode', String(this.isDarkMode));
  }
  
}
