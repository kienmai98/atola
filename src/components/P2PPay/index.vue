<template>
  <div class="swap-from p-4 px-4 rounded-2xl w-full block">
    <!-- P2P FROM TITLE -->
    <div class="mb-3 flex">
      <div 
        class="swap-title bg-transparent text-2xl cursor-pointer" 
      >
        You pay
      </div>
    </div>

    <!-- P2P SELECT TOKEN -->
    <div class="swap-select-token">
      <div class="flex flex-row items-center justify-between w-full">
        <div class="token-select-row flex justify-end w-full no-underline" >
          <div 
            class="token-select-from-button flex flex-row items-center align-middle cursor-pointer"
            @click="changeTokenFrom()"
          >
            <TokenIcon :url="path" class="w-14 h-14 mr-2"></TokenIcon>
            <div class="title-token text-3xl whitespace-nowrap mr-3 mt-1"><span>{{ token }}</span></div>
            <div class="title-token-image angle-down-style w-3"></div>
          </div>
          <div class="input-from flex">
              <input
                :value="getNumberToken"
                class="input-token-number appearance-none bg-transparent focus:border-transparent w-full text-black text-3xl py-0 px-0 leading-tight focus:outline-none text-right" 
                type="text"
                @keypress="isNumber($event)"
                @input="updateNumberToken"
              >
          </div>
        </div>
      </div>
    </div>

    <!-- P2P TOKEN AND USD -->
    <div class="flex flex-row items-center justify-items-center justify-between">
      <div class="token-name">
        {{ fullname }}
      </div>
      <div class="token-usd-price">
        ~${{ usdPrice }}
      </div>
    </div>
  </div>
</template>

<script>
import TokenIcon from '@/components/TokenIcon'
import { computed }  from 'vue';
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router';
import { SELECT_POSITION_FROM_TOKEN } from '@/constants/SwapConstant';

const module = 'swap';
export default {
  name: "P2PPay",
  components: {
    TokenIcon
  },
  props: {
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    return {
        // getter
        fullname: computed(() => store.state[module].from.fullname),
        usdPrice: computed(() => store.state[module].from.usdPrice),

        token: computed(() => store.state[module].from.tokenCode),
        path: computed(() => store.state[module].from.path),

        toToken: toToken,
        fromToken: fromToken,
    };
  },
  
  computed: {
    ...mapState({
      getNumberToken: state => state[module].from.numberToken
    })
  },
  methods: {
    updateNumberToken(e) {
      const lastNumber = e.target.value.charAt(e.target.value.length - 1)
      console.log(lastNumber)
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
    changeTokenFrom() {
      this.$router.push({
        name: 'P2PSelectToken',
        params: {
          fromToken: this.fromToken,
          toToken: this.toToken,
          selectPosition: SELECT_POSITION_FROM_TOKEN
        },
        query: {
          t: 3
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/P2PPay/index.css";
</style>
