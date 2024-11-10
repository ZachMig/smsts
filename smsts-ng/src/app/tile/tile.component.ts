import { Component, Input } from '@angular/core';

@Component({
  selector: 'tile-component',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})
export class TileComponent {
  @Input() row!: number;
  @Input() col!: number;

  displayStr: string = 'Loading Tile...';

  onTileClick() {
    console.log(`Tile Clicked: ${this.displayStr}`);
  }

  updateDisplayStr() {
    this.displayStr = this.row + ' ' + this.col;
  }

  ngOnInit() {
    this.updateDisplayStr();
  }

  ngOnChanges() {}
}
