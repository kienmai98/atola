<template>
  <div class="trade-rate-main p-4 px-4 rounded-xl w-full block">
    <!-- TRADE RATE -->
    <div class="mb-3 flex justify-between">
      <div 
        class="trade-rate-title bg-transparent text-lg" 
        href="#"
        @click="perTokenToToken"
      >
        {{ tradeConvertInfo }}
      </div>
      <div 
        class="trade-rate-title bg-transparent text-lg" 
        href="#"
      >
        Set to market
      </div>
    </div>


    <!-- SWAP TOKEN AND USD -->
    <div class="flex flex-row items-center justify-items-center justify-between">
      <div class="trade-token-rate-change">
        <button class="change-rate">-1%</button>
      </div>
      <div class="block w-full">
        <input
            :value="getNumberToken"
            class="input-token-number appearance-none bg-transparent text-center focus:border-transparent w-full text-black text-3xl py-0 px-0 leading-tight focus:outline-none" 
            type="text"
            @keypress="isNumber($event)"
            @input="updateNumberToken"
            maxlength="16"
        >
      </div>
      <div class="trade-token-rate-change">
        <button class="change-rate">1%</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref }  from 'vue';
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router';

const module = 'swap';
export default {
  name: "TradeRateInput",
  components: {
  },
  props: {
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    const tradeTokenFlag = ref(0)
    const tradeConvertInfo = ref("")
    return {
        // getter
        fullname: computed(() => store.state[module].to.fullname),
        usdPrice: computed(() => store.state[module].to.usdPrice),

        token: computed(() => store.state[module].to.tokenCode),
        path: computed(() => store.state[module].to.path),

        toToken: toToken,
        fromToken: fromToken,
        tradeTokenFlag,
        tradeConvertInfo
    };
  },
  
  computed: {
    ...mapState({
      getNumberToken: state => state[module].from.numberToken
    })
  },
  created() {
      this.perTokenToToken()
  },
  methods: {
    updateNumberToken(e) {
      const lastNumber = e.target.value.charAt(e.target.value.length - 1)
      if (".".localeCompare(lastNumber) !== 0) {
        this.$store.dispatch("changeNumberToken", e.target.value)
      }
    },
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        let flagDot = false;

        if (charCode === 46) {
          if (evt.target.value.length === 0) {
            evt.target.value = "0.";
          }
          for (let i = 0; i < evt.target.value.length; i++) {
            if (evt.target.value[i].charCodeAt() === 46) {
              flagDot = true;
              break
            }
          }
          if (flagDot) {
            evt.preventDefault();
          }
        } else {
          return true;
        }
      }
    },
    perTokenToToken() {
        if (this.tradeTokenFlag === 0) {
            let format = "{0} per {1} ({2}%)".replace('{0}', this.fromToken)
                                             .replace('{1}', this.toToken)
                                             .replace('{2}', 1)
            this.tradeConvertInfo =  format
            this.tradeTokenFlag = 1
        } else {
            let format = "{0} per {1} ({2}%)".replace('{0}', this.toToken)
                                             .replace('{1}', this.fromToken)
                                             .replace('{2}', 1)
            this.tradeConvertInfo =  format
            this.tradeTokenFlag = 0
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/TradeRateInput/index.css";
</style>
