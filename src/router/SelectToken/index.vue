<template>
  <div class="select-token-main-body">
    <LoadingPage :flag="loading" />

    <div class="select-token">
      <!-- Widget -->
      <div>
        <!-- Header -->
        <div class="widget-header">
          <div>
            <a
              class="back-button cursor-pointer hover:bg-slate-100"
              @click="goBack()"
            />
          </div>
          <div class="title-wrapper">
            <span class="font-bold">Select a token</span>
          </div>
        </div>

        <!-- Input -->
        <div>
          <div class="widget-input-wrap">
            <img 
              src="/search.svg" 
              alt="" 
              style="" 
            >
            <input
              v-model="searchbox"
              class="widget-input"
              type="text"
              placeholder="Search by name or paste address"
            >
          </div>
        </div>

        <!-- Favorite -->
        <div>
          <div class="favourite-tokens-container">
            <a
              v-for="(item, index) in favorites"
              :key="index"
              class="favourite-token cursor-pointer"
              @click="chooseToken(item.name)"
            >
              <TokenIcon 
                :url="item.path" 
                class="w-6 h-6 mr-2" 
              />
              <span class="pt-0.5">{{ item.name }}</span>
              <div class="remove-favorite-token">
                <img
                  class="w-4 h-4"
                  src="/cross.svg"
                  alt=""
                  @click.stop="removeFavoriteItem(item, index)"
                >
              </div>
            </a>
          </div>
        </div>

        <!-- List -->
        <div class="token-list">
          <div class="block h-full">
            <div class="cdk-virtual-scroll-viewport">
              <RecycleScroller
                v-slot="{ item }"
                class="cdk-virtual-scroll-content-wrapper"
                :items="tokens"
                :item-size="70"
                :prerender="200"
                key-field="fullname"
              >
                <div 
                  class="token-list-item" 
                  @click="chooseToken(item.name)"
                >
                  <TokenIcon :url="item.path" />
                  <div class="token-list-item-info">
                    <div class="text-left">
                      <span class="leading-7 font-medium">{{ item.fullname }}</span>
                      <p class="tokens-list-item-info-subtitle">
                        <span>{{ item.name }}</span>
                      </p>
                    </div>
                    <div class="leading-7">
                      0
                    </div>
                  </div>
                  <div 
                    v-if="item.favorite === 1" 
                    class="pin-filled"
                  >
                    <img
                      src="/pin_filled.svg"
                      alt=""
                      @click.stop="updateFavorite(item, 0)"
                    >
                  </div>
                  <div 
                    v-else 
                    class="pin-filled"
                  >
                    <img 
                      src="/pin.svg" 
                      alt="" 
                      @click.stop="updateFavorite(item, 1)" 
                    >
                  </div>
                </div>
              </RecycleScroller>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

import LoadingPage from "@/components/LoadingPage";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import TokenIcon from "@/components/TokenIcon";
import {
  SELECT_POSITION_FROM_TOKEN,
  SELECT_POSITION_TO_TOKEN,
} from "@/constants/SwapConstant.js";

const module = "token";
export default {
  name: "SelectToken",
  components: {
    LoadingPage,
    TokenIcon,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const toToken = computed(() => route.params.toToken);
    const fromToken = computed(() => route.params.fromToken);
    const selectPosition = computed(() => route.params.selectPosition);

    const flagPage = route.query.t;
    console.log(flagPage);

    const loading = ref(true);
    const searchbox = ref("");
    return {
      // getter
      tokens: computed(() =>
        store.state[module].tokens.filter(
          (token) =>
            token.fullname.toUpperCase().indexOf(searchbox.value.toUpperCase()) > -1
        )
      ),
      favorites: computed(() => store.state[module].favorites),
      loading,
      toToken,
      fromToken,
      selectPosition,
      searchbox,
      flagPage,
    };
  },
  created() {
    if (
      SELECT_POSITION_FROM_TOKEN.localeCompare(this.selectPosition) !== 0 &&
      SELECT_POSITION_TO_TOKEN.localeCompare(this.selectPosition) !== 0
    ) {
      this.$router.push({
        name: "Swap",
        params: {
          fromToken: this.fromToken,
          toToken: this.toToken,
        },
      });
    }
  },
  async mounted() {
    await this.$store.dispatch("loadTokens");
    this.loading = false;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    updateFavorite(item, value) {
      this.$store.commit("updateFavoriteTokens", { item, value });
    },
    removeFavoriteItem(item, value) {
      this.$store.commit("removeFavoriteItem", { item, value });
    },
    chooseToken(name) {
      let pageName = "";
      if (this.flagPage == 1) {
        pageName = "Swap";
      } else if (this.flagPage == 2) {
        pageName = "Swap";
      } else if (this.flagPage == 3) {
        pageName = "P2P";
      } else {
        pageName = "Swap";
      }

      console.log(pageName);
      console.log(this.flagPage);

      if (SELECT_POSITION_FROM_TOKEN.localeCompare(this.selectPosition) === 0) {
        this.$router.push({
          name: pageName,
          params: {
            fromToken: name,
            toToken:
              name.localeCompare(this.toToken) === 0 ? this.fromToken : this.toToken,
          },
        });
      } else if (SELECT_POSITION_TO_TOKEN.localeCompare(this.selectPosition) === 0) {
        this.$router.push({
          name: pageName,
          params: {
            fromToken:
              name.localeCompare(this.fromToken) === 0 ? this.toToken : this.fromToken,
            toToken: name,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
@import "@/pages/SelectToken/index.css";
</style>
