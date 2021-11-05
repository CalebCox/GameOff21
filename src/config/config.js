import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000111",
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: "phaser-container",
  dom: {
    createContainer: true,
  },
  pixelArt: true,
  roundPixels: true,
};
