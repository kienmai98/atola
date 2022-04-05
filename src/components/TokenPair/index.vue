<template>
  <div class="cursor-pointer">
    <div cllass="pair-wrap">
      <div class="tokens-item">
        <div class="tokens-icon">
          <TokenIcon 
            :url="pathFromToken" 
            class="w-9 h-9 relative" 
          />
          <TokenIcon 
            :url="pathToToken" 
            class="w-9 h-9 absolute left-10" 
          />
        </div>
        <div class="flex ml-5 content-center">
          <span class="self-end font-semibold">{{ nameFromToken }} / {{ nameToToken }}</span>
        </div>
        <div class="title-token-image angle-down-style w-3 h-3 ml-2 self-center" />
      </div>
    </div>
  </div>
</template>

<script>
import TokenIcon from "@/components/TokenIcon";

import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const module = "swap";
export default {
  name: "TokenPair",
  components: {
    TokenIcon,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    return {
      pathFromToken: computed(() => store.state[module].from.path),
      pathToToken: computed(() => store.state[module].to.path),
      nameFromToken: computed(() => store.state[module].from.tokenCode),
      nameToToken: computed(() => store.state[module].to.tokenCode),
      toToken,
      fromToken,
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/TokenPair/index.css";
</style>
