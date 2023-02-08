<script setup>
  import {
    onMounted,
    onUnmounted
  } from 'vue'

  onMounted(() => {
    console.log('mounted')
  })

  onUnmounted(() => {
    console.log('onUnmounted')
  })
</script>

<template>
  <div>home</div>
</template>

<style lang="less" scoped>
</style>
