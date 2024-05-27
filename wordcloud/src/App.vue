

<script setup>
import { RouterView } from "vue-router";

</script>

<template>
  <div>
    <a href="https://camino21.org/" target="_blank">
      <img src="./assets/camino21-3.png" class="logo vue" alt="Camino21 Logo" />
    </a>
    <RouterView />
  </div>

</template>

<style scoped>
.logo {
  height: 10em;
  padding: 1.5em;
  margin-bottom: 0%;
  will-change: filter;
  transition: filter 500ms;
  border-radius: 35px;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
