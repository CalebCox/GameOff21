import { GameObjects, Scene } from 'phaser';

export class LoadingScene extends Scene {
    private player!: GameObjects.Sprite;
  constructor() {
    super('loading-scene');
  }

  preload(): void {
      this.load.baseURL = 'assets/';

      this.load.spritesheet('demo', 'sprites/demo-player.png', { frameWidth: 16, frameHeight: 16 });
  }

  create(): void {
    this.scene.start('demo-scene');
  }
}