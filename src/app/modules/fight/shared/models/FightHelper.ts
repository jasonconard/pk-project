import { Game } from "../../../game/shared/model/Game";
import * as THREE from "three";

export class FightHelper {
  public originGame: Game;
  public meshes: { [key: string]: THREE.Mesh };

  constructor(o: any) {
    this.originGame = o.originGame;
    this.meshes = o.meshes;
  }
}
