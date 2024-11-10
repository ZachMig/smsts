// enum Terrain {
//   plains = 'Plains',
//   hills = 'Hills',
//   forest = 'Forest',
//   desert = 'Desert',
//   marsh = 'Marsh',
// }

interface TileStateInterface {
  row: number;
  col: number;
  isVisible: boolean;
  isOwned: boolean;
}

export class TileState implements TileStateInterface {
  row: number;
  col: number;
  isVisible: boolean;
  isOwned: boolean;
  terrain: string;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.terrain = 'Plains';
    this.isVisible = false;
    this.isOwned = false;
  }

  acquireTile() {
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

  changeTerrain(newTerrain: string) {
    this.terrain = newTerrain;
  }
}
