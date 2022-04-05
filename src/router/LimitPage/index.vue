<template>
  <div>
    <LoadingPage :flag="loading"></LoadingPage>
    
    <div>
        <div class="page-title">
            <h1 class="page-title-first">
                THE MOST EFFICIENT DEFI AGGREGATOR
            </h1>
            <h2 class="page-title-second text-gray">Access the most liquidity, lowest slippage and best exchange rates across Ethereum, BNB Chain, Polygon, Avalanche, Gnosis Chain, Optimistic Ethereum (OΞ) and Arbitrum.</h2>
        </div>

        <div class="grid-layout">
            <div class="right-col">
                <div>
                    <div class="mat-card mat-focus-indicator market-limit-wrap">
                        <div class="market-limit-content">
                            <MainMenu :trade-value="limitTrade"></MainMenu>
                        </div>
                        <div class="limit-box">
                            <div class="limit-row">
                                <div class="z-50 w-full">
                                    <div class="field-header">
                                        <span class="limit-order-field-title">You pay</span>
                                    </div>
                                    <div>
                                        <div class="w-full relative">
                                            <div class="field token-swap-input-field">
                                                <div class="token-swap-field-first-row">
                                                    <div class="token-swap-field-name">
                                                        <span>USD Coin</span>
                                                    </div>
                                                    <div class="limit-usd-price">
                                                        <span>
                                                            <span class="token-usd-price">~$0.92</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="token-swap-field-second-row">
                                                    <div>
                                                        <Menu as="div" class="relative inline-block float-right">
                                                            <div>
                                                                <MenuButton>
                                                                <span class="mr-1 text-xl">1 Munite</span>
                                                                <div class="trade-arrow">
                                                                    <div class="title-token-image angle-down-style w-100"></div>
                                                                </div>
                                                                </MenuButton>
                                                            </div>

                                                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                                                <MenuItems class="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div class="py-1 h-48 overflow-scroll">
                                                                    <MenuItem v-for="(item, index) in expireList.value" v-bind:key="index" v-slot="{ active }">
                                                                    <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-xl']">{{ item.displayName }}</div>
                                                                    </MenuItem>
                                                                </div>
                                                                </MenuItems>
                                                            </transition>
                                                        </Menu>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="left-col">
            </div>
        </div>
    
    </div>
  </div>

</template>

<script>
import { computed, ref, reactive }  from 'vue';

import MainMenu from "@/components/MainMenu";
import LoadingPage from '@/components/LoadingPage'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
// import TokenIcon from '@/components/TokenIcon'
import { 
    SELECT_POSITION_FROM_TOKEN,
    SELECT_POSITION_TO_TOKEN 
} from '@/constants/SwapConstant.js'
import { LIMIT } from '@/constants/TradeMenuConstant';


const module = "token";
export default {

  name: "SelectToken",
  components: {
    LoadingPage,
    MainMenu,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
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
      const limitTrade = ref(LIMIT)
      const expireList = reactive({value:[
      {
        displayName: "10 Minutes"
      },
      {
        displayName: "1 Hour"
      },
      {
        displayName: "1 Day"
      },
      {
        displayName: "3 Days"
      },
      {
        displayName: "7 Days"
      },
      {
        displayName: "30 Days"
      },
      {
        displayName: "3 Months"
      },
      {
        displayName: "6 Months"
      },
      {
        displayName: "1 Year"
      },
      {
        displayName: "2 Years"
      },
      {
        displayName: "3 Years"
      },
      {
        displayName: "Custom"
      },
    ]})
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
          limitTrade,
          expireList
      };
  },
  created() {
  },
  async mounted() {
    await this.$store.dispatch("loadTokens");
    this.loading = false
  },
  methods: {
    goBack() {
        this.$router.go(-1)
    },
    updateFavorite(item, value) {
        this.$store.commit("updateFavoriteTokens", { item, value })
    },
    removeFavoriteItem(item, value) {
        this.$store.commit("removeFavoriteItem", { item, value })
    },
    chooseToken(name) {
        let pageName = "";
        if (this.flagPage == 1) {
            pageName = "Swap"
        } else if (this.flagPage == 2) {
            pageName = "Swap"
        } else if (this.flagPage == 3) {
            pageName = "P2P"
        } else {
            pageName = "Swap"
        }

        if (SELECT_POSITION_FROM_TOKEN.localeCompare(this.selectPosition) === 0) {
            
            this.$router.push({ 
                name: pageName,
                params: {
                    fromToken: name,
                    toToken: name.localeCompare(this.toToken) === 0?this.fromToken:this.toToken,
                } 
            })
        } else if (SELECT_POSITION_TO_TOKEN.localeCompare(this.selectPosition) === 0) {
            this.$router.push({ 
                name: pageName,
                params: {
                    fromToken: name.localeCompare(this.fromToken) === 0?this.toToken:this.fromToken,
                    toToken: name,
                } 
            })
        }
    }
  }
};
</script>

<style scoped>
@import "@/pages/LimitPage/index.css";
</style>
