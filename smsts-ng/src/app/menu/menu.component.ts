import { Component } from '@angular/core';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'menu-component',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  combatLog: string[] = ['Round Start'];

  constructor(public coreService: CoreService) {}

  ngOnInit() {
    this.coreService.enemyIntent$.subscribe((state) => {
      console.log(state);
      this.combatLog.push(state);
    });
  }
}
