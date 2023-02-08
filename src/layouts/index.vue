<script setup>
</script>

<template>
  <div class="container">
    <div class="nav">
      <div class="nav-wrapper">
        <router-link to="/home" style="padding: 0 10px;">首页</router-link>
        <router-link to="/visualization" style="padding: 0 10px;">内容</router-link>
        <router-link to="/demo" style="padding: 0 10px;">demo</router-link>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    height: 100%;

    .nav {
      height: 60px;
      line-height: 60px;

      .nav-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .content {
      height: calc(100% - 60px);
    }
  }
</style>
