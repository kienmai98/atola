<template>

  <div class="swap-to p-4 px-4 rounded-2xl w-full block">
    <!-- SWAP FROM TITLE -->
    <div class="mb-3 flex">
      <a 
        class="swap-title bg-transparent text-2xl" 
        href="#"
      >
        You buy
      </a>
    </div>

    <!-- SWAP SELECT TOKEN -->
    <div class="swap-select-token flex flex-row items-center justify-items-center justify-between mb-4">
      <div class="w-full">
        <div class="token-select-row flex  flex-row justify-between items-center w-full no-underline" >
          <div 
            class="token-select-to-button flex flex-row items-center align-middle cursor-pointer"
            @click="changeTokenTo()"
          >
            <TokenIcon :url="buyToPath" class="w-14 h-14 mr-2"></TokenIcon>
            <div class="title-token text-3xl whitespace-nowrap mr-3 mt-1"><span>{{ !!buyToName?buyToName:"" }}</span></div>
            <div class="title-token-image angle-down-style w-3"></div>
          </div>
          <div class="text-2xl">
            1000
          </div>
        </div>
        <div class="flex flex-row items-center justify-items-center justify-between px-4 pt-2">
          <div class="token-name">
            Transaction Fees
          </div>
          <div class="token-usd-price">
            ~$157
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import TokenIcon from '@/components/TokenIcon'

import { computed }  from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';


const module = 'buy';
export default {
  name: "BuyTo",
  components: {
    TokenIcon,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    
    const fromToken = computed(() => route.params.fromToken)
    const toToken = computed(() => route.params.toToken)

    return {
        // getter
        buyToName: computed(() => store.state[module].token.name),
        buyToPath: computed(() => store.state[module].token.path),
        fromToken,
        toToken
    };
  },
  async mounted() {
    
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
        name: 'BuySelectStableToken',
        params: {
          fromToken: this.fromToken,
          toToken: this.toToken
        }
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/BuyTo/index.css";
</style>
