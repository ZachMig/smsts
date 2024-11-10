import { Injectable } from '@angular/core';
import { Tile, TileState } from '../types/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  rows = 7;
  cols = 12;

  board: Tile[][] = [];
  boardStateSubject!: BehaviorSubject<Tile[][]>;
  boardState$!: Observable<Tile[][]>;

  // Constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  constructor() {
    console.log('CoreService Constructor Called');
    this.boardStateSubject = new BehaviorSubject<Tile[][]>(this.board);
    this.boardState$ = this.boardStateSubject.asObservable();
    this.initBoard();
  }

  // Initialize the game board ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  initBoard() {
    for (let row = 0; row < this.rows; row++) {
      const tempRow: Tile[] = [];
      for (let col = 0; col < this.cols; col++) {
        tempRow.push(new Tile(row, col));
      }
      this.board.push(tempRow);
    }

    this.updateBoardState();
  }

  // TODO
  // Generate some random terrain
  // Generate map encounters, explorables

  // Setup player spawn location ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  setupSpawn() {
    console.log('Setting up spawn.');
    this.updateTileState(3, 3, { isVisible: true, isOwned: true });
    this.updateTileState(3 + 1, 3, { isVisible: true, isOwned: true });
    this.updateTileState(3 - 1, 3, { isVisible: true, isOwned: true });
    this.updateTileState(3, 3 + 1, { isVisible: true, isOwned: true });
    this.updateTileState(3, 3 - 1, { isVisible: true, isOwned: true });

    this.updateBoardState();
  }

  startGame() {
    console.log('Game started');
    this.setupSpawn();
  }

  // Start the next round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  startRound() {}

  // End the current round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  endRound() {}

  updateTileState(row: number, col: number, changes: Partial<Tile>) {
    // Doing this wonky assignment to preserve all class methods, copy new properties, and create a new reference
    const curTile = new Tile(row, col);
    Object.assign(curTile, this.board[row][col], changes);
    this.board[row][col] = curTile;

    // this.updateBoardState();
  }

  updateBoardState() {
    this.boardStateSubject.next(this.board); // Trigger change detection
  }
}
