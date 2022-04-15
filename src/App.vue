<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: black;
}
html,body{
  font-size: calc(0.75vw + 8px);
}
*{
  margin:0;
  padding: 0;
}
/* 中间的播放按钮 */
.video-js .vjs-big-play-button{
    position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%,-50%);
}
</style>
