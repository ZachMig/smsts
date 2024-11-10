import { Injectable } from '@angular/core';
import { TileState } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  rows = 7;
  cols = 12;

  boardState: TileState[][] = [];

  // Constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  constructor() {
    this.initBoard();
  }

  // Initialize the game board ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  initBoard() {
    for (let row = 0; row < this.rows; row++) {
      const tempRow: TileState[] = [];
      for (let col = 0; col < this.cols; col++) {
        tempRow.push(new TileState(row, col));
      }
      this.boardState.push(tempRow);
    }
  }

  // Start the next round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  startRound() {}

  // End the current round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  endRound() {}
}
