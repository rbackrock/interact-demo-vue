<script setup>
import {
  onMounted,
  onBeforeUnmount
} from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function init() {
  const canvasParentElement = document.querySelector('.canvas-wrapper')
  const width = canvasParentElement.clientWidth
  const height = canvasParentElement.clientHeight

  const renderer = new THREE.WebGLRenderer({
    // canvas: document.querySelector('.webgl'),
    // antialias: true,
    // // logarithmicDepthBuffer: true,
    // alpha: true
  })
  renderer.setSize(width, height)
  canvasParentElement.insertAdjacentElement('afterbegin', renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.aspect = width / height
  camera.position.z = 10

  const controls = new OrbitControls(camera, renderer.domElement)
  const axesHelper = new THREE.AxesHelper(5);

  scene.add(axesHelper)

  const sphereGeometry = new THREE.SphereBufferGeometry(3, 20, 20)
  const pointMaterial = new THREE.PointsMaterial({
    size: 0.1
  })
  const points = new THREE.Points(sphereGeometry, pointMaterial)
  scene.add(points)

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
    controls.update()
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="canvas-wrapper">
    <!-- <canvas class="webgl"></canvas> -->
  </div>
</template>

<style lang="less" scoped>
.canvas-wrapper {
  height: 100%;
  width: 100%;
}
</style>
