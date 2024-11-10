import { Component, Input } from '@angular/core';
import { CoreService } from '../core/core.service';
import { Tile } from '../types/types';

@Component({
  selector: 'tile-component',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss',
})
export class TileComponent {
  @Input() state!: Tile;

  displayStr: string = 'Loading Tile...';

  constructor(public coreService: CoreService) {}

  onTileClick() {
    console.log(`Tile Clicked: ${this.state.displayStr}`);
  }

  ngOnInit() {}

  ngOnChanges() {
    this.state.updateDisplayStr();
  }
}
