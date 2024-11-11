import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CoreService } from './core/core.service';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'smsts-ng';
  userPrompt = 'Test prompt here for testing purposes so I can test it';
  isMenuOpen = false;

  constructor(public coreService: CoreService) {}

  start() {
    this.coreService.startGame();
  }

  startRound() {
    this.coreService.startRound();
  }

  endTurn() {
    this.coreService.endTurn();
  }

  // restart() {}

  toggleMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  ngOnInit() {
    this.coreService.userPrompt$.subscribe((state) => {
      this.userPrompt = state;
    });
  }
}
