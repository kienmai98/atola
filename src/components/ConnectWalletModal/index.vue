<template>
  <TransitionRoot as="template" :show="flag">
    <Dialog as="div" class="fixed z-10 inset-0" @close="open = false">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0" @click="this.$emit('cancelModel', false)">
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
          <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="div" class="sm:flex sm:justify-between text-lg leading-6 font-medium text-gray-900 mb-2"> 
                    <h1 
                      class="text-2xl leading-6 font-500 text-gray-900" 
                      id="modal-title"
                    >Connect Wallet</h1>
                    <span 
                      class="text-lg leading-6 font-medium text-gray-900 cursor-pointer"
                      @click="this.$emit('cancelModel', false)"
                    >
                      <svg 
                        class="h-8 w-8 text-red-300"  
                        width="24" height="24" viewBox="0 0 24 24" 
                        stroke-width="2" stroke="currentColor" fill="none" 
                        stroke-linecap="round" stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z"/>
                        <line x1="18" y1="6" x2="6" y2="18" />  
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </span>
                    
                  </DialogTitle>
                  <div class="text-center sm:mt-0 sm:ml-4 sm:text-left max-h-96 overflow-y-auto">
                    <WalletConnectAcceptTerms 
                      v-on:changeAcceptTerm="changeAcceptTerm" 
                      :accept-term="acceptTerm"
                    ></WalletConnectAcceptTerms>
                    <WalletConnectChooseNetwork 
                      :accept-term="acceptTerm"
                      :network-name="networkName"
                      v-on:chooseNetwork="chooseNetwork" 
                    ></WalletConnectChooseNetwork>
                    <WalletConnectChooseWallet 
                      :accept-term="acceptTerm"
                    ></WalletConnectChooseWallet>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import WalletConnectAcceptTerms from '@/components/ConnectWalletModal/WalletConnectAcceptTerms'
import WalletConnectChooseNetwork from '@/components/ConnectWalletModal/WalletConnectChooseNetwork'
import WalletConnectChooseWallet from '@/components/ConnectWalletModal/WalletConnectChooseWallet'

export default {
  name: "ConnectWalletModal",
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    WalletConnectAcceptTerms,
    WalletConnectChooseNetwork,
    WalletConnectChooseWallet
  },
  setup() {
    return {
      acceptTerm: ref(true),
      networkName: ref(""),
      walletName: ref("")
    };
  },
  props: {
    flag: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    changeExpandFlag() {
      this.$store.commit('changeStatusExpandFlag')
    },
    changeAcceptTerm() {
      this.acceptTerm = !this.acceptTerm
    },
    chooseNetwork(value) {
      this.networkName = value
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/ConnectWalletModal/index.css";
</style>