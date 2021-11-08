import { Actor } from './actor';
import { Input, Scene } from 'phaser';
import { EVENTS_NAME } from '../consts';

export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keySpace: Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'demo');

    // KEYS
    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');

    this.keySpace = this.scene.input.keyboard.addKey(32);
    this.keySpace.on('down', (event: KeyboardEvent) => {
      // attack animation here when created
      this.scene.game.events.emit(EVENTS_NAME.attack);
    });

    // PHYSICS
    this.getBody().setSize(16, 16);
  }

  update(): void {
    this.getBody().setVelocity(0);

    if (this.keyW?.isDown) {
      this.body.velocity.y = -110;
      this.setFrame(3);
    }

    if (this.keyA?.isDown) {
      this.body.velocity.x = -110;
      this.setFrame(2);
    }

    if (this.keyS?.isDown) {
      this.body.velocity.y = 110;
      this.setFrame(0);
    }

    if (this.keyD?.isDown) {
      this.body.velocity.x = 110;
      this.setFrame(1);
    }
  }

  public getDamage(value?: number): void {
    super.getDamage(value);
  }
}