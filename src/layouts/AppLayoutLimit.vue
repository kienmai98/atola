<template>
  <div>
    <div class="limit-main w-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayoutLimit",
  setup() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.limit-main {
  background-color: var(--atola-bg-01);
}
</style>
