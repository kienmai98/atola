<template>
  <div class="choose-network">
    <span class="idex-number bg-gray text-gray">2</span>
    <div class="mb-2">
      <span>Choose Network</span>
    </div>
    <div v-if="acceptTerm" class="network-wrap">
      <button 
        v-for="(item, index) in networks" 
        v-bind:key="index" 
        class="items-center flex flex-col w-full rounded-2xl hover:bg-slate-100 p-2 min-h-54"
        @click="this.$emit('chooseNetwork', item.name)"  
      > 
        <div class="relative rounded-2xl">
          <img class="img-icon" :src="item.path" />
          <div v-if="networkName.localeCompare(item.name) === 0" class="network-selected">
            <img src="/circle_done.svg" alt="" style="" />
          </div>
        </div>
        <div class="pb-2 text-xs mt-1"><span>{{ item.name }}</span></div>
      </button>
    </div>

    <div v-else class="network-wrap">
      <div v-for="(item, index) in networks" v-bind:key="index" class="items-center flex flex-col w-full rounded-2xl p-2 min-h-54"> 
        <div class="relative rounded-2xl">
          <img class="img-icon img-icon-disabled" :src="item.pathDisabled" />
          <div v-if="networkName.localeCompare(item.name) === 0" class="network-selected">
            <img src="/circle_done-disabled.svg" alt="" class="img-icon-disabled" style="" />
            </div>
        </div>
        <div class="pb-2 text-xs mt-1"><span>{{ item.name }}</span></div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed }  from 'vue';
import { useStore } from 'vuex';

const module = 'swap';
export default {
  name: "WalletConnectChooseNetwork",
  components: {
  },
  setup() {
    const store = useStore();

    return {
      networks: computed(() => store.state[module].networks),
    };
  },
  props: {
    acceptTerm: {
      type: Boolean,
      required: true
    },
    networkName: {
      type: String,
      required: true
    }
  },
  async mounted() {
    await this.$store.dispatch("loadNetworks");
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/ConnectWalletModal/WalletConnectChooseNetwork.css";
</style>