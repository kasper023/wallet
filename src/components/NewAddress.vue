<template>
  <div class="newAddress" :class="isActive">
    <div class="newAddress-layout" @click="closeNewAddress()"></div>
    <div class="newAddress-window">
        <h1 class="newAddress__title">Create new address</h1>
        <v-btn
            color="error"
            text
            @click="closeNewAddress()"
        >
            Cancel
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="createAddress()"
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
      newAddress: {
        name: ''
      }
    }
  },
  methods: {
    closeNewAddress () {
      this.$emit('close')
    },
    createAddress () {
      this.$store.dispatch('createAddress', this.$route.params.name)
      this.closeNewAddress()
    }
  }
}
</script>

<style scoped>
  .newAddress {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 5;
      display: none;
  }
  .newAddress_active {
      display: block;
  }
  .newAddress-layout {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .5);
      z-index: -1;
  }
  .newAddress-window {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      padding: 20px 30px;
      background-color: #fff;
  }
  .newAddress__title {
      color: #000;
  }
</style>
