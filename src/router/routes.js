import { createRouter } from "vue-router";
import BuyStableCoin from "./BuyStableCoin";
import SellStableCoin from "./SellStableCoin";
// import P2P from './P2P';
// import LimitPage from './LimitPage';
import SelectToken from "./SelectToken";
import SelectFiat from "./SelectFiat";
import SelectStableToken from "./SelectStableToken";
import SwapPage from "./SwapPage";
import ServicePage from "./ServicePage";
// import NotFound from './NotFound';
import AppLayoutMain from "@/layouts/AppLayoutMain";
import AppLayoutLimit from "@/layouts/AppLayoutLimit";

const routes = [
  {
    path: "/buy/:fromToken/:toToken",
    component: AppLayoutMain,
    children: [
      {
        path: "",
        component: BuyStableCoin,
        name: "BuyStableCoin",
      },
      {
        path: "fiat",
        component: SelectFiat,
        name: "BuySelectFiat",
      },
      {
        path: "stable",
        component: SelectStableToken,
        name: "BuySelectStableToken",
      },
    ],
  },
  {
    path: "/sell/:fromToken/:toToken",
    component: AppLayoutMain,
    children: [
      {
        path: "",
        component: SellStableCoin,
        name: "SellStableCoin",
      },
      {
        path: "fiat",
        component: SelectFiat,
        name: "SellSelectFiat",
      },
      {
        path: "stable",
        component: SelectStableToken,
        name: "SellSelectStableToken",
      },
    ],
  },
  // {
  //   path: '/',
  //   redirect: () => {
  //     return {
  //       path: '/swap-page/ETH/1INCH',
  //     }
  //   },
  // },
  // {
  //   path: '/p2p/:fromToken/:toToken',
  //   component: AppLayoutMain,
  //   children: [
  //     {
  //       path: '',
  //       component: P2P,
  //       name: 'P2P',
  //     },
  //     {
  //       path: ':selectPosition',
  //       component: SelectToken,
  //       name: 'P2PSelectToken',
  //     }
  //   ]
  // },
  // {
  //   path: '/limit/:fromToken/:toToken',
  //   component: AppLayoutLimit,
  //   children: [
  //     {
  //       path: '',
  //       component: LimitPage,
  //       name: 'LimitPage',
  //     }
  //   ]
  // },
  {
    path: "/swap-page/:fromToken/:toToken",
    component: AppLayoutLimit,
    children: [
      {
        path: "",
        component: SwapPage,
        name: "SwapPage",
      },
      {
        path: ":selectPosition",
        component: SelectToken,
        name: "SelectToken",
      },
    ],
  },
  {
    path: "/",
    component: AppLayoutLimit,
    children: [
      {
        path: "",
        component: ServicePage,
        name: "ServicePage",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: () => {
      return {
        path: "/swap-page/ETH/1INCH",
      };
    },
  },
];

export default function (history) {
  return createRouter({
    history,
    routes,
  });
}
