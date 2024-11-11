import { Injectable } from '@angular/core';
import { GameState, PlayerState, RoundState, Tile } from '../types/coreTypes';
import { BehaviorSubject, Observable } from 'rxjs';
import { Block, Damage, Structure } from '../types/buildableTypes';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  rows = 7;
  cols = 12;

  private gameState: GameState;
  private roundState!: RoundState;

  private board: Tile[][] = [];
  private boardStateSubject!: BehaviorSubject<Tile[][]>;
  boardState$!: Observable<Tile[][]>;

  private playerState: PlayerState;
  private playerStateSubject!: BehaviorSubject<PlayerState>;
  playerState$!: Observable<PlayerState>;

  private userPrompt: string = '';
  private userPromptSubject!: BehaviorSubject<string>;
  userPrompt$!: Observable<string>;

  private enemyIntent: string = '';
  private enemyIntentSubject!: BehaviorSubject<string>;
  enemyIntent$!: Observable<string>;

  // Constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  constructor() {
    console.log('CoreService Constructor Called');

    // Init game state wrapper
    this.gameState = new GameState();

    // Init player state wrapper
    this.playerState = new PlayerState();
    this.playerStateSubject = new BehaviorSubject<PlayerState>(
      this.playerState
    );
    this.playerState$ = this.playerStateSubject.asObservable();

    // Setup board and observer
    this.boardStateSubject = new BehaviorSubject<Tile[][]>(this.board);
    this.boardState$ = this.boardStateSubject.asObservable();
    this.initBoard();

    this.userPromptSubject = new BehaviorSubject<string>(this.userPrompt);
    this.userPrompt$ = this.userPromptSubject.asObservable();

    this.enemyIntentSubject = new BehaviorSubject<string>(this.enemyIntent);
    this.enemyIntent$ = this.enemyIntentSubject.asObservable();
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

    const damage: Structure = new Damage();
    const block: Structure = new Block();

    this.updateTileState(3, 3, { isVisible: true, isOwned: true });
    this.updateTileState(3 + 1, 3, {
      isVisible: true,
      isOwned: true,
      structure: damage,
    });
    this.updateTileState(3 - 1, 3, {
      isVisible: true,
      isOwned: true,
      structure: block,
    });
    this.updateTileState(3, 3 + 1, { isVisible: true, isOwned: true });
    this.updateTileState(3, 3 - 1, { isVisible: true, isOwned: true });

    this.updateBoardState();
  }

  startGame() {
    console.log('Game started');
    this.setupSpawn();
    this.gameState.startGame();
  }

  // Start the next round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  startRound() {
    console.log('Start round clicked!');

    if (!this.gameState.isInGame) {
      console.log('Error: Tried to start round while game not started yet.');
      return;
    }

    this.roundState = new RoundState();
    this.roundState.generateAction();
    this.gameState.isInRound = true;

    this.enemyIntentSubject.next(
      `${this.roundState.enemy.name} is planning to ${this.roundState.actionForTurn}`
    );
  }

  // End the current turn ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  endTurn() {
    if (!this.gameState.isInRound) {
      console.log('Error: Tried to end round while not in round');
      return;
    }

    const damageTaken =
      this.roundState.actionForTurn.attack - this.playerState.block;

    if (damageTaken > this.playerState.hp) {
      // game over man, game over
      console.log(
        `Hit of ${damageTaken} against HP: ${this.playerState.hp} fatal :(`
      );
      this.endGame();
    } else if (damageTaken > 0) {
      this.updatePlayerState({ hp: this.playerState.hp - damageTaken });
    } else {
      // No damage taken :)
    }

    this.playerStateSubject.next(this.playerState); // Push updated player state to subscribers
  }

  // End the current round ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  endRound() {}

  // End the game ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  endGame() {}

  updateTileState(row: number, col: number, changes: Partial<Tile>) {
    // Doing this wonky assignment to preserve all class methods, copy new properties, and create a new reference
    const curTile = new Tile(row, col);
    Object.assign(curTile, this.board[row][col], changes);
    this.board[row][col] = curTile;

    // this.updateBoardState();
  }

  updatePlayerState(changes: Partial<PlayerState>) {
    const updatedPlayerState = new PlayerState();
    Object.assign(updatedPlayerState, this.playerState, changes);
    this.playerState = updatedPlayerState;
  }

  updateBoardState() {
    this.boardStateSubject.next(this.board); // Push new board state to subscribers
  }

  updateUserPrompt() {
    this.userPromptSubject.next(this.userPrompt); // Push new user prompt to subscribers
  }
}
