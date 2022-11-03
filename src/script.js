import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Color, Group, Vector3 } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Loaders
 */

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const textureLoader = new THREE.TextureLoader()

/**
 *  Models
 */

let meowverseIsland;
let twitter = null;

// menu
const menuGroup = new THREE.Group()
menuGroup.position.set(0, 0, 4)

const menuMainPawGroup = new THREE.Group()
menuGroup.add(menuMainPawGroup)

scene.add(menuGroup)

                           // load models
// Menu island
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_MAIN.gltf',
    (gltf) => {
        console.log('gltf.scene.children')
        gltf.scene.children[0].children[1].material.wireframe = true
        console.log(gltf.scene.children[0].children[0].material.wireframe)
        menuMainPawGroup.add(gltf.scene)
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU_MAIN_T.gltf',
    (gltf) => {
        gltf.scene.children[0].material.wireframe = false
        menuMainPawGroup.add(gltf.scene)
        console.log(gltf.scene)
        twitter = gltf.scene.children[0]
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_D.gltf',
    (gltf) => {

        menuMainPawGroup.add(gltf.scene)
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_B.gltf',
    (gltf) => {

        menuMainPawGroup.add(gltf.scene)
    },
)

gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_NM.gltf',
    (gltf) => {

        menuGroup.add(gltf.scene)
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_GM.gltf',
    (gltf) => {

        menuGroup.add(gltf.scene)
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_P.gltf',
    (gltf) => {

        menuGroup.add(gltf.scene)
    },
)
gltfLoader.load(
    'models/WEB3_MENU/WEB3_MENU(1MESH)_R.gltf',
    (gltf) => {

        menuGroup.add(gltf.scene)
    },
)


// BIGisland

const bigIslandGroup = new THREE.Group()
bigIslandGroup.position.set(-9, 0, -2)

scene.add(bigIslandGroup)

gltfLoader.load(
    'models/WEB3_BIGISLAND/WEB3_BIGISLAND_BOAT.gltf',
    (gltf) => {
        gltf.scene.children[0].children[0].material.wireframe = false
        gltf.scene.children[0].children[0].material.color = {b: 0.123, g: 0.105, r: 0.55}

        bigIslandGroup.add(gltf.scene)
        
        
    },
)
gltfLoader.load(
    'models/WEB3_BIGISLAND/WEB3_BIGISLAND(1MESH).gltf',
    (gltf) => {
        
        bigIslandGroup.add(gltf.scene)

    },
)

// Meowverse island

gltfLoader.load(
    'models/WEB3_MEOWVERSE/WEB3_MEOWVERSE(1MESH).gltf',
    (gltf) => {
        meowverseIsland = gltf.scene
        meowverseIsland.position.set(6, 0, -7)

        scene.add(gltf.scene)
    },
)

// Roadmap island
const roadmapGroup = new THREE.Group()
roadmapGroup.position.set(6.5, 0, 1.5)

scene.add(roadmapGroup)

gltfLoader.load(
    'models/WEB3_ROADMAP/WEB3_ROADMAP_MAIN(1MESH).gltf',
    (gltf) => {
        roadmapGroup.add(gltf.scene)
    },
)

gltfLoader.load(
    'models/WEB3_ROADMAP/WEB3_ROADMAP_BUTTON.gltf',
    (gltf) => {
        roadmapGroup.add(gltf.scene)
    },
)

/**
 * TEXTURES
 */

scene.background = new THREE.CubeTextureLoader()
    .load([
        '/space/px.png',
        '/space/nx.png',
        '/space/py.png',
        '/space/ny.png',
        '/space/pz.png',
        '/space/nz.png'
    ]);


/**
 *  PARTICLES
 */

const particleTexture = textureLoader.load('/textures/particles/1.png')

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100
    colors[i] = Math.random()
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true

particlesMaterial.color = new THREE.Color('#ffffff')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.01
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

particlesMaterial.vertexColors = false

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


/**
 * GEOMETRIES
 */

// const spaceBoxGeometry = new THREE.BoxGeometry(1, 1, 1)
// const spaceBox = new THREE.Mesh(spaceBoxGeometry, environmentMapTexture)
// scene.add(spaceBox)

/**
 * FOG
 */

const fog = new THREE.Fog(0x8C97F4, 1, 50)
scene.fog = fog

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xFF7F50, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const pointLightBigIsland = new THREE.PointLight(0xFF9933, 1)
pointLightBigIsland.position.set(-8, 3.5, -3.3)
pointLightBigIsland.castShadow = true
pointLightBigIsland.intensity = .5
scene.add(pointLightBigIsland)


const pointLightmenuIsland = new THREE.PointLight(0xFF9933, 1)
pointLightmenuIsland.position.set(0.5, 2.5, 2.7)
pointLightmenuIsland.castShadow = true
pointLightmenuIsland.intensity = .5
pointLightmenuIsland.lookAt(new Vector3(0, 0, 4))
scene.add(pointLightmenuIsland)

const spotlight = new THREE.SpotLight("#Ff9889", .5, 6, Math.PI * .13, 0.25, 1)
spotlight.position.set(0,2,2)

scene.add(spotlight)
spotlight.target.position.set(-.8, -.5, 0)
spotlight.intensity = 3
scene.add(spotlight.target)
console.log(spotlight.target)

/**
 * 
 * HELPERS 
 */
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
const helper1 = new THREE.PointLightHelper(pointLightBigIsland, 1);
const helper2 = new THREE.PointLightHelper(pointLightmenuIsland, 1);
const spotlightHelper = new THREE.SpotLightHelper(spotlight, 1)
// scene.add(spotlightHelper)
//  scene.add( helper, helper1, helper2 );


/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster()

let currentIntersect = null

let intersectsArray = null

const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
 * Mouse
 */
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
})


let isHoweredIsland = false

// Находит родителей вплоть до Scene
const myGroups = [menuGroup, bigIslandGroup, roadmapGroup]

let groupIntersected = null

const getParent = (obj) => {
    
    let element = obj
    if(element.parent === null){
        console.log('got to scene')
        
    } else {
        console.log('else happened')
        for(let i = 0; i < myGroups.length; i++) {

            if(element.uuid === myGroups[i].uuid){
                groupIntersected = myGroups[i]
            } else {
            }
        }
        element = element.parent
        getParent(element)
    }
}
// Events
window.addEventListener('click', () => {
    const roadmapMainMeshesArray = roadmapGroup.children[1].children[0].children;
    if (currentIntersect) {
        // console.log(currentIntersect.object)
        // console.log(currentIntersect.object.parent)
        // console.log(currentIntersect.object.parent === menuGroup.children[0])
        
        // console.log(menuGroup.uuid)
        // console.log(roadmapGroup.uuid)
        // console.log(bigIslandGroup.uuid)
        console.log(twitter)
        console.log(currentIntersect.object)
        if(currentIntersect.object === twitter || currentIntersect.object.name == "Platform_1") {
            alert('TWIIIIT')
        }
        // Сделать что-то с group при клике
        getParent(currentIntersect.object)
        if(groupIntersected) {
            for(const group of myGroups) {
                if(group === groupIntersected) {
                    console.log('CHILD')
                    // console.log(menuGroup.children[0].children[0].children[0].children[0].material.color.r)
                    // console.log(group.position)
                    // camera.position.set(-9, -0.0008470513057307835, -2)
                    // menuGroup.children[0].children[0].children[0].children[0].material.color = {r: 200, g: 0, b: 0}
                    
                    controls.target.x = group.position.x
                    controls.target.y = group.position.y
                    controls.target.z = group.position.z

                    camera.position.x = group.position.x
                    // camera.position.y = group.position.y + 4
                    camera.position.z = group.position.z + 5
                    // тут нужен плавный переход камеры на остров
                    console.log(menuGroup)
                    
                    console.log(menuGroup.getObjectByName('sign'))
                } else {
                    console.log('wrong group')
                }
            }
        }
        // for(let i = 0; i < roadmapMainMeshesArray.length; i++) {
        //     if(currentIntersect.object === roadmapMainMeshesArray[i]) {
        //         console.log('ROADMAP')   
        //     } 
        // }
        // if(currentIntersect.object === roadmapGroup.children[0].children[0]) {
        //     location.href = 'https://www.doliacats.com'
        // }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 8, 7)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.maxDistance = 10
controls.minDistance = 1
controls.maxPolarAngle = 1.4
controls.minAzimuthAngle = 0
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



// Debug
const gui = new dat.GUI()

gui.add(controls, 'maxAzimuthAngle').min(0).max(Math.PI * 2).step(0.1)


gui.add(camera.position, 'x').min(-10).max(10).step(0.1)
gui.add(camera.position, 'y').min(-10).max(10).step(0.1)
gui.add(camera.position, 'z').min(-10).max(10).step(0.1)

gui.add(ambientLight, 'intensity').min(-10).max(10).step(0.1)
gui.add(directionalLight, 'intensity').min(-10).max(10).step(0.1)
// gui.add(directionalLight.position, 'x').min(-10).max(10).step(0.1)
// gui.add(directionalLight.position, 'y').min(-10).max(10).step(0.1)
// gui.add(directionalLight.position, 'z').min(-10).max(10).step(0.1)


// gui.add(pointLightBigIsland.position, 'x').min(-10).max(10).step(0.1)
// gui.add(pointLightBigIsland.position, 'y').min(-10).max(10).step(0.1)
// gui.add(pointLightBigIsland.position, 'z').min(-10).max(10).step(0.1)
// gui.add(pointLightBigIsland, 'intensity').min(-10).max(10).step(0.1)


// gui.add(pointLightmenuIsland.position, 'x').min(-10).max(10).step(0.1)
// gui.add(pointLightmenuIsland.position, 'y').min(-10).max(10).step(0.1)
// gui.add(pointLightmenuIsland.position, 'z').min(-10).max(10).step(0.1)
// gui.add(pointLightmenuIsland, 'intensity').min(-10).max(10).step(0.1)
// gui.add(pointLightmenuIsland, 'distance').min(-10).max(10).step(0.1)

gui.add(spotlight.target.position, 'x').min(-10).max(10).step(0.1)
gui.add(spotlight.target.position, 'y').min(-10).max(10).step(0.1)
gui.add(spotlight.target.position, 'z').min(-10).max(10).step(0.1)
gui.add(spotlight, 'intensity').min(-10).max(10).step(0.1)





/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

//  Floationg island animation
    // if (menuGroup) {
    //     menuGroup.position.y = Math.sin(elapsedTime * 2) * .1
    // }

    // if (roadmapGroup) {
    //     roadmapGroup.position.y = Math.sin(elapsedTime / 2) * .1
    // }

    // if (bigIslandGroup) {
    //     bigIslandGroup.position.y = Math.sin(elapsedTime / 2) * .1
    // }

    // if (meowverseIsland) {
    //     meowverseIsland.position.y = Math.sin(elapsedTime / 2) * .4
    // }
    for(const group of myGroups) 

// Cast a ray from the mouse and handle events
    setTimeout(() => {
        raycaster.setFromCamera(mouse, camera)

        const objectsToTest = [menuGroup, roadmapGroup, bigIslandGroup, meowverseIsland]
        const intersects = raycaster.intersectObjects(objectsToTest)

        if (intersects.length) {
            
            if (!currentIntersect) {
                console.log('mouse enter') 

                isHoweredIsland = !isHoweredIsland    

                currentIntersect = intersects[0]

                getParent(currentIntersect.object)
            }
            
            if(isHoweredIsland) {
                if(groupIntersected) {
                    groupIntersected.position.y = Math.sin(elapsedTime * 2) * .1 
                }
            }
            
            intersectsArray = intersects
            
        }
        else {
            if (currentIntersect) {
                console.log('mouse leave')
                isHoweredIsland = !isHoweredIsland
            }

            currentIntersect = null
            intersectsArray = null
        }
    }, 10000)

    spotlightHelper.update()
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




