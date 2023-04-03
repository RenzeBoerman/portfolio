import * as THREE from "three"

import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./world/World"
import Resources from "./utils/Resources"
import sources from './sources.js'

let instance = null

export default class Experience {

    constructor(canvas) {
        if (instance) {
            return instance
        }

        instance = this

        window.experience = this

        this.canvas = canvas
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.world = new World()

        this.sizes.on("resize", () => {
            this.resize()
        })

        this.time.on("tick", () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }

}