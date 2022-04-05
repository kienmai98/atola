<template>
  <div>
    <img 
      v-lazy="url"
      class="w-full h-full" 
      :alt="alt" 
    >
  </div>
</template>

<script>
export default {
  name: "TokenIcon",
  props: {
    url: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/TokenIcon/index.css";
</style>
