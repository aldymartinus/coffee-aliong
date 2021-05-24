<template>
<div class="container">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap" rel="stylesheet">
  <main>
    <Navbar/>
    <router-view/>
  </main>
</div>  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
      Navbar
  }
}
</script>
<style scoped>
  .container{
    margin: 0 auto;
    height: 94vh;
    width: 75vw;
    
  }
  main{
    margin: 0 auto;
    height: 100%;
    width: 60vw;
  }
</style>

<style>
  .container{
    font-family: 'Noto Serif JP', sans-serif;
  }
</style>