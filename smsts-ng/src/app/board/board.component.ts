import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../types/types';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'board-component',
  standalone: true,
  imports: [TileComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  rows = 7;
  cols = 12;

  boardArr: { row: number; col: number }[] = [];

  boardState: Tile[][] = [];

  constructor(public coreService: CoreService) {}

  ngOnInit() {
    this.coreService.boardState$.subscribe((state) => {
      this.boardState = state;
    });
  }
}
