import * as THREE from "three"

import Experience from "../Experience";
import Environment from "./Environment";
import Portal from "./Portal";

export default class World {

    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            this.portal = new Portal()
            this.environment = new Environment()
        })

    }

}