import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletPubKey: ""
  },
  getters: {
    walletPubKey: state => {
      return state.walletPubKey;
    }
  },
  mutations: {
    setWalletPubKey(state, PubKey) {
      state.walletPubKey = PubKey;
    }
  },
  actions: {
  },
  modules: {
  }
})
