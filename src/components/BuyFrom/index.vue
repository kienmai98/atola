<template>
  <div class="swap-from p-4 px-4 rounded-2xl w-full block">
    <!-- SWAP FROM TITLE -->
    <div class="mb-3 flex">
      <div class="swap-title bg-transparent text-2xl">
        <span>Input money</span>
      </div>
    </div>

    <!-- SWAP SELECT TOKEN -->
    <div class="swap-select-token">
      <div class="flex flex-row items-center justify-between w-full">
        <div class="token-select-row flex justify-end w-full no-underline">
          <div
            class="token-select-from-button flex flex-row items-center align-middle cursor-pointer"
            @click="changeTokenFrom()"
          >
            <TokenIcon :url="path" class="w-8 h-8 mr-2"></TokenIcon>
            <div
              class="title-token text-3xl whitespace-nowrap mr-3 mt-1 justify-items-center"
            >
              <span>{{ token }}</span>
            </div>
            <div class="title-token-image angle-down-style w-3"></div>
          </div>
          <div class="input-from flex">
            <input
              :value="getNumberToken"
              class="input-token-number appearance-none bg-white rounded-xl focus:border-transparent w-full text-black text-3xl py-0 px-2 leading-tight focus:outline-none text-right"
              type="text"
              @keypress="isNumber($event)"
              @input="updateNumberToken"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- SWAP TOKEN AND USD -->
    <div class="flex flex-row items-center justify-items-center justify-between">
      <div class="token-name">
        {{ fullname }}
      </div>
      <!-- <div class="token-usd-price">
        ~${{ usdPrice }}
      </div>
      -->
    </div>
  </div>
</template>

<script>
import TokenIcon from "@/components/TokenIcon";
import { computed } from "vue";
import { useStore, mapState } from "vuex";
import { useRoute } from "vue-router";

const module = "buy";
export default {
  name: "BuyFrom",
  components: {
    TokenIcon,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);

    return {
      // getter
      fullname: computed(() => store.state[module].fiat.name),

      token: computed(() => store.state[module].fiat.symbol),
      path: computed(() => store.state[module].fiat.path),

      toToken: toToken,
      fromToken: fromToken,
    };
  },
  computed: {
    ...mapState({
      getNumberToken: (state) => state[module].amount,
    }),
  },
  async mounted() {},
  methods: {
    updateNumberToken(e) {
      const lastNumber = e.target.value.charAt(e.target.value.length - 1);
      if (".".localeCompare(lastNumber) !== 0) {
        this.$store.dispatch("changeNumberToken", e.target.value);
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
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
              break;
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
        name: "BuySelectFiat",
        params: {
          fromToken: this.fromToken,
          toToken: this.toToken,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/BuyFrom/index.css";
</style>
