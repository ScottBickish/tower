<template>
  <div class="row container-fluid justify-content-center">
    <div class="col col-md-6">
      <h1>Welcome {{ account.name }}</h1>
      <h4>Here are the events you are attending</h4>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Account',
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
.pic {
  height: 200px;
  width: 200px;
  object-fit: cover;
}
</style>
