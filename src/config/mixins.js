import { mapGetters, mapState } from "vuex";

const web3Modal = {
  computed: {
    ...mapState(["web3Modal"]),
    ...mapGetters(["predictionsContract"]),
  },
  active() {
    return this.web3Modal.active;
  },
};

export { web3Modal };
