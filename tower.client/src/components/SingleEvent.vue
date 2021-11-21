<template>
  <div class="selectable card elevation-2">
    <img class="img-fluid" :src="event.coverImg" alt="" />
    <h3>{{ event.title }}</h3>
    <h5>{{ event.startDate }}</h5>
    <h5>{{ event.location }}</h5>
    <div v-if="event.isCanceled">
      <h6 class="">This event is canceled</h6>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    event: Object,

  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>