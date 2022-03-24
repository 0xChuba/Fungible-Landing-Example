import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Sphere } from 'three'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()



// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



// Axes Helper 
// const axesHelper = new THREE.AxesHelper() 
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const matcap2Texture = textureLoader.load('/textures/matcaps/6.png')


/**
 * Fonts 
 */
 const fontLoader = new FontLoader()

 fontLoader.load(
     'font/SF_Distant_Outline.json',
     (font) => 
     {
        const textGeometry = new TextGeometry(
            "Fungible Labs",
            {
                font: font,
                size: 0.5,
                height: 0.2,
                style: 'normal',
                curveSegments: 5,
                bevelEnabled: true, 
                bevelThickness: 0.03,
                bevelSize: -0.01,
                bevelOffset: 0,
                bevelSegments: 4
            }

        )
        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x / 2,
        //     - textGeometry.boundingBox.max.y / 2,
        //     - textGeometry.boundingBox.max.z / 2
        // )
        textGeometry.center()

        const textMaterial = new THREE.MeshBasicMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
        
    }
  
)



/**
 * Fonts 
 */
 const buttonLoader = new FontLoader()

 buttonLoader.load(
     'font/SF_Distant_Regular.json',
     (font) => 
     {
        const buttonGeometry = new TextGeometry(
        "Create             Docs",
            {
                font: font,
                size: 0.2,
                height: 0.000001,
                curveSegments: 5,
                bevelEnabled: true, 
                bevelThickness: 0.000003,
                bevelSize: -0.04,
                bevelOffset: 0,
                bevelSegments: 4
            }

        )
        // buttonGeometry.computeBoundingBox()
        // // console.log(textGeometry.boundingBox)
        // buttonGeometry.translate(
        //     - buttonGeometry.boundingBox.max.x / 2,
        //     - buttonGeometry.boundingBox.max.y /20,
        //     - buttonGeometry.boundingBox.max.z / 100
        // )
        
        buttonGeometry.center()

        const buttonMaterial = new THREE.MeshBasicMaterial()
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
        button.position.y = -0.6

        scene.add(button)
        
    }
  
)



/**
 * Box Object
 */

const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5, 3, 3, 3)
const boxMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
const box = new THREE.Mesh()

for (let i = 0; i < 50; i ++) {
    
    const box = new THREE.Mesh(boxGeometry,boxMaterial)

    // Randomly place the object 
    box.position.x = (Math.random() - 0.5) * 10 
    box.position.y = (Math.random() - 0.5) * 10 
    box.position.z = (Math.random() - 0.5) * 10 

    // Randomly rotate the object 
    box.rotation.x = Math.random() * Math.PI
    box.rotation.y = Math.random() * Math.PI
    box.rotation.z = Math.random() * Math.PI

    // randomly scale the object 
    const scale = Math.random() 
    box.scale.set(scale, scale, scale)

    

    scene.add(box)
}


/**
 * Sphere Object
 */
 const SphereGeometry = new THREE.SphereBufferGeometry(0.2, 16, 16)
 const SphereMaterial = new THREE.MeshMatcapMaterial({matcap: matcap2Texture})
 
 for (let i = 0; i < 20; i ++) {
     
     const Sphere = new THREE.Mesh(SphereGeometry,SphereMaterial)
 
     // Randomly place the object 
     Sphere.position.x = (Math.random() - 0.5) * 10 
     Sphere.position.y = (Math.random() - 0.5) * 10 
     Sphere.position.z = (Math.random() - 0.5) * 10 
 
     // Randomly rotate the object 
     Sphere.rotation.x = Math.random() * Math.PI
     Sphere.rotation.y = Math.random() * Math.PI
     Sphere.rotation.z = Math.random() * Math.PI
 
     // randomly scale the object 
     const scale = Math.random() 
     Sphere.scale.set(scale, scale, scale)
 
     scene.add(Sphere)
 }


 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
 scene.add(ambientLight)
 
 const pointLight = new THREE.PointLight(0xffffff, 0.5)
 pointLight.position.x = 2
 pointLight.position.y = 3
 pointLight.position.z = 4
 scene.add(pointLight)
 
 



// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    
    const elapsedTime = clock.getElapsedTime()
    box.rotation.y = 0.5 * elapsedTime
    
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()