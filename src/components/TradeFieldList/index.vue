<template>
  <div class="grid grid-cols-2 gap-x-2 mb-5">
    <!-- TRADE RATE -->
    <div class="trade-rate-main p-4 px-4 rounded-xl w-full block">
      <div class="mb-3 flex justify-between">
        <div 
          class="trade-rate-title bg-transparent text-lg" 
          href="#"
          @click="perTokenToToken"
        >
          <span class="text-gray">Taker address</span>
        </div>
        <div 
          class="trade-rate-title bg-transparent text-lg" 
          href="#"
        >
          <img src="/paste_icon.svg" />
        </div>
      </div>
      <div class="relative">
        <div class="input-address-token">
          <input
                v-model="addressToken"
                id="address"
                class="input-token-number address-content absolute appearance-none bg-transparent focus:border-transparent text-black text-xl py-0 px-0 leading-tight focus:outline-none w-full" 
                type="text"
                @focus="magicFlag = 1"
                @blur="magicFlag = 0"
            >
            <div class="address-content-placeholder">
              <div class="address-content-placeholder-wrap ">
                <label class="placeholder" :class="magicFlag == 1?'placeholder_raised':''" for="address">
                  0x...
                </label>
              </div>
                
            </div>
        </div>
      </div>
    </div>


    <!-- SWAP TOKEN AND USD -->
    <div class="trade-rate-main p-4 px-4 rounded-xl w-full block">
      <div class="block">
        
        <div class="expire-content flex">
          <div class="expire-content-wrap text-gray mr-2">Expires in</div>
          <span class="info-icon-style w-5 h-5"></span>
        </div>
        <!--
        <div class="select-expire" >
          <div class="block text-2xl">
            10 minutes
          </div>
          <div class="select-expire-box">
            <div class="p-3">
              <div class="p-2 text-xl">
                10 minutes
              </div>
              <div class="p-2 text-xl">
                10 minutes
              </div>
              <div class="p-2 text-xl">
                10 minutes
              </div>
              <div class="p-2 text-xl">
                10 minutes
              </div>
            </div>
          </div>
        </div>
        -->
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
</template>

<script>
import { computed, ref, reactive }  from 'vue';
import { useStore, mapState } from 'vuex';
import { useRoute } from 'vue-router';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const module = 'swap';
export default {
  name: "TradeRateInput",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
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
    const addressToken = ref("")
    const magicFlag = ref(0)
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
        fullname: computed(() => store.state[module].to.fullname),
        usdPrice: computed(() => store.state[module].to.usdPrice),

        token: computed(() => store.state[module].to.tokenCode),
        path: computed(() => store.state[module].to.path),

        toToken: toToken,
        fromToken: fromToken,
        tradeTokenFlag,
        tradeConvertInfo,
        addressToken,
        magicFlag,
        expireList
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
@import "@/components/TradeFieldList/index.css";
</style>
