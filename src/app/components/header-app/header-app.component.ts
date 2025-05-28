import { Component, EventEmitter, Output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-header-app',
  imports: [AngularSvgIconModule],
  templateUrl: './header-app.component.html',
  styleUrl: './header-app.component.css'
})
export class HeaderAppComponent {
  @Output() actionSession = new EventEmitter<boolean>();

  logout() {
    this.actionSession.emit(true);
  }

}
