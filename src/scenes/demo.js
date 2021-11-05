import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  constructor() {
    super("Demo");
  }

  create() {
    this.add.image(0, 0, "farm_demo");
  }
}
