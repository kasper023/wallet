import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const TOKEN = '08d4162cbdd046fdaa35f040b52ad561'
const URL = 'https://api.blockcypher.com/v1/btc/main'

const getLocalWallets = async (commit, state) => {
  if (!state.wallets) {
    commit('setWallets', JSON.parse(localStorage.getItem('wallets')))
  }
}

const updateLocalWallets = (wallets) => {
  if (wallets && wallets.length) {
    localStorage.setItem('wallets', JSON.stringify(wallets))
  }
}

export default new Vuex.Store({
  state: {
    wallets: []
  },
  mutations: {
    setWallets (state, wallets) {
      state.wallets = wallets
      updateLocalWallets(state.wallets)
    },
    createWallet (state, wallet) {
      state.wallets.push(wallet)
      updateLocalWallets(state.wallets)
    },
    deleteWallet (state, walletName) {
      const walletIndex = state.wallets.findIndex(wallet => wallet.name === walletName)
      state.wallets.splice(walletIndex, 1)
      updateLocalWallets(state.wallets)
    },
    setAddresses (state, { walletName, addresses }) {
      state.wallets = state.wallets.map(wallet => {
        if (wallet.name === walletName) {
          wallet.addresses = addresses
        }
        return wallet
      })
      updateLocalWallets(state.wallets)
    }
  },
  actions: {
    async getWallets ({ commit, state }) {
      getLocalWallets(commit, state)
      const { data: dataWallet } = await axios.get(URL + '/wallets', { params: { token: TOKEN } })
      commit('setWallets', dataWallet.wallet_names.map(wallet => {
        const obj = {
          name: wallet,
          addresses: []
        }
        return obj
      }))
    },
    async createWallet ({ commit }, walletName) {
      const { data: addressData } = await axios.post(URL + '/addrs')
      const { data: walletData } = await axios.post(URL + '/wallets', { name: walletName, addresses: [addressData.address] }, { params: { token: TOKEN, address: addressData } })
      commit('createWallet', walletData)
    },
    async deleteWallet ({ commit }, walletName) {
      await axios.delete(URL + '/wallets/' + walletName, { params: { token: TOKEN } })
      commit('deleteWallet', walletName)
    },
    async createAddress ({ commit, state }, walletName) {
      const wallet = state.wallets.find(wallet => wallet.name === walletName)

      const { data: walletData } = await axios.post(URL + '/wallets/' + wallet.name + '/addresses/generate', null, { params: { token: TOKEN } })

      const addressesBalance = await Promise.all(walletData.addresses.map(async address => {
        const { data } = await axios.get(URL + '/addrs/' + address + '/balance')

        const balance = await axios.get('https://blockchain.info/tobtc?currency=USD&value=' + data.balance).buy

        return {
          address: address,
          balance: balance
        }
      }))

      const addresses = addressesBalance
      commit('setAddresses', { walletName, addresses })
    },
    async getAddresses ({ commit, state }, walletName) {
      await getLocalWallets(commit, state)

      const { data: addressesData } = await axios.get(URL + '/wallets/' + walletName + '/addresses', { params: { token: TOKEN } })

      const addressesBalance = await Promise.all(addressesData.addresses.map(async address => {
        const { data } = await axios.get(URL + '/addrs/' + address + '/balance')

        const balance = await axios.get('https://blockchain.info/tobtc?currency=USD&value=' + data.balance).buy

        return {
          address: address,
          balance: balance
        }
      }))

      const addresses = addressesBalance
      commit('setAddresses', { walletName, addresses })
    },
    async deleteAddress ({ commit, state }, { wallet }) {
      await axios.delete(URL + '/wallets/' + wallet.name + '/addresses', { params: { token: TOKEN, address: wallet.address } })
      this.dispatch('getAddresses', wallet.name)
    }
  },
  getters: {
    getWallets (state) {
      return state.wallets
    },
    getWallet (state, walletName) {
      for (const wallet of this.state.wallets) {
        if (wallet.name === walletName) {
          return wallet
        }
      }
    }
  },
  modules: {}
})
