<template>
  <div class="mytest">
    <div></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.mytest {
  margin: auto;
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
</style>
