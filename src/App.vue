<template>
  <div id="app">
    <div @click="connect" class="cursor-pointer">connect</div>
    <AppLayout class="h-fit" />
    <web3-modal-vue
      ref="web3modal"
      :theme="theme"
      :provider-options="providerOptions"
      cache-provider
    />
  </div>
</template>
<script>
import AppLayout from "@/layouts/AppLayout.vue";
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { web3Modal } from "./config/mixins";

export default {
  name: "test",
  components: {
    AppLayout,
    Web3ModalVue,
  },
  mixins: [web3Modal],
  data() {
    return {
      theme: "light",
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
          },
        },
      },
    };
  },
  created() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.theme = "dark";
    }
  },
  mounted() {
    this.connect();
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit("setWeb3Modal", web3modal);
      if (web3modal.cachedProvider) {
        this.connect();
      }
    });
  },
  methods: {
    connect() {
      this.$store.dispatch("connect");
    },
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
