<template>
    <div id="home">
      <v-container>
        <div class="home-top">
          <h1 class="home__title">Wallets</h1>
          <v-btn color="primary" @click="openNewWallet()">New wallet</v-btn>
        </div>
        <v-card
          class="wallet"
          v-for="(wallet, index) of wallets"
          :key="index"
        >
          <h2 class="wallet__title">#{{index + 1}} {{wallet.name}}</h2>
          <div class="wallet-buttons">
            <v-btn
              class="wallet-buttons__button secondary"
              @click="$router.push(`/wallets/${wallet.name}`)"
            >
              adresses
            </v-btn>
            <v-btn
              class="wallet-buttons__button"
              color="error"
              @click="deleteWallet(wallet.name)"
            >
              delete
            </v-btn>
          </div>
        </v-card>
      </v-container>
      <NewWallet :isActive="isNewWallet" @close="isNewWallet=''"/>
    </div>
</template>

<script>
import NewWallet from './NewWallet'

export default {
  name: 'Home',
  components: {
    NewWallet
  },
  props: {
    NewWallet
  },
  data: () => {
    return {
      title: 'home',
      isNewWallet: ''
    }
  },
  methods: {
    openNewWallet () {
      this.isNewWallet = 'newWallet_active'
    },
    deleteWallet (walletName) {
      this.$store.dispatch('deleteWallet', walletName)
    }
  },
  computed: {
    wallets () {
      return this.$store.getters.getWallets
    }
  },
  created () {
    this.$store.dispatch('getWallets')
  }
}
</script>

<style scoped>
.home-top {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}
.home__title {
  margin-right: 15px;
}
.wallet {
  width: 700px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 20px;
}
.wallet-buttons {
  display: flex;
  align-items: center;
}
.wallet-buttons__button:not(:last-child) {
  margin-right: 10px;
}
</style>
