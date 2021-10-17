<template>
  <div>
    <div class="mytest">
      <div></div>
    </div>
    <div class="mytest">
      <div></div>
    </div>
    <div class="neon-circle">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <canvas id="canvas"
            class="canvas"></canvas>
  </div>

</template>

<script>
import { onMounted } from 'vue'

export default {
  setup () {
    onMounted(() => {
    })
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.mytest {
  margin: auto;
  margin-bottom: 20px;
  filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.75));
  div {
    height: 300px;
    width: 300px;
    background-color: #fff;
    mask: linear-gradient(
      90deg,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }
}
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
