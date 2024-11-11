export interface Structure {
  tier: number;
  displayStr: string;
}

export class Damage implements Structure {
  tier: number;
  displayStr: string;

  constructor() {
    this.tier = 0;
    this.displayStr = `Damage: ${this.tier}`;
  }
}

export class Block implements Structure {
  tier: number;
  displayStr: string;

  constructor() {
    this.tier = 0;
    this.displayStr = `Block: ${this.tier}`;
  }
}
