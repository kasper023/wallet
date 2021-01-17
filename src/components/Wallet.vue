<template>
  <div id="wallet">
    <v-container>
      <h1>Wallet: {{name}}</h1>
      <v-btn color="primary" @click="openNewAddress">New address</v-btn>
      <v-card
        class="wallet__address"
        v-for="(address, index) of addresses"
        :key="index"
      >
        <div>
          <h2>Address: {{address.address}}</h2>
          <p>Balance: {{address.balance || 0}} USD</p>
        </div>
        <v-btn
          color="error"
          @click="deleteAddress(address.address)"
        >
          Delete
        </v-btn>
      </v-card>
      <v-pagination
      v-model="page"
      :length="Math.ceil(addresses.length / 4)"
      @input="next"
    ></v-pagination>
    </v-container>
    <NewAddress :isActive="isNewAddress" @close="isNewAddress=''"/>
  </div>
</template>

<script>
import NewAddress from './NewAddress'

export default {
  components: {
    NewAddress
  },
  data () {
    return {
      isNewAddress: '',
      page: 1
    }
  },
  async created () {
    await this.$store.dispatch('getWallets')
    await this.$store.dispatch('getAddresses', this.$route.params.name)
  },
  computed: {
    name () {
      return this.$route.params.name
    },
    addresses () {
      return this.$store.state.wallets.find(wallet => wallet.name === this.$route.params.name)?.addresses
    }
  },
  methods: {
    openNewAddress () {
      this.isNewAddress = 'newAddress_active'
    },
    deleteAddress (address) {
      const wallet = {
        name: this.$route.params.name,
        address: address
      }
      this.$store.dispatch('deleteAddress', { wallet })
    },
    next (page) {
      console.log(page)
    }
  }
}
</script>

<style scoped>
.wallet__address {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
</style>
