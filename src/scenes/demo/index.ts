import { GameObjects, Scene } from 'phaser';
import { Player } from '../../classes/player';

export class DemoScene extends Scene {
    private player!: Player;
  constructor() {
    super('demo-scene');
  }

  create(): void {
    this.player = new Player(this, 100, 100);
	}

    update(): void {
        this.player.update();
    }
}