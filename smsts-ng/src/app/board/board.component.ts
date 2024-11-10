import { Component } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

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

  ngOnInit() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.boardArr.push({ row, col });
      }
    }
  }
}
