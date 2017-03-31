<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <webgl-plan></webgl-plan>
  </div>
</template>

<script>
import WebglPlan from './components/webgl/WebglPlan'

export default {
  name: 'app',
  components: {
    WebglPlan
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
