import { Scene } from 'phaser';
import mapObj from '../../assets/tilemaps/json/CropMap.json';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  preload(): void {
      this.load.baseURL = 'assets/';

      this.load.spritesheet('demo', 'sprites/demo-player.png', { frameWidth: 16, frameHeight: 16 });

      this.load.image({
          key: 'tiles',
          url: 'tilemaps/tiles/global.png'
      });
      this.load.tilemapTiledJSON('farm', mapObj);
  }

  create(): void {
    this.scene.start('demo-scene');
  }
}