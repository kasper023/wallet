<template>
  <div class="newWallet" :class="isActive">
    <div class="newWallet-layout" @click="closeNewWallet()"></div>
    <div class="newWallet-window">
        <h1 class="newWallet__title">Create new wallet</h1>
        <v-text-field
            label="Wallet name"
            v-model="newWallet.name"
            required
        ></v-text-field>
        <v-btn
            color="error"
            text
            @click="closeNewWallet()"
        >
            Cancel
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="createWallet()"
        >
            Create
        </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: String
  },
  data () {
    return {
      newWallet: {
        name: ''
      }
    }
  },
  methods: {
    closeNewWallet () {
      this.newWallet.name = ''
      this.$emit('close')
    },
    createWallet () {
      this.$store.dispatch('createWallet', this.newWallet.name)
      this.closeNewWallet()
    }
  }
}
</script>

<style scoped>
  .newWallet {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      display: none;
  }
  .newWallet_active {
      display: block;
  }
  .newWallet-layout {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      z-index: -1;
  }
  .newWallet-window {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      padding: 20px 30px;
      background-color: #fff;
  }
  .newWallet__title {
      color: #000;
  }
</style>
