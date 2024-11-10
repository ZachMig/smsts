// enum Terrain {
//   plains = 'Plains',
//   hills = 'Hills',
//   forest = 'Forest',
//   desert = 'Desert',
//   marsh = 'Marsh',
// }

export interface TileState {
  row: number;
  col: number;
  isVisible: boolean;
  isOwned: boolean;
  displayStr: string;
}
//implements TileState {

export class Tile {
  row: number;
  col: number;
  isVisible: boolean;
  isOwned: boolean;
  displayStr!: string;
  // terrain: string;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    // this.terrain = 'Plains';
    this.isVisible = false;
    this.isOwned = false;
    this.updateDisplayStr();
  }

  acquireTile() {
    this.revealTile();
    this.isOwned = true;
    // console.log(
    //   `Tile at ${this.row} ${this.col} acquired - Visible: ${this.isVisible} Owned: ${this.isOwned}`
    // );
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
      this.displayStr = this.row + ' ' + this.col;
    } else {
      this.displayStr = 'FOG';
    }
  }

  // changeTerrain(newTerrain: string) {
  //   this.terrain = newTerrain;
  // }
}
