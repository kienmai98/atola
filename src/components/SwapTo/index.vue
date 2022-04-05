<template>

  <div class="swap-to p-4 px-4 rounded-2xl w-full block">
    <!-- SWAP FROM TITLE -->
    <div class="mb-3 flex">
      <a 
        class="swap-title bg-transparent text-2xl" 
        href="#"
      >
        To (estimated)
      </a>
    </div>

    <!-- SWAP SELECT TOKEN -->
    <div class="swap-select-token flex flex-row items-center justify-items-center justify-between mb-4">
      <div class="flex items-center w-full">
        <div class="token-select-row flex w-full no-underline" >
          <div 
            class="token-select-to-button flex flex-row items-center align-middle cursor-pointer"
            @click="changeTokenTo()"
          >
            <TokenIcon :url="swapToPath" class="w-14 h-14 mr-2"></TokenIcon>
            <div class="title-token text-3xl whitespace-nowrap mr-3 mt-1"><span>{{ !!swapToToken?swapToToken:"" }}</span></div>
            <div class="title-token-image angle-down-style w-3"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- SWAP TOKEN AND USD -->
    <div class="swap-destination-main group">
      <div class="legend-swap-to">Primary</div>
      <div class="p-4" @click="selectedMarket=!!quotesListFirst?quotesListFirst.name:''">
        <div class="flex flex-row items-center justify-items-center justify-between mt-4 group-hover:text-slate-700"
            :class="!!quotesListFirst && quotesListFirst.name.localeCompare(selectedMarket) === 0?'text-slate-700':''">
          <div class="website-token-name-container" >
            <span class="website-token-name">{{ !!quotesListFirst?quotesListFirst.name:"" }}</span>
          </div>
          <div class="website-token-name-container">
            <div v-if="refreshFlag" class="animate-pulse w-40 flex">
              <div class="w-full h-3 bg-slate-200 rounded"></div>
            </div>
            <span v-else class="website-token-price">{{ !!quotesListFirst?quotesListFirst.numberToken:"" }}</span>
          </div>
        </div>
        <div class="flex flex-row items-center justify-items-center justify-between">
          <div class="website-token-usd">
            <div v-if="refreshFlag" class="animate-pulse w-40 flex">
              <div class="w-full h-3 bg-slate-200 rounded"></div>
            </div>
            <div v-else>
              <span>Tx cost</span>
              <span>1</span>
              <span>Ξ</span>
              <span>~$2</span>
            </div>
          </div>
          <div class="website-token-usd">
            <div v-if="refreshFlag" class="animate-pulse w-40 flex">
              <div class="w-full h-3 bg-slate-200 rounded"></div>
            </div>
            <div v-else>
              <span>~$2500</span>
              <span>(1.14%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- QUOTES CONTAINER -->
    <div v-for="(item, index) in quotesList" v-bind:key="index" >
      <div class="quote-container"  :class="expandFlag || index == 0?'box-quote':'hidden'">
        <div class="p-4 group" @click="changeSelect(item.name, index)">
          <div class="flex flex-row items-center justify-items-center justify-between group-hover:text-slate-700" 
          :class="item.name.localeCompare(selectedMarket) === 0?'text-slate-700':''">
            <div 
              class="quotes-name-container" 
              :class="index === 0?'first-quotes-name-container':''"
              v-on:click.stop="(index === 0) ? changeExpandFlag() : {}" 
            >
              <span class="website-token-name">{{ !!item?item.name:"" }}</span>
              <span v-if="index === 0" class="angle-down-style w-3"></span>
            </div>
            <div class="website-token-name-container">
              <span class="website-token-price">{{ !!item?item.numberToken:"" }}</span>
            </div>
          </div>
          <div class="flex flex-row items-center justify-items-center justify-between">
            <div class="website-token-usd">
              <span>Tx cost </span>
              <span> 1 </span>
              <span> Ξ </span>
              <span> ~$2 </span>
            </div>
            <div class="website-token-usd">
              <span>~$2500</span>
              <span>(1.14%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import TokenIcon from '@/components/TokenIcon'

import { computed, ref }  from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { SELECT_POSITION_TO_TOKEN } from '@/constants/SwapConstant';

const module = 'swap';
export default {
  name: "SwapTo",
  components: {
    TokenIcon,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    const selectedMarket = ref('');
    return {
        // getter
        swapFromToken: computed(() => store.state[module].from.tokenCode),
        swapToToken: computed(() => store.state[module].to.tokenCode),
        swapFromPath: computed(() => store.state[module].from.path),
        swapToPath: computed(() => store.state[module].to.path),
        quotesListFirst: computed(() => store.state[module].quotesList[0]),

        quotesList: computed(() => store.state[module].quotesList.slice(1, store.state[module].quotesList.length)),
        refreshFlag: computed(() => store.state[module].refreshFlag),
        expandFlag: computed(() => store.state[module].expandFlag),
        toToken,
        fromToken,
        selectedMarket
    };
  },
  props: {
  },
  methods: {
    changeExpandFlag() {
      this.$store.commit('changeStatusExpandFlag')
    },
    changeSelect(name, index) {
      this.selectedMarket = name
      this.$store.commit('changeQuoteList', index)
    },
    changeTokenTo() {
      this.$router.push({
        name: 'SelectToken',
        params: {
          fromToken: this.fromToken,
          toToken: this.toToken,
          selectPosition: SELECT_POSITION_TO_TOKEN
        }
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/SwapTo/index.css";
</style>
