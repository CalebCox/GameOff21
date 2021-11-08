import { Scene } from 'phaser';

import { Timer, TimerOperations } from '../../classes/timer';

export class UIScene extends Scene {
    private timer!: Timer;

    constructor() {
        super('ui-scene');
    }

    create(): void {
        this.timer = new Timer(this, 20, 20, 120);
        this.timer.startTimer();
    }
}