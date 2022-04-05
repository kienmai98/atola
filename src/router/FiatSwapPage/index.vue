<template>
  <div class="main-swap-body modal-open">
    <LoadingPage :flag="loading"></LoadingPage>
    
    <div>
        <div class="page-title">
            <h1 class="page-title-first">
                THE MOST EFFICIENT DEFI AGGREGATOR
            </h1>
            <h2 class="page-title-second text-gray">Access the most liquidity, lowest slippage and best exchange rates across Ethereum, BNB Chain, Polygon, Avalanche, Gnosis Chain, Optimistic Ethereum (OΞ) and Arbitrum.</h2>
        </div>

        <div class="grid-layout">
            <div class="right-col p-4">
                <MainMenu :trade-value="swapTrade"></MainMenu>
                <SwapFrom></SwapFrom>
                <div class="swap-direction-arrow-container" @click="swapPositionToken">
                    <div class="swap-direction-arrow">
                        <div class="swap-direction-arrow-svg"></div>
                    </div>
                </div>
                <SwapTo></SwapTo>
                <a class="primary-action-button" @click="updateFlag(true)">
                    <span>
                        Connect Wallet
                    </span>
                </a>
                <ConnectWalletModal 
                :flag="flag"
                v-on:cancelModel="updateFlag"
                >
                </ConnectWalletModal>
            </div>
            <div class="left-col">
                <div>
                    <div>
                        <div class="trade-charts-settings">
                            <div>
                                <TokenPair></TokenPair>
                            </div>
                            <div class="chart-range-select-wrap">
                                <div class="chart-range-dropdown">
                                    <button class="range-option">5m</button>
                                    <button class="range-option">15m</button>
                                    <button class="range-option">1h</button>
                                    <button class="range-option">4h</button>
                                    <button class="range-option">1D</button>
                                    <button class="range-option">1W</button>
                                </div>
                                <div class="flex items-center text-xs">
                                    <div class="candle_chart-icon w-6 h-6 mr-2 hover:bg-black hover:cursor-pointer"></div>
                                    <div class="line_chart-icon w-6 h-6 hover:bg-black hover:cursor-pointer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <LineChart :data="data" />
            </div>
        </div>
    
    </div>
  </div>

</template>

<script>
import { computed, ref }  from 'vue';

import MainMenu from "@/components/MainMenu";
import SwapFrom from "@/components/SwapFrom";
import SwapTo from "@/components/SwapTo";
import TokenPair from "@/components/TokenPair";
import ConnectWalletModal from '@/components/ConnectWalletModal'
import LoadingPage from '@/components/LoadingPage'
import LineChart from '@/components/LineChart'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { SWAP } from '@/constants/TradeMenuConstant';


const module = "token";
export default {

  name: "SwapPage",
  components: {
    LoadingPage,
    MainMenu,
    SwapFrom,
    SwapTo,
    TokenPair,
    LineChart,
    ConnectWalletModal
    // TokenIcon
  },
  setup() {
      const route = useRoute();
      const store = useStore();
      const toToken = computed(() => route.params.toToken);
      const fromToken = computed(() => route.params.fromToken);
      const selectPosition = computed(() => route.params.selectPosition);
      
      const flagPage = route.query.t;

      const loading = ref(true);
      const searchbox = ref("");
      const swapTrade = ref(SWAP)
      const flag = ref(false);
      const data = [10, 40, 15, 25, 50];
      return {
          // getter
          tokens: computed(
              () => store.state[module].tokens.filter(
                  token =>  token.fullname.toUpperCase().indexOf(searchbox.value.toUpperCase()) > -1
              )
            ),
          favorites: computed(() => store.state[module].favorites),
          loading,
          toToken,
          fromToken,
          selectPosition,
          searchbox,
          flagPage,
          swapTrade,
          flag,
          data
      };
  },
  created() {
  },
  async mounted() {
    await this.$store.dispatch("loadTokens");
    await this.$store.dispatch("refreshData", {
      fromToken: this.fromToken,
      toToken: this.toToken
    });
    this.loading = false
  },
  methods: {
    swapPositionToken() {
      this.$router.push({
        name: 'SwapPage',
        params: {
          fromToken: this.toToken,
          toToken: this.fromToken
        }
      })
      this.$store.dispatch("refreshData", {
        fromToken: this.toToken,
        toToken: this.fromToken
      });
    },
    updateFlag(value) {
      this.flag = value
      
      value?document.body.classList.add("modal-open"):document.body.classList.remove("modal-open");
    }
  }
};
</script>

<style scoped>
@import "@/pages/SwapPage/index.css";
</style>
