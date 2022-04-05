<template>
  <div class="token-select-button flex flex-row col-span-3 items-center align-middle cursor-pointer">
    <TokenIcon url="/token-icon/uni.webp" class="w-14 h-14 mr-2"></TokenIcon>
    <div class="title-token text-3xl whitespace-nowrap mr-3 mt-1"><span>UNI</span></div>
    <div class="title-token-image angle-down-style w-3"></div>
  </div>
</template>

<script>
import TokenIcon from '@/components/TokenIcon'
export default {
  name: "TokenSelectButton",
  components: {
    TokenIcon
  },
  props: {
  },
  data() {
    return {
      tokenNumber: 0
    }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/TokenSelectButton/index.css";
</style>
