export interface Enemy {
  name: string;
  hp: number;
  block: number;
  actions: EnemyAction[];
}

export class EnemyAction {
  attack: number;
  block: number;

  constructor(attack: number, block: number) {
    this.attack = attack;
    this.block = block;
  }

  toString() {
    return `attack for ${this.attack} and block for ${this.block}`;
  }
}

const easyActions: EnemyAction[] = [
  new EnemyAction(12, 0),
  new EnemyAction(9, 3),
  new EnemyAction(6, 6),
  new EnemyAction(3, 9),
  new EnemyAction(0, 12),
];

export class HandsomeDevil implements Enemy {
  name: string = 'HandsomeDevil';
  hp: number;
  block: number = 0;
  actions: EnemyAction[];

  constructor(difficulty: number) {
    if (difficulty === 0) {
      this.hp = 40;
      this.actions = easyActions;
    } else {
      // Only easy for now to keep it simple
      this.hp = 40;
      this.actions = easyActions;
    }
  }
}
