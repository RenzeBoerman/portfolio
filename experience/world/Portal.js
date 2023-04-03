import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Portal
{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.resource = this.resources.items.portalModel

        this.texture = this.resources.loaders.textureLoader.load('../../static/untitled.jpg')
        this.texture.flipY = false
        this.texture.encoding = THREE.sRGBEncoding
        this.texture.outputEncoding = THREE.sRGBEncoding

        this.lampLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        this.portalLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })

        this.material = new THREE.MeshBasicMaterial({map: this.texture})

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(2, 2, 2)
        this.scene.add(this.model)

        this.model.traverse((child) => {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.material = this.material
            }
        })
        const objects = this.scene.children.find((child) => child.name === "Scene")
        const portalLightMesh = objects.children.find((child) => child.name === 'PortalLight')
        const poleLightAMesh = objects.children.find((child) => child.name === 'LampLightA')
        const poleLightBMesh = objects.children.find((child) => child.name === 'LampLightB')

        poleLightAMesh.material = this.lampLightMaterial
        poleLightBMesh.material = this.lampLightMaterial
        portalLightMesh.material = this.portalLightMaterial
    }
}