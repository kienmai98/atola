<template>
  <div class="accept-term">
    <span class="idex-number bg-gray text-gray">1</span>
    <div>
        <div class="mb-2">
            <span>Accept</span>
            <span>&nbsp;</span>
            <a href="https://1inch.io/assets/1inch_network_terms_of_use.pdf" rel="noopener noreferrer" target="_blank" class="text-blue">
                Terms of Service
            </a>
            <span>&nbsp;</span>
            <span>and</span>
            <span>&nbsp;</span>
            <a href="https://1inch.io/assets/1inch_network_privacy_policy.pdf" rel="noopener noreferrer" target="_blank" class="text-blue">
                Privacy Policy
            </a>
        </div>
        <div class="mb-5">
            <div class="form-check">
                <input 
                  class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" 
                  type="checkbox" 
                  id="flexCheckChecked"
                  :checked="acceptTerm"
                  @click="this.$emit('changeAcceptTerm')"
                >
                <label class="form-check-label inline-block text-gray-800 cursor-pointer" for="flexCheckChecked">
                    I read and accept
                </label>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletConnectAcceptTerms",
  components: {
  },
  setup() {
    return {
    };
  },
  props: {
    acceptTerm: {
      type: Boolean,
      required: true
    }
  },
  created() {
    console.log(this.acceptTerm)
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "@/components/ConnectWalletModal/WalletConnectAcceptTerms.css";
</style>