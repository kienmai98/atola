<template>
  <div class="main-body">

    <LoadingPage :flag="loading"></LoadingPage>
    <MainMenu :trade-value="p2pConstants"></MainMenu>

    <P2PPay></P2PPay>
    <div class="swap-direction-arrow-container" @click="swapPositionToken">
      <div class="swap-direction-arrow">
        <div class="swap-direction-arrow-svg"></div>
      </div>
    </div>
    <P2PBuy class="mb-3"></P2PBuy>
    <TradeRateInput class="mb-3"></TradeRateInput>
    <TradeFieldList></TradeFieldList>
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

  <!-- QUOTE INFO -->
  <div class="quote-p2p flex justify-between items-center px-4 mx-5 mt-4">
    <div class="flex">
      <div class="mr-2 info-span-bg">
        <span> 1 &nbsp;</span>
        <span> {{ !!swapToToken?swapToToken:"" }} &nbsp;</span>
        <span>Price</span>
      </div>
    </div>
    <div class="flex">
      <span class="info-span-bg"> ~$1 &nbsp;</span>
      <span> 12 &nbsp;</span>
      <span> {{ !!swapFromToken?swapFromToken:"" }} </span>
    </div>
  </div>

  <div class="quote-p2p flex justify-between items-center px-4 mx-5 mt-4 ">
    <div class="flex">
      <div class="mr-2 info-span-bg ">
        <span> 1&nbsp;</span>
        <span> {{ !!swapFromToken?swapFromToken:"" }}&nbsp; </span>
        <span>Price</span>
      </div>
    </div>
    <div class="flex">
      <span class="info-span-bg"> ~$1&nbsp;</span>
      <span> 12 &nbsp;</span>
      <span> {{ !!swapToToken?swapToToken:"" }} </span>
    </div>
  </div>

  <div class="mt-4 rounded-3xl">
    <TabGroup>
      <TabList class="flex px-4 pt-4 space-x-8 mb-1 bg-white rounded-t-xl border-card">
        <Tab
          v-slot="{ selected }"
        >
          <div :class="selected?'border-b-2 border-transparent border-b-blue-600':''" class="font-semibold">Outbound</div>
        </Tab>
        <Tab
          v-slot="{ selected }"
        >
          <div :class="selected?'border-b-2 border-transparent border-b-blue-600':''" class="font-semibold">Inbound</div>
        </Tab>
        <Tab
          v-slot="{ selected }"
        >
          <div :class="selected?'border-b-2 border-transparent border-b-blue-600':''" class="font-semibold">History</div>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <P2PHistoryNotFoundImage></P2PHistoryNotFoundImage>
        </TabPanel>
        <TabPanel>
          <P2PHistoryNotFoundImage></P2PHistoryNotFoundImage>
        </TabPanel>
        <TabPanel>
          <P2PHistoryNotFoundImage></P2PHistoryNotFoundImage>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>

</template>

<script>

import MainMenu from "@/components/MainMenu";
import P2PPay from "@/components/P2PPay";
import P2PBuy from "@/components/P2PBuy";
import TradeRateInput from "@/components/TradeRateInput";
import TradeFieldList from "@/components/TradeFieldList";
import P2PHistoryNotFoundImage from "@/components/P2PHistoryNotFoundImage"

import { computed, ref }  from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import ConnectWalletModal from '@/components/ConnectWalletModal'

import LoadingPage from '@/components/LoadingPage'

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

import { P2P } from '@/constants/TradeMenuConstant';

const module = 'swap';
export default {

  name: "HomePage",
  components: {
    MainMenu,
    P2PPay,
    P2PBuy,
    TradeRateInput,
    TradeFieldList,
    ConnectWalletModal,
    LoadingPage,
    TabGroup, 
    TabList, 
    Tab, 
    TabPanels, 
    TabPanel,
    P2PHistoryNotFoundImage
  },
  setup() {
      const store = useStore();
      const route = useRoute();
      const toToken = computed(() => route.params.toToken);
      const fromToken = computed(() => route.params.fromToken);
      const flag = ref(false);
      const loading = ref(true);
      const p2pConstants = ref(P2P);
      return {
          // getter
          swapFromToken: computed(() => store.state[module].from.tokenCode),
          swapToToken: computed(() => store.state[module].to.tokenCode),
          quotesList: computed(() => store.state[module].quotesList),
          toToken: toToken,
          fromToken: fromToken,
          flag,
          loading,
          p2pConstants
      };
  },
  data() {
    return {
      count: 0,
      title: process.env.VUE_APP_TITLE
    }
  },
  created() {
  },
  async mounted() {
    await this.$store.dispatch("refreshData", {
      fromToken: this.fromToken,
      toToken: this.toToken
    });
    this.loading = false
  },
  methods: {
    swapPositionToken() {
      this.$router.push({
        name: 'P2P',
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
@import "./index.css";
</style>
