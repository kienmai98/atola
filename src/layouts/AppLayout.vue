<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import AppLayoutDefault from "./AppLayoutDefault";
export default {
  name: "AppLayout",
  setup() {
    return {
      layout: AppLayoutDefault,
    };
  },
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || AppLayoutDefault;
        } catch (e) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
};
</script>
