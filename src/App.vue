<template>
  <VideoPlayer msg="Welcome to Your Vue.js App"/>
  <Editor></Editor>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue'
import Editor from './components/Editor.vue'
export default {
  name: 'App',
  components: {
    VideoPlayer,
    Editor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
