import { Structure } from './buildableTypes';
import { Enemy, EnemyAction, HandsomeDevil } from './enemyTypes';

//implements TileState {
export class Tile {
  row: number;
  col: number;
  isVisible: boolean;
  isOwned: boolean;

  structure: Structure | null;

  displayStr!: string;

  constructor(row: number, col: number, structure = null) {
    this.row = row;
    this.col = col;
    this.isVisible = false;
    this.isOwned = false;
    this.structure = structure;
    this.updateDisplayStr();
  }

  acquireTile() {
    this.revealTile();
    this.isOwned = true;
  }

  loseTile() {
    this.isOwned = false;
  }

  revealTile() {
    this.isVisible = true;
  }

  hideTile() {
    this.isVisible = false;
  }

  updateDisplayStr() {
    if (this.isVisible) {
      if (this.structure) {
        this.displayStr = this.structure.displayStr;
      } else {
        this.displayStr = `${this.row}, ${this.col}`;
      }
    } else {
      this.displayStr = 'FOG';
    }
  }
}

// Singleton, but if you Google singletons in TypeScript everyone gets mad at you
export class GameState {
  isPreGame;
  isInGame;
  isPostGame;

  isInRound;

  constructor() {
    this.isPreGame = true;
    this.isInGame = false;
    this.isPostGame = false;
    this.isInRound = false;
  }

  startGame() {
    if (!this.isPreGame || this.isInGame || this.isPostGame) {
      // Error
      console.log(
        `Error: startGame() called from invalid GameState: 
        ${this.isPreGame}, ${this.isInGame}, ${this.isPostGame}`
      );
      return;
    }

    this.isPreGame = false;
    this.isInGame = true;
  }
}

export class RoundState {
  turn: number;
  enemy: Enemy;
  actionForTurn: EnemyAction;

  constructor() {
    this.turn = 0;
    this.enemy = new HandsomeDevil(0);
    this.actionForTurn = this.generateAction();
  }

  generateAction(): EnemyAction {
    const randomIndex = Math.floor(Math.random() * this.enemy.actions.length);

    return this.enemy.actions[randomIndex];
  }

  endTurn() {
    this.turn++;
  }
}

export class PlayerState {
  hp: number;
  block: number;

  constructor() {
    this.hp = 50;
    this.block = 0;
  }
}
