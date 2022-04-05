<template>
  <div class="main-body modal-open">
    <LoadingPage :flag="loading" />
    <div class="text-2xl font-bold">
      Buy Token
    </div>
    <BuyFrom />
    <div 
      class="swap-direction-arrow-container" 
      @click="swapPositionToken"
    >
      <div class="swap-direction-arrow">
        <div class="swap-direction-arrow-svg" />
      </div>
    </div>
    <BuyTo />
    <a 
      class="primary-action-button" 
      @click="updateFlag(true)"
    >
      <span> Transfer </span>
    </a>
    <ConnectWalletModal 
      :flag="flag" 
      @cancel-model="updateFlag"
    />
  </div>
</template>

<script>
import BuyFrom from "@/components/BuyFrom";
import BuyTo from "@/components/BuyTo";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

import ConnectWalletModal from "@/components/ConnectWalletModal";

import LoadingPage from "@/components/LoadingPage";
import { SWAP } from "@/constants/TradeMenuConstant";

const module = "swap";
export default {
  name: "BuyStableCoin",
  components: {
    BuyFrom,
    BuyTo,
    ConnectWalletModal,
    LoadingPage,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    const flag = ref(false);
    const loading = ref(true);

    const swapTrade = ref(SWAP);
    return {
      // getter
      swapFromToken: computed(() => store.state[module].from.tokenCode),
      swapToToken: computed(() => store.state[module].to.tokenCode),
      quotesList: computed(() => store.state[module].quotesList),
      toToken: toToken,
      fromToken: fromToken,
      flag,
      loading,
      swapTrade,
    };
  },
  data() {
    return {
      count: 0,
      title: process.env.VUE_APP_TITLE,
    };
  },
  created() {},
  async mounted() {
    await this.$store.dispatch("refreshData", {
      fromToken: this.fromToken,
      toToken: this.toToken,
    });
    await this.$store.dispatch("getBuyStableInfo", this.toToken);
    await this.$store.dispatch("getBuyFiatInfo", this.fromToken);
    this.loading = false;
  },
  methods: {
    swapPositionToken() {
      this.$router.push({
        name: "SellStableCoin",
        params: {
          fromToken: this.toToken,
          toToken: this.fromToken,
        },
      });
      this.$store.dispatch("refreshData", {
        fromToken: this.toToken,
        toToken: this.fromToken,
      });
    },
    updateFlag(value) {
      this.flag = value;

      value
        ? document.body.classList.add("modal-open")
        : document.body.classList.remove("modal-open");
    },
  },
};
</script>

<style scoped>
@import "./index.css";
</style>
