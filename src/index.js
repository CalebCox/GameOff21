import Phaser from "phaser";
import config from "./config/config";
import Preload from "./scenes/preload";
import Demo from "./scenes/demo";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Preload", new Preload());
    this.scene.add("Demo", Demo);
    this.scene.start("Preload");
  }
}

const game = new Game();
