import { Console } from 'console';
import { GameObjects, Scene, Tilemaps } from 'phaser';
import { Player } from '../../classes/player';

export class DemoScene extends Scene {
    private map!: Tilemaps.Tilemap;
    private tileset!: Tilemaps.Tileset;
    private aboveLayer!: Tilemaps.TilemapLayer;
    private worldLayer!: Tilemaps.TilemapLayer;
    private groundLayer!: Tilemaps.TilemapLayer;
    private player!: Player;
  constructor() {
    super('demo-scene');
  }

  create(): void {
    this.initMap();
    this.player = new Player(this, 100, 100);
    this.initCamera();
    this.physics.add.collider(this.player, this.worldLayer, () => console.log('COLLISION DETECTED'), undefined, this);
	}

    update(): void {
        this.player.update();
    }

    private initMap(): void {
        this.map = this.make.tilemap({ key: 'farm', tileHeight: 16, tileWidth: 16 });
        this.tileset = this.map.addTilesetImage('farm', 'tiles');
        this.groundLayer = this.map.createLayer(0, this.tileset, 0, 0);
        this.worldLayer = this.map.createLayer(1, this.tileset, 0, 0);
        this.aboveLayer = this.map.createLayer(2, this.tileset, 0, 0);

        this.worldLayer.setCollisionByProperty({ collides: true });
        this.showDebugWalls();
    }
    
    private initCamera(): void {
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.cameras.main.setZoom(3);
      }

    private showDebugWalls(): void {
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        this.worldLayer.renderDebug(debugGraphics, {
          tileColor: null,
          collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        });
    }
}