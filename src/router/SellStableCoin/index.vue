<template>
  <div class="main-body modal-open">
    <LoadingPage 
      :flag="loading" 
    />
    <div class="text-2xl font-bold">
      Sell Token
    </div>
    <SellFrom />
    <div 
      class="swap-direction-arrow-container" 
      @click="swapPositionToken"
    >
      <div class="swap-direction-arrow">
        <div class="swap-direction-arrow-svg" />
      </div>
    </div>
    <SellTo />
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
import SellFrom from "@/components/SellFrom";
import SellTo from "@/components/SellTo";

import { computed, ref } from "vue";
// import { useStore } from 'vuex';
import { useRoute } from "vue-router";

import ConnectWalletModal from "@/components/ConnectWalletModal";

import LoadingPage from "@/components/LoadingPage";
import { SWAP } from "@/constants/TradeMenuConstant";

export default {
  name: "SellStableCoin",
  components: {
    SellFrom,
    SellTo,
    ConnectWalletModal,
    LoadingPage,
  },
  setup() {
    // const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    const flag = ref(false);
    const loading = ref(true);

    const swapTrade = ref(SWAP);
    return {
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
    await this.$store.dispatch("getSellStableInfo", this.fromToken);
    await this.$store.dispatch("getSellFiatInfo", this.toToken);
    this.loading = false;
  },
  methods: {
    swapPositionToken() {
      this.$router.push({
        name: "BuyStableCoin",
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
