<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { canvasInit } from './canvas'

const canvas = ref<HTMLCanvasElement>(null)

let ctx: CanvasRenderingContext2D

const lineWidth = ref(5)

const scale = ref(1)

onMounted(() => {
    ctx = canvasInit(canvas.value)
    ctx.lineWidth = lineWidth.value
})

const canvasWidth = ref(0)
const canvasHeight = ref(0)

onMounted(() => {
    canvasWidth.value = canvas.value.clientWidth * window.devicePixelRatio
    canvasHeight.value = canvas.value.clientHeight * window.devicePixelRatio
})


watch(lineWidth, (value) => {
    ctx.lineWidth = value
})

watch(scale, (value) => {
    canvasWidth.value = canvas.value.clientWidth * window.devicePixelRatio * value
    canvasHeight.value = canvas.value.clientHeight * window.devicePixelRatio * value
})

</script>

<template>
    <div id="app">
        <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" />
        <p>
            line-width: <input type="range" min="1" max="20" v-model="lineWidth">
        </p>
        <p>
            scale: <input type="range" min="1" max="20" v-model="scale">
        </p>
    </div>
</template>

<style scoped>
canvas {
    width: 800px;
    height: 500px;
    box-sizing: border-box;
    border: 1px solid #ccc;
}
</style>