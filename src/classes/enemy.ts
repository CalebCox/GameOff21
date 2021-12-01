import { Math, Scene } from 'phaser';

import { Actor } from './actor';
import { EVENTS_NAME } from '../consts';
import { Player } from './player';

export class Enemy extends Actor {
    private target: Player;
    private AGGRESSOR_RADIUS = 100;
    private attackHandler: () => void;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player, frame?: string | number,) {
        super(scene, x, y, texture, frame);
        this.target = target;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.getBody().setSize(16, 16);

        this.attackHandler = () => {
            if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y }) < this.target.width) {
                console.log(`Enemy X: ${this.x}, Enemy Y: ${this.y}`);
                this.x < this.target.x ? console.log('Enemy is to the left of the player') : console.log('Enemy is to the right of the player');
                this.y < this.target.y ? console.log('Enemy is above the player') : console.log('Enemy is below the player');
                if ((this.x < this.target.x && this.target.direction !== 'right' && this.target.direction === 'left') || 
                    (this.x > this.target.x && this.target.direction !== 'left' && this.target.direction === 'right') || 
                    (this.y > this.target.y && this.target.direction !== 'up' && this.target.direction === 'down') || 
                    (this.y < this.target.y && this.target.direction !== 'down' && this.target.direction === 'up')) {
                    this.getDamage();
                    this.disableBody(true, false);
                    this.scene.time.delayedCall(300, () => {
                        this.destroy();
                    });
                }
            }
        };

        this.scene.game.events.on(EVENTS_NAME.attack, this.attackHandler, this);
        this.on('destroy', () => {
            this.scene.game.events.removeListener(EVENTS_NAME.attack, this.attackHandler);
        });
    }

    preUpdate(): void {
        if (Phaser.Math.Distance.BetweenPoints({ x: this.x, y: this.y }, {x: this.target.x, y: this.target.y }) < this.AGGRESSOR_RADIUS) {
            this.getBody().setVelocityX(this.target.x - this.x);
            this.getBody().setVelocityY(this.target.y - this.y);
            // console.log(`Enemy Y: ${this.y} Enemy X: ${this.x}`);
            // console.log(`Player Y: ${this.target.y} Player X: ${this.target.x}`);
        } else {
            this.getBody().setVelocity(0);
        }
    }

    public setTarget(target: Player): void {
        this.target = target;
    }
}