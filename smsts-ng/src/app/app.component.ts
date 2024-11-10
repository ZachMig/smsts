import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'smsts-ng';

  constructor(public coreService: CoreService) {}

  start() {
    this.coreService.startGame();
  }

  restart() {}
}
