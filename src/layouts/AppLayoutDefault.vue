<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AppLayoutDefault",
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: fit-content;
}

.main {
  background-color: var(--atola-bg-01);
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 4%;
  padding-bottom: 4%;
}
</style>
