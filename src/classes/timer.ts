import { timeStamp } from 'console';
import { Text } from './text';

export enum TimerOperations {
    SET_TIMER,
    INCREASE,
    DECREASE,
}

export class Timer extends Text {
    private timerValue: number;
    private timerFormatted: string;

    constructor(scene: Phaser.Scene, x: number, y: number, initTimer = 60) {
        super(scene, x, y, `Countdown: ${initTimer}`);

        scene.add.existing(this);

        this.timerValue = initTimer;
        this.timerFormatted = this.formatTime(initTimer);
    }

    private formatTime(totalSeconds: number): string {
        const minutes = Math.floor(totalSeconds/60);
        const secondsRemaining = totalSeconds%60;
        const secondsFormatted = secondsRemaining.toString().padStart(2, '0');

        return `${minutes}:${secondsFormatted}`;
    }

    public changeTimer(operation: TimerOperations, value: number): void {
        switch (operation) {
            case TimerOperations.SET_TIMER:
                this.timerValue = value;
                this.timerFormatted = this.formatTime(this.timerValue);
                break;
            case TimerOperations.INCREASE:
                this.timerValue += value;
                this.timerFormatted = this.formatTime(this.timerValue);
                break;
            case TimerOperations.DECREASE:
                this.timerValue -= value;
                this.timerFormatted = this.formatTime(this.timerValue);
                break;
            default:
                break;
        }
        this.setText(`Countdown: ${this.timerFormatted}`);
    }

    public getValue(): number {
        return this.timerValue;
    }

    public getFormatted(): string {
        return this.timerFormatted;
    }

    public startTimer(): void {
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.timerValue !== 0) {
                    this.changeTimer(TimerOperations.DECREASE, 1);
                } else {
                    this.setColor('red');
                }
            },
            callbackScope: this,
            loop: true
        });
    }
}