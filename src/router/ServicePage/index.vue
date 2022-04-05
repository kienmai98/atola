<template>
  <div class="main-service-body modal-open w-screen h-screen">
    <div class="text-3xl text-white">
      Welcome To Atola
    </div>
    <div class="grid-layout bg-transparent">
      <div class="right-col bg-transparent">
        <div class="text-white grid grid-cols-2 gap-2">
          <div 
            class="h-24 w-48 mb-4 flex flex-col justify-center cursor-pointer border-2 border-slate-400"
            @click="updateFlag(true)" 
          > 
            <span>Buy</span>
          </div>
          <div 
            class="h-24 w-48 mb-4 flex flex-col justify-center  cursor-pointer border-2 border-slate-400"
            @click="updateFlag(true)" 
          >
            <span>Sell</span>
          </div>
          <div 
            class="h-24 w-48 mb-4 flex flex-col justify-center  cursor-pointer border-2 border-slate-400"
            @click="updateFlag(true)" 
          >
            <span>Swap</span>
          </div>
          <div 
            class="h-24 w-48 mb-4 flex flex-col justify-center cursor-pointer border-2 border-slate-400"
            @click="updateFlag(true)" 
          >
            <span>Loan</span>
          </div>
          <div 
            class="h-24 w-48 flex flex-col justify-center cursor-pointer border-2 border-slate-400"
            @click="updateFlag(true)" 
          >
            <span>Redeem</span>
          </div>
        </div>
      </div>
      <ConnectWalletModal 
        :flag="flag"
        @cancel-model="updateFlag"
      />
    </div>
  </div>
</template>

<script>


import { ref }  from 'vue';
import ConnectWalletModal from '@/components/ConnectWalletModal'
export default {

  name: "ServicePage",
  components: {
    ConnectWalletModal
  },
  setup() {
    const flag = ref(false);
    return {
        flag
    };
  },
  created() {
  },
  async mounted() {
    
  },
  methods: {
    updateFlag(value) {
      this.flag = value
      
      value?document.body.classList.add("modal-open"):document.body.classList.remove("modal-open");
    }
  }
};
</script>

<style scoped>
@import "@/pages/ServicePage/index.css";
</style>
