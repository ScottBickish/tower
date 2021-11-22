<template>
  <div>
    <button class="m-2 rounded">Sport</button>
    <button class="m-2 rounded">Digital</button>
    <button class="m-2 rounded">Convention</button>
    <button class="m-2 rounded">Concert</button>
  </div>
  <div class="row container-fluid">
    <div class="col col-md-4" v-for="event in events" :key="event.id">
      <SingleEvent :event="event" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"

export default {

  setup() {
    onMounted(async () => {
      try {
        await eventsService.getAllEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error)
      }
    })
    return {
      name: 'Home',
      events: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
